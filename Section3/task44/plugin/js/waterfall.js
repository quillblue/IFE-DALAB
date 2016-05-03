function Waterfall(selector,imgs,column,margin){
	this.container=document.querySelector(selector)
	this.photos=imgs
	//this.initGrid
	this.colHeight=new Array(column)
	var that=this
	
	function initShadowMask(){
		var shadowMask=document.createElement('div')
		shadowMask.id='shadowMask'
		document.querySelector('body').appendChild(shadowMask)
	}

	function initGrid(column,margin){
		that.container.classList.add('waterfall-album')
		that.columnHeight=new Array(column)
		for(var i=0;i<column;i++){
			var columnDom=document.createElement('div')
			columnDom.classList.add('waterfall-col')
			if(margin){
				columnDom.style.width=((that.container.clientWidth-0.5)/column-margin)+'px'
				columnDom.style.margin='0 '+margin/2+'px'
			}
			else{
				columnDom.style.width=((that.container.clientWidth-0.5)/column-16)+'px'
			}
			that.container.appendChild(columnDom)
		}
	}

	initShadowMask()
	initGrid(column,margin)
	for(var i=0;i<column;i++){this.colHeight[i]=0}
	this.insertImage(imgs)
}

Waterfall.prototype.insertImage=function(imgList,index){
	//Load Image
	if(!index){index=0}
	if(index>=imgList.length){return;}
	var pic=new Image()
	pic.src=imgList[index]
	var that=this
	var set=setInterval(function(){
		//If Got the width or height from server, deal with image inserting
		if(pic.width>0||pic.height>0){
			var colIndex=that.getMinHeightColumnIndex()
			var targetCol=that.container.children[colIndex]
			var albumItem=document.createElement('div')
			albumItem.classList.add('album-item')
			picDom=document.createElement('img')
			picDom.src=imgList[index]
			picDom.addEventListener('click',function(){
				var shadowMask=document.getElementById('shadowMask')
				shadowMask.style.display='flex'
				shadowMask.innerHTML='<img src="'+this.src+'" />'
				shadowMask.addEventListener('click',function(){
					this.style.display='none'
				})
			})
			albumItem.appendChild(picDom)
			targetCol.appendChild(albumItem)
			that.colHeight[colIndex]+=albumItem.clientHeight

			clearInterval(set)
			index++
			that.insertImage(imgList,index)
		}
	},40)
}

Waterfall.prototype.getMinHeightColumnIndex=function(){
	return this.colHeight.indexOf(this.colHeight.reduce(function(a,b){return a<b?a:b}))
}
