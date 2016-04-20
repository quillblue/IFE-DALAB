var data

function leftPush(){
	var inputValue=parseFloat(document.getElementById('data-input').value);
	if(!isNaN(inputValue)){
		var dataChart=document.getElementById('data-chart')
		var newNode=document.createElement('div')
		newNode.setAttribute('class','data-box')
		newNode.innerText=inputValue
		dataChart.insertBefore(newNode,dataChart.firstChild)
		newNode.addEventListener('click',deleteData)
		data=[inputValue].concat(data)
	}
}

function rightPush(){
	var inputValue=parseFloat(document.getElementById('data-input').value);
	if(!isNaN(inputValue)){
		var dataChart=document.getElementById('data-chart')
		var newNode=document.createElement('div')
		newNode.setAttribute('class','data-box')
		newNode.innerText=inputValue
		dataChart.appendChild(newNode)
		newNode.addEventListener('click',deleteData)
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