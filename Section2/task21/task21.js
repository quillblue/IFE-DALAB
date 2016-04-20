var tagList, hobbyList

Array.prototype.remove=function(dx){
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

function TagPool(container,lengthLimit,listCssClassName){
	this.container=container
	this.lengthLimit=lengthLimit
	this.listCssClassName=listCssClassName
	this.data=[]
}

TagPool.prototype={
	push:function(item){
		item=item.trim()
		if(this.data.indexOf(item)<0){
			this.data.push(item)
			var newNode=document.createElement('div')
			newNode.innerText=item
			newNode.setAttribute('class',this.listCssClassName)
			newNode.addEventListener('mouseover',function(listItem){
				var node=listItem.target
				node.innerHTML='删除'+node.innerHTML
			})
			newNode.addEventListener('mouseout',function(listItem){
				var node=listItem.target
				if(node.innerHTML.indexOf('删除')>=0){
					node.innerHTML=node.innerHTML.substring(2)
				}
			})
			if(this.data.length>this.lengthLimit){
				this.data.shift()
				this.container.removeChild(this.container.children[0])
			}
			this.container.appendChild(newNode)
			var that=this
			newNode.addEventListener('click',function(){
				var parentNode=this.parentNode
				var deleteIndex=0
				for(var i=0;i<parentNode.children.length;i++){
					if(this.isSameNode(parentNode.children[i])){
						deleteIndex=i;
						break;
					}
				}
				this.remove()
				that.data.remove(deleteIndex)
			})
		}
	}
}

function tagInsert(){
	var inputValue=document.getElementById('tag-input').value.trim();
	if(inputValue){
		tagList.push(inputValue)
	}
}

function hobbyInsert(){
	var inputValue=document.getElementById('hobby-input').value;
	var inputItems=inputValue.split(/[,\n\t ，、]/)
	for(var i=0;i<=inputItems.length;i++){
		var item=inputItems[i]
		if(item){
			hobbyList.push(item)
		}
	}
}

function init(){
	tagList=new TagPool(document.getElementById('tag-list'),10,'tag-item tag-pool-item')
	var inputTag=document.getElementById('tag-input')
	inputTag.addEventListener('keyup',function(sender){
		if(sender.keyCode==13){tagInsert()}
	})
	
	hobbyList=new TagPool(document.getElementById('hobby-list'),10,'hobby-item tag-pool-item')
	var btnHobbySubmit=document.getElementById('hobby-submit')
	btnHobbySubmit.addEventListener('click',hobbyInsert)
}

init()