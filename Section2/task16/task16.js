//存储用户输入的空气指数数据
var aqiData = {"北京": 90,"上海": 40};

//向aqiData中增加一条数据
function addAqiData(city,aqiValue) {
	aqiData[city]=aqiValue
}

//在aqiData中删除一条数据
function deleteAqiData(city){
	delete aqiData[city]
}

//向aqi-table中增加一列内容
function addAqiTableRow(city) {
	var aqiTable=document.getElementById('aqi-table')	
	var newRow=document.createElement('tr')
	var tdCity=document.createElement('td')
	var tdAqiValue=document.createElement('td')
	var tdOperation=document.createElement('td')
	var btnDelete=document.createElement('button')
	btnDelete.innerText='删除'
	btnDelete.addEventListener('click',delBtnHandle)
	tdCity.innerText=city
	tdAqiValue.innerText=aqiData[city]
	tdOperation.appendChild(btnDelete)
	newRow.appendChild(tdCity)
	newRow.appendChild(tdAqiValue)
	newRow.appendChild(tdOperation)
	aqiTable.appendChild(newRow)
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
	var city=document.getElementById('aqi-city-input').value
	var aqiValue=document.getElementById('aqi-value-input').value
	addAqiData(city,aqiValue)
	addAqiTableRow(city)
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(sender) {
	var cityRow=sender.target.parentElement.parentElement
	var city=cityRow.children[0].innerText
  	deleteAqiData(city)
  	var aqiTable=document.getElementById('aqi-table')
  	aqiTable.removeChild(cityRow)
}

function init() {
	var btnAdd=document.getElementById('add-btn')
	btnAdd.addEventListener('click',addBtnHandle)
	for(var city in aqiData){
		addAqiTableRow(city)
	}
}

init();
