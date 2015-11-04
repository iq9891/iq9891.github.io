init(16.5,"legend",480,780,load);
var imgData = [
			{ type: "js", path: "./js/gameMain.js" },
			{ type: "js", path: "./js/gameTk.js" },
			{ type: "js", path: "./js/gameItem.js" },
			{ name: "gTk1", path: "./images/gTk1.png" },
			{ name: "gTk3", path: "./images/gTk3.png" },
			{ name: "gFont1", path: "./images/gFont1.png" },
			{ name: "gFont2", path: "./images/gFont2.png" },
			{ name: "gFont3", path: "./images/gFont3.png" },
			{ name: "gFont4", path: "./images/gFont4.png" },
			{ name: "gFont5", path: "./images/gFont5.png" },
			{ name: "gBtnMask0", path: "./images/gBtnMask0.png" },
			{ name: "gBtnMask1", path: "./images/gBtnMask1.png" },
			{ name: "gBtnMask2png", path: "./images/gBtnMask2.png" },
			{ name: "shareTk", path: "./images/shareTk.png" },
			{ name: "gBgTop", path: "./images/gBgTop.jpg" },
			{ name: "gGrid", path: "./images/gGrid.png" },
			{ name: "gItem", path: "./images/gItem.png" },
			{ name: "gBgBot", path: "./images/gBgBot.jpg" },
			{ name: "gStart", path: "./images/gStart.png" },
			{ name: "gJindu", path: "./images/gMoveBg.png" },
			{ name: "gHeadImgMan", path: "./images/gHeadImgMan.png" },
			{ name: "gHeadImgWoMan", path: "./images/gHeadImgWoMan.png" },
			{ name: "gClold1", path: "./images/gClold1.png" },
			{ name: "gClold2", path: "./images/gClold2.png" },
			{ name: "gMerge", path: "./images/gMerge.png" }
		],
		_win = window,
		_doc = document,
		oMath = Math,
		oMathRan = oMath.random,
		imglist, loadingLayer,
		fMfloor = oMath.floor,
		gameLayer,gBtn1,gBtn2,
		tkLayer,loseLayer,noAwardLayer,getVoucherLayer,maskTkLayer,shareLayer,maskShape,
		iInitNumX = 4,
		iInitNumY = 5,
		iGridX = 112,
		iAllTime = 30,
		tempTime = 0,
		teimTimeSec = 0,
		iNumW = 13,	//时间数字宽度
		iNumH = 33,	//时间数字高度
		iManEnd = 105, //男头像起始位置
		iManStart = 345, //男头像终点位置
		iManDiff = iManStart - iManEnd,
		iStep = 30,	//当超了就能追上
		
		startTime = 0,
		bStart = false;

function load(){

	loadingLayer = new LoadingSample4("","#065fb0","#ffffff");
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

function doScroll() {
    if (_win.pageYOffset === 0) {
        _win.scrollTo(0, 1);
    }
}

_win.addEventListener('load', function () {
    setTimeout(doScroll, 100);
}, false);

_win.addEventListener("onorientationchange" in _win ? "orientationchange" : "resize", function () {
	var $rotate = $(".rotate");
	if(window.orientation==180||window.orientation==0){$rotate.hide();};
	if(window.orientation==90||window.orientation==-90){$rotate.show();}
	setTimeout(doScroll, 100);
}, false);

//设备判断
if (LGlobal.canTouch) {
	LGlobal.stageScale = LStageScaleMode.NO_BORDER;
} else {
	LGlobal.stageScale = LStageScaleMode.SHOW_ALL;
}
LSystem.screen(LStage.FULL_SCREEN);

function main(){

    var onFrameLayer = new LSprite();
	    addChild(onFrameLayer);

    gameLayer = new Game();
	addChild(gameLayer);

    tkLayer = new LSprite();
	addChild(tkLayer);
	
	//添加所有弹框
	addTkFn();

    //添加游戏关键帧
    onFrameLayer.addEventListener(LEvent.ENTER_FRAME, onframe);
	
}

function onframe(){
	if(!bStart){return;}

	//曲线在动
	if(gameLayer.gJindu.x >= 960 - LGlobal.width){
		gameLayer.gJindu.x = 1;
	}
	gameLayer.gJindu.x++;

	//云彩动
	if(gameLayer.gClold2.x >= 960 - LGlobal.width){
		gameLayer.gClold2.x = 0.5;
	}
	gameLayer.gClold2.x+=0.4;
	if(gameLayer.gClold1.x >= 960 - LGlobal.width){
		gameLayer.gClold1.x = 0.3;
	}
	gameLayer.gClold1.x+=0.2;

	//倒计时
	tempTime = (new Date().getTime() - startTime) + "";
	teimTimeSec = parseInt(tempTime.substr(0, tempTime.length - 3));
	if (teimTimeSec >= 0 && teimTimeSec != tempTime) {
		var iTime = (iAllTime - teimTimeSec).toString();
		//改变时间
		gameLayer.changeTimeFn(iTime);
		//男神移动
		if(gameLayer.iClickNum >= iStep){
			gameLayer.manMoveFn(iAllTime-iTime);
		}
		if (iTime <= 0) {//游戏结束，时间到了
			//游戏胜利，开始抽奖
			overFn();
			winFn();
		}
	}
	
};

function reStartFn(){
	
	window.location.reload();

};

function winFn(){
	//获奖
	$(".tk1,.mask").show();
	//alert("开始抽奖"); 
};

function loseFn(){
	$(".tk1,.mask").show();
	//失败弹框显示
	//showHideTkFn(loseLayer,true);
};

function overFn(){
	if(!bStart){return;}
	//console.log("游戏结束");
	gameLayer.gHeadImgWoMan.stop();
	gameLayer.gHeadImgMan.stop();
	bStart = false;
};