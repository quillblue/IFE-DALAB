function Bucket(selector,imgs,minHeight){
	if(minHeight){this.minHeight=minHeight}else{this.minHeight=150}
	this.container=document.querySelector(selector)
	this.container.classList.add('bucket-album')
	
	this.currentSpaceLeft=this.container.clientWidth
	this.currentRow=document.createElement('div')
	this.currentRow.classList.add('bucket-row')
	this.currentRow.style.height=this.minHeight+'px'
	this.container.appendChild(this.currentRow)

	function initShadowMask(){
		var shadowMask=document.createElement('div')
		shadowMask.id='shadowMask'
		document.querySelector('body').appendChild(shadowMask)
	}

	initShadowMask()
	this.insertImage(imgs)
}

Bucket.prototype.insertImage=function(imgList,index){
	//Load Image
	if(!index){index=0}
	if(index>=imgList.length){return;}
	var pic=new Image()
	pic.src=imgList[index]
	var that=this
	var set=setInterval(function(){
		//If Got the width or height from server, deal with image inserting
		if(pic.width>0||pic.height>0){
			if(that.currentSpaceLeft-pic.width*that.minHeight/pic.height<0){
				//This row is full, will wrap it up and set up another
				that.currentRow.style.height=that.minHeight/(that.container.clientWidth-that.currentSpaceLeft)*that.container.clientWidth+'px'
				//for(var i=0;i<that.currentRow.style.length)
				that.currentRow=document.createElement('div')
				that.currentRow.classList.add('bucket-row')
				that.currentRow.style.height=that.minHeight+'px'
				that.container.appendChild(that.currentRow)
				that.currentSpaceLeft=that.container.clientWidth
			}
			//Add the image to this row and recalculate the space left
			var picContainer=document.createElement('div')
			picContainer.classList.add('bucket-item')
			var picDom=document.createElement('img')
			picDom.src=imgList[index]
			picContainer.appendChild(picDom)
			that.currentRow.appendChild(picContainer)
			that.currentSpaceLeft-=pic.width*that.minHeight/pic.height

			clearInterval(set)
			index++
			that.insertImage(imgList,index)
		}
	},40)
}

