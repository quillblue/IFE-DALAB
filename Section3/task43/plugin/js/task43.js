function JigSawAlbum(selector,imgs){
	this.container=document.querySelector(selector)
	this.photos=imgs.slice(0,6)
	this.init()
	this.resize()
	var that=this
	window.addEventListener('resize',function(){that.resize(true)})
}

JigSawAlbum.prototype.init=function(){
	this.container.classList.add('jigsaw-album-'+this.photos.length)
	for(var i=0;i<this.photos.length;i++){
		var picContainer=document.createElement('div')
		picContainer.className='album-item'
		picDom=document.createElement('img')
		picDom.src=this.photos[i]
		picDom.onload=this.imgResize
		picContainer.appendChild(picDom)
		this.container.appendChild(picContainer)
	}
}

JigSawAlbum.prototype.resize=function(isImgLoaded){
	var sizes=this.getSize(this.photos.length)
	var picContainers=this.container.children;
	for(var i=0;i<this.photos.length;i++){
		picContainers[i].style.height=sizes[i].height+'px'
		picContainers[i].style.width=sizes[i].width+'px'
		if(sizes[i].right){
			picContainers[i].style.float='right'
		}
		if(isImgLoaded){
			var img=picContainers[i].children[0]
			if(img.originalHeight/img.originalWidth<sizes[i].height/sizes[i].width){
				img.style.width=''
				img.style.height='100%'
				img.style.left=(sizes[i].width-img.originalWidth*sizes[i].height/img.originalHeight)/2+'px'
				img.style.top='0px'
			}
			else{
				img.style.height=''
				img.style.width='100%'
				img.style.top=(sizes[i].height-img.originalHeight*sizes[i].width/img.originalWidth)/2+'px'
				img.style.left='0px'
			}
		}
	}
}

JigSawAlbum.prototype.getSize=function(){
	var sizes=[]
	//避免width与height非整数时的溢出
	var height=this.container.clientHeight-0.5
	var width=this.container.clientWidth-0.5
	switch(this.photos.length){
		case 1:sizes=[{height:height,width:width}];break;
		case 2:sizes=[{height:height,width:width/3*2},{height:height,width:width/3*2,right:true}];break;
		case 3:sizes=[{height:height,width:width-height/2},{height:height/2,width:height/2},{height:height/2,width:height/2}];break;
		case 4:sizes=[{height:height/2,width:width/2},{height:height/2,width:width/2},{height:height/2,width:width/2},{height:height/2,width:width/2}];break;
		case 5:
		    sizes=[{height:height/3*2,width:width/3*2},{height:width/3,width:width/3,right:true},{height:height-width/3,width:width/3,right:true},{height:height/3,width:width/3},{height:height/3,width:width/3}];
		    if (width > height * 2) {
    			sizes.push(sizes.splice(2, 1)[0])
    		}
		    break;
		case 6:sizes=[{height:height/3*2,width:width/3*2},{height:height/3,width:width/3},{height:height/3,width:width/3},{height:height/3,width:width/3},{height:height/3,width:width/3},{height:height/3,width:width/3}];break;
	}
	return sizes;
}

JigSawAlbum.prototype.imgResize=function(){
	var container=this.parentNode
	this.originalHeight=this.clientHeight
	this.originalWidth=this.clientWidth
	if(this.clientHeight/this.clientWidth<container.clientHeight/container.clientWidth){
		this.style.height='100%'
		this.style.left=(container.clientWidth-this.clientWidth)/2+'px'
	}
	else{
		this.style.width='100%'
		this.style.top=(container.clientHeight-this.clientHeight)/2+'px'
	}
}


function demoInit(){
	var imgList=['img/1.jpg','img/2.jpg','img/3.jpg','img/4.jpg','img/5.jpg','img/6.jpg']
	for(var i=1;i<=6;i++){
		new JigSawAlbum('#example'+i,imgList.slice(0,i))
	}
}

demoInit()