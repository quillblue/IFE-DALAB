var data

function leftPush(){
	var inputValue=parseFloat(document.getElementById('data-input').value);
	if(dataAcceptable(inputValue)){
		var dataChart=document.getElementById('data-chart')
		var newNode=generateNewNode(inputValue)
		dataChart.insertBefore(newNode,dataChart.firstChild)
		
		data=[inputValue].concat(data)
	}
}

function rightPush(){
	var inputValue=parseFloat(document.getElementById('data-input').value);
	if(dataAcceptable(inputValue)){
		var dataChart=document.getElementById('data-chart')
		var newNode=generateNewNode(inputValue)
		dataChart.appendChild(newNode)
		data.push(inputValue)
	}
}

function leftPop(){
	var dataChart=document.getElementById('data-chart')
	var nodeToBeDeleted=dataChart.children[0]
	alert(nodeToBeDeleted.innerText)
	dataChart.removeChild(nodeToBeDeleted)
	data=data.splice(1)
}

function rightPop(){
	var dataChart=document.getElementById('data-chart')
	var nodeToBeDeleted=dataChart.children[dataChart.children.length-1]
	alert(nodeToBeDeleted.innerText)
	dataChart.removeChild(nodeToBeDeleted)
	data.pop()
}

function deleteData(sender){
	var dataChart=document.getElementById('data-chart')
	var nodeToBeDeleted=sender.target
	var deleteIndex=0
	for(var i=0;i<dataChart.children.length;i++){
		if(nodeToBeDeleted.isSameNode(dataChart.children[i])){
			deleteIndex=i
		}
	}
	dataChart.removeChild(nodeToBeDeleted)
	data.remove(deleteIndex)
}

Array.prototype.remove=function(dx)
{
    if(isNaN(dx)||dx>this.length){return false;}
    for(var i=0,n=0;i<this.length;i++)
    {
        if(this[i]!=this[dx])
        {
            this[n++]=this[i]
        }
    }
    this.length-=1
}

//验证是否能插入新数据
function dataAcceptable(inputValue){
	if(inputValue<10||inputValue>100||isNaN(inputValue)){
		alert('请输入10-100间的数')
		return false;
	}
	else{
		if(data.length>=60){
			alert('队列数量超过了60')
			return false;
		}
		else{
			return true;
		}
	}
}

//生成新的DOM
function generateNewNode(inputValue){
	var newNode=document.createElement('div')
	newNode.setAttribute('class','data-box')
	newNode.setAttribute('style','height:'+inputValue*2+'px;')

	newNode.addEventListener('click',deleteData)
	return newNode
}

function init(){
	data=[]
	var btnLeftPush=document.getElementById('left-push')
	btnLeftPush.addEventListener('click',leftPush)
	var btnRightPush=document.getElementById('right-push')
	btnRightPush.addEventListener('click',rightPush)
	var btnLeftPop=document.getElementById('left-pop')
	btnLeftPop.addEventListener('click',leftPop)
	var btnRightPop=document.getElementById('right-pop')
	btnRightPop.addEventListener('click',rightPop)
}

init()