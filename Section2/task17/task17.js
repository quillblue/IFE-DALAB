// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}

function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: -1,
  nowGraTime: 'day'
}

/**
 * 渲染图表
 */
function renderChart() {
  var aqiChartContainer=document.getElementById('aqi-chart-wrap')
  aqiChartContainer.innerHTML=''
  for(var date in chartData){
    var newNode=document.createElement('div')
    newNode.setAttribute('class','aqi-chart')
    var nodeStyle='width:'+getWidth()+';height:'+chartData[date]+'px;background-color:'+getColor(chartData[date])
    newNode.setAttribute('style',nodeStyle)
    newNode.setAttribute('title',date+' '+chartData[date])
    aqiChartContainer.appendChild(newNode)
  }
}

//根据时间粒度确定柱形宽度
function getWidth(){
  switch(pageState.nowGraTime){
    case 'day':return '10px'
    case 'week':return '20px'
    case 'month':return '40px'
  }
}

//根据AQI数值确定颜色
function getColor(aqi){
  if(aqi<=50){return '#0f0'}
  if(aqi<=100){return '#00f'}
  if(aqi<=200){return '#e66f1A'}
  if(aqi<=300){return '#f00'}
  if(aqi<=500){return '#7f0081'}
  else{return '#000'}
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
  var selectGraTime=document.getElementsByName('gra-time')
  var selectedGraTime=''
  for(var i=0;i<selectGraTime.length;i++){
    if(selectGraTime[i].checked){
      selectedGraTime=selectGraTime[i].value
    }
  }
  if(selectedGraTime!=pageState.nowGraTime){
    pageState.nowGraTime=selectedGraTime
    initAqiChartData()
  }
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  var citySelect=document.getElementById('city-select')
  var selectCity=citySelect.children[citySelect.selectedIndex].innerText
  if(selectCity!=pageState.nowSelectCity){
    pageState.nowSelectCity=selectCity
    initAqiChartData()
  }
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
  var graTime=document.getElementsByName('gra-time')
  for(var i=0;i<graTime.length;i++){
    graTime[i].addEventListener('change',graTimeChange)
  }
}

/**
 * 初始化城市Select下拉选择框中的选项与绑定事件
 */
function initCitySelector() {
  var citySelect=document.getElementById('city-select')
  for(var city in aqiSourceData){
    var node=document.createElement('option')
    node.innerText=city
    citySelect.appendChild(node)
  }
  citySelect.addEventListener('change',citySelectChange)
  pageState.nowSelectCity=citySelect.children[0].innerText
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  console.log(pageState.nowGraTime,pageState.nowSelectCity)
  var cityData=aqiSourceData[pageState.nowSelectCity]
  if(pageState.nowGraTime=='day'){
    chartData=cityData
  }
  else{
    chartData={}
    if(pageState.nowGraTime=='week'){
      var weekNumber=1
      var tempQueue=[]
      for(var dateStr in cityData){
        if(new Date(dateStr).getDay()==1){
          var avg=tempQueue.reduce(function(a,b){return a+b})/tempQueue.length;
          chartData['第'+weekNumber+'周']=parseInt(avg)
          tempQueue=[]
          weekNumber+=1
        }
        tempQueue.push(cityData[dateStr])
      }
      var avg=tempQueue.reduce(function(a,b){return a+b})/tempQueue.length;
      chartData['第'+weekNumber+'周']=parseInt(avg)
    }
    else{
      var monthNumber=0
      var tempQueue=[]
      for(var dateStr in cityData){
        if(new Date(dateStr).getMonth()!=monthNumber){
          var avg=tempQueue.reduce(function(a,b){return a+b})/tempQueue.length;
          chartData[(monthNumber+1)+'月']=parseInt(avg)
          tempQueue=[]
          monthNumber+=1
        }
        tempQueue.push(cityData[dateStr])
      }
      var avg=tempQueue.reduce(function(a,b){return a+b})/tempQueue.length;
      chartData[(monthNumber+1)+'月']=parseInt(avg)
    }
  }
  renderChart();
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();
}

init();