//棋盘方格类
var board={
	container:{},
	height:10,
	width:10,
	wall:[],
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
	},
	hasWall:function(position){
		for(var i=0;i<this.wall.length;i++){
			if(this.wall[i][0]==position[0]&&this.wall[i][1]==position[1]){
				return true;
			}
		}
		return false;
	},
	buildWall:function(position){
		if(!this.hasWall(position)){
			if(position[0]<1||position[0]>this.height||position[1]<1||position[1]>this.width){
				console.log('建墙位置超出边界')
			}
			else{
				var newWall=document.createElement('div')
				newWall.className='wall'
				newWall.style.top=position[0]*40+'px'
				newWall.style.left=position[1]*40+'px'
				this.container.appendChild(newWall)
				this.wall.sort(function(a,b){if(a[0]==b[0]){return a[1]<b[1]}else{return a[0]<b[0]}})
				this.wall.push(position.concat(newWall))
			}
		}
		else{
			console.log('已经有墙了')
		}
	},
	brushWall:function(position,color){
		for(var i=0;i<this.wall.length;i++){
			if(this.wall[i][0]==position[0]&&this.wall[i][1]==position[1]){
				this.wall[i][2].style.backgroundColor=color
				return
			}
		}
		console.log('此处无墙')
	},
	isAccessable:function(position){
		if(position[0]<1||position[0]>this.height||position[1]<1||position[1]>this.width){
			return false;
		}
		else{
			return !this.hasWall(position)
		}
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
		window.setTimeout(callback,100)
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
					case 'TOP':if(this.position[0]>1&&!this.board.hasWall([this.position[0]-1,this.position[1]])){this.position[0]-=1;this.item.style.top=this.position[0]*40+'px'};break;
					case 'RIG':if(this.position[1]<this.board.width&&!this.board.hasWall([this.position[0],this.position[1]+1])){this.position[1]+=1;this.item.style.left=this.position[1]*40+'px'};break;
					case 'BOT':if(this.position[0]<this.board.height&&!this.board.hasWall([this.position[0]+1,this.position[1]])){this.position[0]+=1;this.item.style.top=this.position[0]*40+'px'};break;
					case 'LEF':if(this.position[1]>1&&!this.board.hasWall([this.position[0],this.position[1]-1])){this.position[1]-=1;this.item.style.left=this.position[1]*40+'px'};break;
				}
			}
		}
	},
	build:function(){
		var target=this.position.concat()
		if(this.direction%180==0){
			target[0]+=(this.direction%360==0?-1:1)
		}
		else{
			var face=this.direction%360
			if(face==90||face==-270){
				target[1]+=1
			}
			else{
				target[1]-=1
			}
		}
		this.board.buildWall(target)
	},
	bru:function(color){
		var target=this.position.concat()
		if(this.direction%180==0){
			target[0]+=(this.direction%360==0?-1:1)
		}
		else{
			var face=this.direction%360
			if(face==90||face==-270){
				target[1]+=1
			}
			else{
				target[1]-=1
			}
		}
		this.board.brushWall(target,color)
	},
	moveTo:function(target){
		var target=target.split(',')
		for(var i=0;i<target.length;i++){target[i]=parseInt(target[i])}
		var route=this.routeSearching(target)
		var blockObject=this
		if(route){
			(function moveOneStep(){	
				var tempTarget=route.pop()
				if(tempTarget){
					if(tempTarget[0]==blockObject.position[0]){
						if(tempTarget[1]>blockObject.position[1]){
							blockObject.turnTo('RIG',function(){blockObject.mov('RIG')})
						}
						else{
							blockObject.turnTo('LEF',function(){blockObject.mov('LEF')})
						}
					}
					else{
						if(tempTarget[0]>blockObject.position[0]){
							blockObject.turnTo('BOT',function(){blockObject.mov('BOT')})
						}
						else{
							blockObject.turnTo('TOP',function(){blockObject.mov('TOP')})
						}
					}
					window.setTimeout(function(){
						moveOneStep()
					},500)
				}
			})()
		}
		else{
			console.log('无可达路径')
		}
	},
	routeSearching:function(target){
		//定义起点、OpenSet与CloseSet
		var start={pos:this.position.concat(),dist:0}
		var openList=[start]
		openList.find=function(target){
			for(var i=0;i<openList.length;i++){
				if(openList[i].pos[0]==target[0]&&openList[i].pos[1]==target[1]){
					return openList[i];
				}
			}
			return undefined;
		}
		var closeList=[]
		closeList.contains=function(target){
			for(var i=0;i<closeList.length;i++){
				if(closeList[i].pos[0]==target[0]&&closeList[i].pos[1]==target[1]){
					return true;
				}
			}
			return false;
		}
		//A*方法寻路
		while(openList.length>0){
			var current=openList.pop()
			var nextList=[[current.pos[0],current.pos[1]+1],[current.pos[0],current.pos[1]-1],[current.pos[0]+1,current.pos[1]],[current.pos[0]-1,current.pos[1]]]
			for(var i=0;i<nextList.length;i++){
				if(board.isAccessable(nextList[i])&&!(closeList.contains(nextList[i]))){
					var node=openList.find(nextList[i])
					if(node){
						if(node.dist>current.dist+1){
							node.dist=current.dist+1
							node.parent=current
						}
					}
					else{
						openList.push({pos:nextList[i].concat(),dist:current.dist+1,parent:current})
						openList.sort(function(a,b){return a.dist<b.dist})
					}
				}
			}
			closeList.push(current)
			if(current.pos[0]==target[0]&&current.pos[1]==target[1]){
				break;
			}
		}
		//如果循环并非结束于终点，表明无可达路径
		if(closeList[closeList.length-1].pos[0]!=target[0]||closeList[closeList.length-1].pos[1]!=target[1]){
			return null;
		}
		//倒序输出路径
		var route=[]
		var current=closeList.pop()
		while(current.parent){
			route.push(current.pos)
			current=current.parent
		}
		return route
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
	if(commandPara[0]=='MOV'&&commandPara[1]=='TO'){
		if(commandPara[2]){
			var targetPostion=commandPara[2].split(',')
			return !(isNaN(parseInt(targetPostion[0]))&&isNaN(parseInt(targetPostion[1])))
		}
		else{
			return false;
		}
	}
	switch(commandPara[0]){
		case 'TUN':if(commandPara[1]){return directionDict.indexOf(commandPara[1])>-1}else{return false}
		case 'GO':if(commandPara[1]){return !isNaN(parseInt(commandPara[1]))}else{return true}
		case 'TRA':
		case 'MOV':if(directionDict.indexOf(commandPara[1])>-1){return !(commandPara[2]&&isNaN(parseInt(commandPara[2])))}
		case 'BUILD':return true
		case 'BRU':if(commandPara[1]){return true}
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
				if(command.indexOf('MOV TO')>=0){
					block.moveTo(command.split(' ')[2])
				}
				else{
					switch(command.split(' ')[0]){
						case 'TUN':block.turn(command.split(' ')[1]);break;
						case 'GO':block.mov(undefined,command.split(' ')[1]);break;
						case 'TRA':block.mov(command.split(' ')[1],command.split(' ')[2]);break;
						case 'MOV':block.turnTo(command.split(' ')[1],function(){block.mov(command.split(' ')[1],command.split(' ')[2]);});break;
						case 'BUILD':block.build();break;
						case 'BRU':block.bru(command.split(' ')[1])
					}
			}
			}
			else{
				var errorLine=document.getElementById('line-number-container').children[i]
				errorLine.style.backgroundColor='#f00'
			}
			setTimeout(function(){
				i++
				excuteCommandLine()
			},1000)
		}
	})()
}

function generateRandomWall(){
	var generated=false
	while(!generated){
		var target=[parseInt(Math.random()*board.height)+1,parseInt(Math.random()*board.width)+1]
		if(target[0]!=block.position[0]||target[1]!=block.position[1]){
			if(!board.hasWall(target)){
				board.buildWall(target)
				generated=true
			}
		}
	}
}

function init(){
	var boardContainer=document.getElementById('board-container')
	board.init(boardContainer)
	block.init(board,5,5)
	var btnExcute=document.getElementById('btn-excute')
	var btnGenerateWall=document.getElementById('generate-wall')
	btnExcute.addEventListener('click',excuteCommand)
	btnGenerateWall.addEventListener('click',generateRandomWall)
	var input=document.getElementById('command')
	input.addEventListener('keyup',rowHasChanged)
	input.addEventListener('scroll',commandInputOnScrollHandler)
}

init()