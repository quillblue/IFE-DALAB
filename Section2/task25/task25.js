function TreeNode(data,treeObj){
	var domNode=document.createElement('div')
	domNode.className='node'
	domNode.expanded=true
	domNode.treeObj=treeObj
	
	// +/- icon and Expand/Fold Handler
	var iconNode=document.createElement('span')
	iconNode.className='icon'
	iconNode.innerHTML='-'
	iconNode.addEventListener('click',function(){
		if(this.expanded){
			this.innerHTML='+'
			this.parentNode.children[2].style.display='none'
			this.expanded=false
		}
		else{
			this.innerHTML='-'
			this.parentNode.children[2].style.display='block'
			this.expanded=true
		}
	})
	

	var valueNode=document.createElement('span')
	if(typeof(data)=='object'){
		valueNode.innerHTML=data.value
	}
	else{
		valueNode.innerHTML=data
	}
	
	var childrenListNode=document.createElement('div')
	childrenListNode.className='children'
	if(typeof(data)=='object'){
		for(var i=0;i<data.children.length;i++){
			childrenListNode.appendChild(new TreeNode(data.children[i]))
		}
	}
	domNode.appendChild(iconNode)
	domNode.appendChild(valueNode)
	domNode.appendChild(childrenListNode)

	valueNode.onclick=function(){
		that.treeObj.selectedNode=this.parentNode
		this.style.backgroundColor='#ff0'
	}
	return domNode
}

function Tree(container,data){
	this.root=TreeNode(data,this)
	this.container=container
	container.appendChild(this.root)
}

Tree.prototype={
	selectedNode:null,
	init:function(container,data){
		
	}
	insertNode:function(parent,value){
		var childNode=new TreeNode(value)
		parent.children[2].appendChild(childNode.domElement)
	},
	deleteNode:function(node){
		node.remove()
	},
	search:function(keyword){
		var nodeList=this.container.getElementsByClassName('node')
		var nodeInSearchHitStyle=this.container.getElementsByClassName('search-hit')
		for(var i=0;i<nodeInSearchHitStyle.length;i++){
			nodeInSearchHitStyle[i].className=nodeInSearchHitStyle[i].className.split(' ')[0]
		}
		for(var i=0;i<nodeList.length;i++){
			if(nodeList[i].children[1].innerHTML.indexOf(keyword)>=0){
				nodeList[i].children[1].className+=' search-hit'
				nodeList[i].parentNode.style.display='block'

			}
		}
	}
}

var initialData={value:'All',children:[
	{value:'Food',children:[

	]},
	{value:'Drink',children:[
		{value:'Water',children:[]},
		{value:'Coke',children:[]},
		{value:'Juice',children:[

		]}
	]}
]}

var treeObject
function init(){
	var treeContainer=document.getElementById('tree')
	treeObject=new Tree(treeContainer,initialData)
	var btnSearch=document.getElementById('btn-search')
	btnSearch.addEventListener('click',function(){
		var keyword=document.getElementById('input-search').value
		if(keyword!=''){
			treeObject.search(keyword)
		}
	})
	var btnAdd=document.getElementById('btn-add')
	var btnDelete=document.getElementById('btn-delete')
	btnAdd.addEventListener('click',function(){
		var nodeValue=document.getElementById('input-add').value.trim()
		if(nodeValue==''){alert('节点值不能为空！');return;}
		if(treeObject.selectedNode){
			alert('请选择一个父元素')
		}
		else{
			treeObject.insertNode(treeObject.selectedNode,nodeValue)
		}
	})
}

init()