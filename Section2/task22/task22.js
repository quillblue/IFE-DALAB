var currentNode
var nodeStack=Array()

/*前序遍历*/
function preOrderVisiting(){
	visitingInit()
	var root=document.getElementById('root')
	nodeStack.push(root)
	currentNode=root;
	root.setAttribute('style','background-color:#00f')
	window.setInterval(preOrderInterval,1000)
}

//前序遍历循环执行部分
function preOrderInterval(){
	currentNode.setAttribute('style','background-color:#ff0')
	if(nodeStack.length==0){
		window.clearInterval()
	}
	else{
		currentNode=nodeStack.pop()
		currentNode.setAttribute('style','background-color:#00f')
		if(currentNode.children.length>0){
			nodeStack.push(currentNode.lastElementChild)
			nodeStack.push(currentNode.firstElementChild)
		}
	}
}

/*中序遍历*/
function middleOrderVisiting(){
	visitingInit()
	var root=document.getElementById('root')
	nodeStack.push(root)
	currentNode=root;
	root.setAttribute('style','background-color:#00f')
	window.setInterval(middleOrderInterval,1000)
}

//中序遍历循环执行部分
function middleOrderInterval(){
	if(currentNode.children.length>0&&!currentNode.visited){
		currentNode.visited=true
		nodeStack.push(currentNode.lastElementChild)
		nodeStack.push(currentNode)
		nodeStack.push(currentNode.firstElementChild)
		currentNode.setAttribute('style','background-color:#0f0')
		currentNode=nodeStack.pop()
		currentNode.setAttribute('style','background-color:#00f')
	}
	else{
		currentNode.setAttribute('style','background-color:#ff0')
		if(nodeStack.length==0){
			window.clearInterval();
		}
		else{
			currentNode=nodeStack.pop()
			currentNode.setAttribute('style','background-color:#00f')
		}
	}
}

/*后序遍历*/
function postOrderVisiting(){
	visitingInit()
	var root=document.getElementById('root')
	currentNode=root;
	currentNode.setAttribute('style','background-color:#00f')
	window.setInterval(postOrderInterval,1000)
}

//后序遍历循环执行部分
function postOrderInterval(){	
	if(currentNode.children.length>0&&!currentNode.visited){
		currentNode.visited=true
		nodeStack.push(currentNode)
		nodeStack.push(currentNode.lastElementChild)
		nodeStack.push(currentNode.firstElementChild)
		currentNode.setAttribute('style','background-color:#0f0')
		currentNode=nodeStack.pop()
		currentNode.setAttribute('style','background-color:#00f')
	}
	else{
		currentNode.setAttribute('style','background-color:#ff0')
		if(nodeStack.length==0){
			window.clearInterval();
		}
		else{
			currentNode=nodeStack.pop()
			currentNode.setAttribute('style','background-color:#00f')
		}
	}
}

//初始化遍历动画
function visitingInit(){
	window.clearInterval()
	var boxes=document.getElementsByClassName('node')
	for(var i=0;i<boxes.length;i++){
		boxes[i].setAttribute('style','background-color:#fff')
		boxes[i].visited=false;
	}
	nodeStack=Array()
}

/*初始化函数*/
function init(){
	var btnPreOrder=document.getElementById('preorder')
	var btnMiddleOrder=document.getElementById('middleorder')
	var btnPostOrder=document.getElementById('postorder')
	btnPreOrder.addEventListener('click',preOrderVisiting)
	btnMiddleOrder.addEventListener('click',middleOrderVisiting)
	btnPostOrder.addEventListener('click',postOrderVisiting)
}

init()