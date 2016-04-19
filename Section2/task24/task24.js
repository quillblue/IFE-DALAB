var interval=1000
var currentNode
var nodeStack=Array()
var nodeQueue=Array()
var hitedFlag=false
var selectedNode

/*深度优先遍历*/
function dfsVisiting(keyword){
	if(typeof(keyword)!='string'){keyword=null}
	visitingInit()
	var root=document.getElementById('root')
	nodeStack.push(root);
	(function animation(){
		var currentNode=nodeStack.pop()
		if(currentNode){
			currentNode.style.backgroundColor="#ff0"
            if(currentNode.children.length>0){
            	for(var i=currentNode.children.length-1;i>=0;i--){
            		nodeStack.push(currentNode.children[i])
            	}
            }
			setTimeout(function(){
				if (!(currentNode.firstChild.nodeValue.trim() == keyword)) {
                	currentNode.style.backgroundColor = "#ccc"
	            }else{
	            	currentNode.style.backgroundColor = "#0f0"
	            	hitedFlag=true
	            }
				animation()
			}, interval);
		}
		else{
			if(!hitedFlag&&(keyword!=null)){alert('未命中结果')}
		}
	})()
}

/*广度优先遍历*/
function bfsVisiting(keyword){
	if(typeof(keyword)!='string'){keyword=null}
	visitingInit()
	var root=document.getElementById('root')
	nodeQueue.unshift(root)
	currentNode=root;
	(function animation(){
		var currentNode=nodeQueue.pop()
		if(currentNode){
			currentNode.style.backgroundColor="#ff0"
            if(currentNode.children.length>0){
            	for(var i=0;i<currentNode.children.length;i++){
            		nodeQueue.unshift(currentNode.children[i])
            	}
            }
			setTimeout(function(){
				if (!(currentNode.firstChild.nodeValue.trim() == keyword)) {
                	currentNode.style.backgroundColor = "#ccc"
	            }else{
	            	currentNode.style.backgroundColor = "#0f0"
	            	hitedFlag=true
	            }
				animation()
			}, interval);
		}
		else{
			if(!hitedFlag&&(keyword!=null)){alert('未命中结果')}
		}
	})()
}

//深度优先查找
function dfsSearch(){
	var keyword=document.getElementById('search-input').value.trim()
	if(keyword!=''){dfsVisiting(keyword)}
	else{alert('搜索条件不能为空')}
}

//广度优先查找
function bfsSearch(){
	var keyword=document.getElementById('search-input').value.trim()
	if(keyword!=''){bfsVisiting(keyword)}
	else{alert('搜索条件不能为空')}
}

//初始化遍历动画
function visitingInit(){
	window.clearTimeout()
	hitedFlag=false
	var boxes=document.getElementsByClassName('node')
	for(var i=0;i<boxes.length;i++){
		boxes[i].setAttribute('style','background-color:#fff')
	}
	nodeStack=Array()
	nodeQueue=Array()
}

//选择节点变化
function focusChange(sender){
	if(selectedNode){
		selectedNode.style.backgroundColor='#fff'
	}
	selectedNode=sender.target
	selectedNode.style.backgroundColor='#ffc'
}

//添加节点
function insertNode(){
	if(selectedNode==undefined){alert('请先选择要插入的位置！')}
	else{
		var newNode=document.createElement('div')
		newNode.className='node'
		newNode.innerText=document.getElementById('add-input').value.trim()
		selectedNode.appendChild(newNode)
	}
}

//删除节点
function deleteNode(){
	if(selectedNode==undefined){alert('请先选择要删除的节点！')}
	else{
		var parentNode=selectedNode.parentNode
		parentNode.removeChild(selectedNode)
		selectedNode=undefined
	}
}

/*初始化函数*/
function init(){
	var btnDFS=document.getElementById('dfs')
	var btnBFS=document.getElementById('bfs')
	btnDFS.addEventListener('click',dfsVisiting)
	btnBFS.addEventListener('click',bfsVisiting)
	var btnDFSSearch=document.getElementById('dfs-search')
	var btnBFSSearch=document.getElementById('bfs-search')
	btnDFSSearch.addEventListener('click',dfsSearch)
	btnBFSSearch.addEventListener('click',bfsSearch)
	var btnAddNode=document.getElementById('add-node')
	var btnDeleteNode=document.getElementById('delete-node')
	btnAddNode.addEventListener('click',insertNode)
	btnDeleteNode.addEventListener('click',deleteNode)
	var boxes=document.getElementsByClassName('node')
	for(var i=0;i<boxes.length;i++){
		boxes[i].addEventListener('click',focusChange)
	}
}

init()