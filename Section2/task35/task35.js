//棋盘方格类
var board={
	container:{},
	height:10,
	width:10,
	init:function(dom){
		this.container=dom
		var rowHeader=document.createElement('ol')
		rowHeader.className='row-header'
		for(var i=0;i<this.width;i++){
			var rowHead=document.createElement('li')
			rowHead.innerText=i+1
			rowHeader.appendChild(rowHead)
		}
		dom.appendChild(rowHeader)
		var rowContainer=document.createElement('ol')
		rowContainer.className='row-container'
		for(var i=0;i<this.height;i++){
			var row=document.createElement('li')
			for(var j=0;j<this.width;j++){
				var cell=document.createElement('div')
				row.appendChild(cell)
			}
			rowContainer.appendChild(row)
		}
		dom.appendChild(rowContainer)
	}
}

//小方块
var block={
	item:'',
	position:Array(2),
	direction:0,
	face:0,
	board:'',
	init:function(board,row,col){
		this.item=document.createElement('div')
		this.item.id='block'
		this.item.style.left=col*40+'px'
		this.item.style.top=row*40+'px'
		this.position[0]=col
		this.position[1]=row
		board.container.appendChild(this.item)
		this.board=board
	},
	turn:function(direction){
		switch(direction){
			case 'LEF':this.direction-=90;break;
			case 'RIG':this.direction+=90;break;
			case 'BAC':this.direction+=180;break;
		}
		this.item.style.transform='rotateZ('+this.direction+'deg)'
	},
	turnTo:function(direction,callback){
		var finalDirection=0;
		switch(direction){
			case 'RIG':finalDirection=90;break;
			case 'BOT':finalDirection=180;break;
			case 'LEF':finalDirection=270;break;
		}
		var angleDelta=(finalDirection-this.direction)%360
		if(angleDelta>180){angleDelta-=360;}
		if(angleDelta<-180){angleDelta+=360;}
		this.item.style.transform='rotateZ('+(this.direction+angleDelta)+'deg)'
		window.setTimeout(callback,500)
	},
	mov:function(direction,step){
		if(step==undefined){step=1}
		if(direction==undefined){
			currentDirection=this.direction%360+(this.direction<0?360:0);
			switch(currentDirection){
				case 0:this.mov('TOP',step);break;
				case 90:this.mov('RIG',step);break;
				case 180:this.mov('BOT',step);break;
				case 270:this.mov('LEF',step);break;
			}
		}
		else{
			for(var i=0;i<step;i++){
				switch(direction){
					case 'TOP':if(this.position[0]>1){this.position[0]-=1;this.item.style.top=this.position[0]*40+'px'};break;
					case 'RIG':if(this.position[1]<this.board.width){this.position[1]+=1;this.item.style.left=this.position[1]*40+'px'};break;
					case 'BOT':if(this.position[0]<this.board.height){this.position[0]+=1;this.item.style.top=this.position[0]*40+'px'};break;
					case 'LEF':if(this.position[1]>1){this.position[1]-=1;this.item.style.left=this.position[1]*40+'px'};break;
				}
			}
		}
	}
}

function rowHasChanged(){
	var input=document.getElementById('command')
	var top=input.scrollTop
	var arr=[]
	var rowsCount=input.value.split('\n').length
	for(var i=0;i<rowsCount;i++){
		arr.push('<li class="lineNumber">'+(i+1)+'</li>')
	}
	var lineNumberContainer=document.getElementById('line-number-container')
	lineNumberContainer.innerHTML=arr.join("")
	lineNumberContainer.scrollTop=top
}

function commandInputOnScrollHandler(){
	var input=document.getElementById('command')
	var lineNumberContainer=document.getElementById('line-number-container')
	lineNumberContainer.scrollTop=input.scrollTop
}

function validateCommand(command){
	var commandPara=command.split(' ')
	var directionDict=['LEF','RIG','TOP','BOT','BAC']
	switch(commandPara[0]){
		case 'TUN':if(commandPara[1]){return directionDict.indexOf(commandPara[1])>-1}else{return false};
		case 'GO':if(commandPara[1]){return !isNaN(parseInt(commandPara[1]))}else{return true;}
		case 'TRA':
		case 'MOV':if(directionDict.indexOf(commandPara[1])>-1){return !(commandPara[2]&&isNaN(parseInt(commandPara[2])))}
		default: return false;
	}
}

function excuteCommand(){
	var allCommands=document.getElementById('command').value.split('\n')
	var i=0;
	(function excuteCommandLine(){
		if(i<allCommands.length){
			var command=allCommands[i].trim().toUpperCase()
			if(validateCommand(command)){
				switch(command.split(' ')[0]){
					case 'TUN':block.turn(command.split(' ')[1]);break;
					case 'GO':block.mov(undefined,command.split(' ')[1]);break;
					case 'TRA':block.mov(command.split(' ')[1],command.split(' ')[2]);break;
					case 'MOV':block.turnTo(command.split(' ')[1],function(){block.mov(command.split(' ')[1],command.split(' ')[2]);});break;
				}
			}
			else{
				var errorLine=document.getElementById('line-number-container').children[i]
				errorLine.style.backgroundColor='#f00'
			}
			setTimeout(function(){
				i++
				excuteCommandLine()
			},500)
		}
	})()
}

function init(){
	var boardContainer=document.getElementById('board-container')
	board.init(boardContainer)
	block.init(board,5,5)
	var btnExcute=document.getElementById('btn-excute')
	btnExcute.addEventListener('click',excuteCommand)
	var input=document.getElementById('command')
	input.addEventListener('keyup',rowHasChanged)
	input.addEventListener('scroll',commandInputOnScrollHandler)
}

init()