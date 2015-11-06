init(16.5,"legend",640,1140,load);
var imgData = [
			{ type: "js", path: "./js/radicalBlockGame.js" },
			{ name: "bg", path: "./images/homeBg.jpg" },
			{ name: "gbg", path: "./images/star.jpg" },
			{ name: "gameRes", path: "./images/gameRes.png" }
		],
		_win = window,
		_doc = document,
		od = ('ontouchstart' in _win) ? "touchend" : "click",
		imglist, loadingLayer,
		index,game,
		randomNum = function (minNum,maxNum){ 
			switch(arguments.length){ 
				case 1: 
					return parseInt(Math.random()*minNum+1); 
				break; 
				case 2: 
					return parseInt(Math.random()*(maxNum-minNum+1)+minNum); 
				break; 
				default: 
					return 0; 
				break; 
			} 
		},
		iSpeed = 8,
		iTemSpeed = 13,
		iTemGap = 60,
		iTemStep = 0,
		bStart = false;

function load(){

	//设备判断
	if (LGlobal.mobile) {
		if (window.innerHeight / window.innerWidth > 1.48) {
			LGlobal.width = 640;
			LGlobal.height = 640 * window.innerHeight / window.innerWidth;
			LGlobal.canvasObj.width = LGlobal.width;
			LGlobal.canvasObj.height = LGlobal.height;
		}
	}
	LGlobal.align = LStageAlign.TOP_MIDDLE;
	LGlobal.stageScale = LStageScaleMode.SHOW_ALL;
	LSystem.screen(LStage.FULL_SCREEN);

	loadingLayer = new LoadingSample4('','','#13f8fc');
    addChild(loadingLayer);
    LLoadManage.load(
		imgData,
		function (progress) {
		    loadingLayer.setProgress(progress);
		},
		function (result) {
		    imglist = result;
		    removeChild(loadingLayer);
		    loadingLayer = null;
		    main();
		}
	);
};

_doc.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

function doScroll() {if (_win.pageYOffset === 0) {_win.scrollTo(0, 1);}}

_win.addEventListener('load', function () {setTimeout(doScroll, 100);}, false);

_win.addEventListener("onorientationchange" in _win ? "orientationchange" : "resize", function () {
	if (window.orientation == 180 || window.orientation == 0) { setTimeout(function () { LGlobal.resize();doScroll(); }, 300);}
	if (window.orientation == 90 || window.orientation == -90) { setTimeout(function () { LGlobal.resize();doScroll(); }, 300);}
}, false);

function main(){
	//首页

	index = new LSprite();
	addChild(index);

	iBg = new LSprite();
	iBg.addChild(new LBitmap(new LBitmapData(imglist["bg"])));
	index.addChild(iBg);

	var iStart = new LSprite();
	iStartBit = new LBitmap(new LBitmapData(imglist["gameRes"],0,0,88,325));
	iStartBit.bitmapData.setCoordinate(80, 1695);
	iStart.addChild(iStartBit);
	iBg.addChild(iStart);
	iStart.x = 157;
	iStart.y = 700;
	iStart.rotate = -90;

	//删除记录提示
	//localStorage.removeItem('tips');

	//游戏开始
	iStart.addEventListener(LMouseEvent.MOUSE_DOWN, function(){
		index.remove();
		bStart = true;
		game = new Game();
		addChild(game);
	});

//	bStart = true;
//	game = new Game();
//	addChild(game);
	
	var onFrameLayer = new LSprite();
	addChild(onFrameLayer);

	//添加游戏关键帧
	onFrameLayer.addEventListener(LEvent.ENTER_FRAME, onframe);

}

function onframe(){

	if(!bStart||game.bTruePlay){ return;}
	
	//背景循环播放
	if(game.gPlayBg1.y>=1140){
		game.gPlayBg1.y = game.gPlayBg2.y - 1139;
	}
	if(game.gPlayBg2.y>=1140){
		game.gPlayBg2.y = game.gPlayBg1.y - 1139;
	}
	game.gPlayBg1.y+=iSpeed;
	game.gPlayBg2.y+=iSpeed;

	game.itemRunFn();
	if(++iTemStep>=iTemGap){
		iTemStep = 0;
		game.addItemFn(randomNum(0,1));
	}

};

//重新开始
function reStartFn(){
	iTemStep = 0;
	game.remove();
	game = null;
	bStart = true;
	game = new Game();
	addChild(game);
};

//游戏结束方法
function overFn(){
	bStart = false;
	//console.log('结束');

	//记录分数
	var iReload = 0;
	if(localStorage.getItem('score')){
		iReload = localStorage.getItem('score');
	}
	if(iReload<game.iScore){	//如果分数没有之前的高
		localStorage.setItem('score',game.iScore);
	}

	var sTag = '游戏结束，您的得分是'+game.iScore+',您的历史最高得分是'+iReload+'，再玩一局吗？';

	if(confirm(sTag)){
		reStartFn();
	}

};