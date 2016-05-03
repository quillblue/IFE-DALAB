function loadImg(count){
	var colors=['C23531','2F4554', '61A0A8', 'D48265', '91C7AE','749F83',  'CA8622', 'BDA29A','6E7074', '546570', 'C4CCD3']
	var imgList=[]
	for(var i=0;i<count;i++){
		var color=colors[parseInt(Math.random()*10)]
		var width=parseInt(Math.random()*40+20)*10
		var height=parseInt(Math.random()*40+20)*10
		imgList.push('http://placehold.it/'+width+'x'+height+'/'+color+'/fff')
	}
	return imgList
}

function demoInit(){
	var imgList=loadImg(16)
	var waterfallAlbum=new Waterfall('#example-container',imgList,4)
	window.onscroll=function(){
		var screenHeight = (document.documentElement.scrollTop || document.body.scrollTop) +(document.documentElement.clientHeight || document.body.clientHeight);
	    var container = waterfallAlbum.container.children[waterfallAlbum.getMinHeightColumnIndex()];
	    var containerHeight = container.offsetTop  + container.offsetHeight;
	    if (containerHeight < screenHeight) {
	        var newImgList=loadImg(4)
	        waterfallAlbum.insertImage(newImgList)
    	}
	}
}

demoInit()

