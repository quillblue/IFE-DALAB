var data

function leftPush(){
	var inputValue=document.getElementById('data-input').value;
	var inputItems=inputValue.split(/[,\n\t ，、]/)
	for(var i=0;i<=inputItems.length;i++){
		var item=inputItems[i]
		if(item!=undefined){
			var dataChart=document.getElementById('data-chart')
			var newNode=createNewNode(item)
			dataChart.insertBefore(newNode,dataChart.firstChild)
			data=[item].concat(data)
		}
	}
}

function rightPush(){
	var inputValue=document.getElementById('data-input').value;
	var inputItems=inputValue.split(/[,\n\t ，、]/)
	for(var i=0;i<=inputItems.length;i++){
		var item=inputItems[i]
		if(item!=undefined){
			var dataChart=document.getElementById('data-chart')
			var newNode=createNewNode(item)
			dataChart.appendChild(newNode)
			data.push(item)
		}
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

function createNewNode(data){
	var newNode=document.createElement('div')
	newNode.setAttribute('class','data-box')
	newNode.innerText=data
	newNode.addEventListener('click',deleteData)
	return newNode
}

function searchHandler(){
	var searchInput=document.getElementById('search-input').value
	var dataChart=document.getElementById('data-chart')
	if(searchInput!=''){
		for(var i=0;i<dataChart.children.length;i++){
			dataChart.children[i].style.backgroundColor='#f00'
		}
		for(var i=0;i<data.length;i++){
			if(data[i].indexOf(searchInput)>=0){
				dataChart.children[i].style.backgroundColor='#00f'
			}
		}
	}
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
	var btnSearch=document.getElementById('search-button')
	btnSearch.addEventListener('click',searchHandler)
}

init()