init(16.5,"legend",480,780,load);
var imgData = [
			{ type: "js", path: "./js/gGame.js?a=1" },
			{ name: "gInterBg", path: "./images/gInterBg.jpg" },
			{ name: "gInterMan", path: "./images/gInterMan.png" },
			{ name: "gInterWoMan", path: "./images/gInterWoMan.png" },
			{ name: "gMask", path: "./images/gMask.jpg" },
			{ name: "gPlayBg", path: "./images/gPlayBg.jpg" },
			{ name: "gTop", path: "./images/gTop.png" },
			{ name: "gDriver", path: "./images/gDriver.png" },
			{ name: "gLeftBtn", path: "./images/gLeftBtn.png" },
			{ name: "gRightBtn", path: "./images/gRightBtn.png" },
			{ name: "gCount03", path: "./images/gCount3.png" },
			{ name: "gCount02", path: "./images/gCount2.png" },
			{ name: "gCount01", path: "./images/gCount1.png" },
			{ name: "gIngBtn", path: "./images/gIngBtn.png" },
			{ name: "gLoseReStart", path: "./images/gLoseReStart.png" },
			{ name: "gLose02", path: "./images/gLose02.png" },
			{ name: "gLose01", path: "./images/gLose01.png" },
			{ name: "gLoseDialog02", path: "./images/gLoseDialog02.png" },
			{ name: "gLoseDialog01", path: "./images/gLoseDialog01.png" },
			{ name: "gSuc", path: "./images/gSuc0.png" },
			{ name: "gLose12", path: "./images/gLose12.png" },
			{ name: "gLose11", path: "./images/gLose11.png" },
			{ name: "gLoseDialog12", path: "./images/gLoseDialog12.png" },
			{ name: "gLoseDialog11", path: "./images/gLoseDialog11.png" },
			{ name: "gMusic", path: "./images/gMusic.png" },
			{ name: "gMusic1", path: "./images/gMusic1.png" },
			{ name: "gInfoBtn", path: "./images/gInfoBtn.png" },
			{ name: "gInfo", path: "./images/gInfo.png" },
			{ name: "gInterClose", path: "./images/gInterClose.png" },
			{ name: "gNum", path: "./images/gNum.png" }
		],
		_win = window,
		_doc = document,
		oMath = Math,
		fMfloor = oMath.floor,
		imglist, loadingLayer,soundBg,soundLose0,soundLose1,
		game,interBg,
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
		bCount = false,//true, //可以倒计时// 
		iDriverW = 243,
		iSex = 0, //性别默认男性
		iPlayTime = 2,	//次数
		iCountAllTime = 4,
		cTepTime = 0,
		countTimeSec = 0,
		countTime = 0,
		tempTime = 0,
		teimTimeSec = 0,
		startTime = 0,
		iMyTime = 0,
		iBalance = 2, //平衡基点
		iBalGap = 60,
		iBalAdd = 0,
		iBalStep = 0,
		iBalSacle = 0,	//难度
		iDir = 0,	//0→男，1→女
		iHeadDir = 0,	//单数为左，双数为右
		bPlayStart = false,//游戏时候开始
		bCountTime = false,	//游戏计时开关
		bCanChange = true,	//按钮高亮开关
		
		iDownCountAllTime = 1,
		cDownTepTime = 0,
		countDownTime = 0,
		countDownTimeSec = 0,
		bDownCount = false,
		touchPointIDList = [],
		
		iSpeed = 0,	//点击之后加速
		iSpeedNum = 0,	//减速
		bCanAddSpeed = false,	//加速按钮
		bCanDecSpeed = false,	//加速按钮


		oUp = ('ontouchstart' in window) ? "touchend" : "click";

function load(){
	
	//设备判断
	if (LGlobal.canTouch) {
		LGlobal.width = 480;
		LGlobal.height = 480 * window.innerHeight / window.innerWidth;
		LGlobal.canvasObj.width = LGlobal.width;
		LGlobal.canvasObj.height = LGlobal.height;
		LGlobal.align = LStageAlign.TOP_Middle;
		LGlobal.stageScale = LStageScaleMode.NO_BORDER;
		LSystem.screen(LStage.FULL_SCREEN);
	} else {
		LGlobal.stageScale = LStageScaleMode.SHOW_ALL;
	}

	loadingLayer = new LoadingSample4();
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
    if (_win.pageYOffset === 0) {_win.scrollTo(0, 1);}
}

_win.addEventListener('load', function () {setTimeout(doScroll, 100);}, false);

_win.addEventListener("onorientationchange" in _win ? "orientationchange" : "resize", function () {
	if (_win.orientation == 180 || _win.orientation == 0) {
		$(".rotating").hide();
	}
	if (_win.orientation == 90 || _win.orientation == -90) {
		$(".rotating").show();
	}
	setTimeout(doScroll, 100);
}, false);

function main(){

	LMultitouch.inputMode = LMultitouchInputMode.TOUCH_POINT;
	
	var bDown = false;
	
	//首页
	interBg = new LSprite();
	interBg.addChild(new LBitmap(new LBitmapData(imglist["gInterBg"])));
	addChild(interBg);
	interBg.addEventListener(LMouseEvent.MOUSE_UP, interGameFn);
	
	//首页按钮
	var gInterMan = new LSprite();
	gInterMan.addChild(new LBitmap(new LBitmapData(imglist["gInterMan"])));
	gInterMan.x = 60;
	gInterMan.y = 543;
	interBg.addChild(gInterMan);
	gInterMan.addEventListener(LMouseEvent.MOUSE_DOWN, function(e){
		//soundBg.play();
		iSex = 0;
		downBtnFn();
	});

    var gInterWoMan = new LSprite();
	gInterWoMan.addChild(new LBitmap(new LBitmapData(imglist["gInterWoMan"])));
	gInterWoMan.x = 248;
	gInterWoMan.y = 606;
	interBg.addChild(gInterWoMan);
	gInterWoMan.addEventListener(LMouseEvent.MOUSE_DOWN, function(){
		//soundBg.play();
		iSex = 1;
		downBtnFn();
	});

    var gInterInfo = new LSprite();
	gInterInfo.addChild(new LBitmap(new LBitmapData(imglist["gInfoBtn"])));
	gInterInfo.x = 45;
	gInterInfo.y = 456;
	interBg.addChild(gInterInfo);
	gInterInfo.addEventListener(LMouseEvent.MOUSE_DOWN, function(){
		gInterMask.visible = true;
		gInterTk.visible = true;
		gInterClose.visible = true;
	});

	//点击按钮
	function downBtnFn(){bDown = true;}

	//进入游戏主页
	function interGameFn(){
		if(bDown){
			interBg.remove();
			
			//游戏主页
			game = new Game(iSex);
			addChild(game);
			
		}
	};
//	
//	//游戏主页
//	game = new Game(iSex);
//	addChild(game);


    var onFrameLayer = new LSprite();
	    addChild(onFrameLayer);

    //添加游戏关键帧
    onFrameLayer.addEventListener(LEvent.ENTER_FRAME, onframe);
	
	/*音乐按钮*/
	var gMusic = new LSprite();
		gMusicBit = new LBitmap(new LBitmapData(imglist["gMusic"],0,0,80,84));
		gMusic.addChild(gMusicBit);
		addChild(gMusic);
		gMusic.y = 57,
		audio = document.getElementById('audio');

	gMusic.addEventListener(LMouseEvent.MOUSE_DOWN, function(){
		if(!audio.paused){
			gMusicBit.bitmapData.setCoordinate(0, 84);
			audio.pause();
		}else{
			gMusicBit.bitmapData.setCoordinate(0, 0);
			audio.play();
		}
	});
	
	//说明遮罩
    var gInterMask = new LSprite();
	gInterMask.addChild(new LBitmap(new LBitmapData(imglist["gMask"])));
	gInterMask.visible = false;
	interBg.addChild(gInterMask);
    var gInterTk = new LSprite();
	gInterTk.addChild(new LBitmap(new LBitmapData(imglist["gInfo"])));
	gInterTk.x = 44;
	gInterTk.y = 180;
	gInterTk.visible = false;
	interBg.addChild(gInterTk);
    var gInterClose = new LSprite();
	gInterClose.addChild(new LBitmap(new LBitmapData(imglist["gInterClose"])));
	gInterClose.x = 383;
	gInterClose.y = 487;
	gInterClose.visible = false;
	interBg.addChild(gInterClose);
	//LGlobal.setDebug(true);
	gInterClose.addEventListener(LMouseEvent.MOUSE_DOWN, function(){
		gInterMask.visible = false;
		gInterTk.visible = false;
		gInterClose.visible = false;
	});

}

function onframe(){

	if(bPlayStart){	//游戏开始

		//计时
		tempTime = (new Date().getTime()-startTime) + "";
		teimTimeSec = parseInt(tempTime.substr(0, tempTime.length - 3));
		if (teimTimeSec >= 0 && teimTimeSec != tempTime) {
			//改变时间
			iMyTime = (teimTimeSec).toString();

			game.changeTimeFn(iMyTime);
			//console.log(iMyTime);
		}

		if(bCanAddSpeed){
			if(iSpeed<5){
				iSpeed++;
			}else{
				bCanAddSpeed = false;
				bCanDecSpeed = true;
			}
		}
		if(bCanDecSpeed){
			if(iSpeed <= 0){
				iSpeed = 0;
				bCanDecSpeed = false;
			}else{
				iSpeed-=0.05;
				iSpeedNum++;
			}
		}
		//console.log(iSpeed+"+"+(iSpeedNum*0.05+13));
		if(game.gPlayBg1.y>=788){
			game.gPlayBg1.y = -788+iSpeedNum*0.05+13;
		}
		game.gPlayBg1.y+=2+iSpeed;
		if(game.gPlayBg2.y>=788){
			game.gPlayBg2.y = -788+iSpeedNum*0.05+13;
		}
		game.gPlayBg2.y+=2+iSpeed;
//		if(game.allBg.y>=788){
//			game.gPlayBg1.y = -788+15;
			//bPlayStart = false;
//		}
//		game.allBg.y+=2+iSpeed;


		//左右
		if(iBalStep++>iBalGap + iBalAdd && bCanChange){
			bCanChange = false;
			iBalStep = 0;
			//console.log(iHeadDir);
			iHeadDir++;
			iBalAdd = randomNum(-6,-2);	//间隔幅度
			//console.log(iBalAdd);
			
			iDir = randomNum(0,2);
			game.gLeftBtnBit.bitmapData.setCoordinate(0, 0);
			game.gRightBtnBit.bitmapData.setCoordinate(0, 0);
			//console.log(iDir);
			if(iDir == 0){
				game.gLeftBtnBit.bitmapData.setCoordinate(0, 243);
			}else if(iDir == 1){
				game.gRightBtnBit.bitmapData.setCoordinate(0, 243);
			}else{
				game.dou.visible = true;
				game.gRightBtnBit.bitmapData.setCoordinate(0, 243);
				game.gLeftBtnBit.bitmapData.setCoordinate(0, 243);
			}
		
			//开始检测是否点击
			bDownCount = true;
			countDownTime = new Date().getTime();

			//game.changeDriverFn(iBalance);
			
		}

	}
	
	if(bCount){ //可以倒计时
		//倒计时321
		cTepTime = (new Date().getTime() - countTime) + "";
		countTimeSec = parseInt(cTepTime.substr(0, cTepTime.length - 3));
		if (countTimeSec >= 0 && countTimeSec != cTepTime) {
			var iCountTime = (iCountAllTime - countTimeSec).toString();
			//改变时间
			game.countFn(toTimeFn(iCountTime));
			if (toTimeFn(iCountTime) <= 0) {//游戏结束，时间到了
				//console.log(123123);
				bPlayStart = true;//开始滚动
				//bCountTime = true; //开始游戏计时
				startTime = new Date().getTime();
				bCount = false;
			}
		}
	}
	
	if(bDownCount){ //按钮没按倒计时
		//倒计时321
		cDownTepTime = (new Date().getTime() - countDownTime) + "";
		countDownTimeSec = parseInt(cDownTepTime.substr(0, cDownTepTime.length - 3));
		if (countDownTimeSec >= 0 && countDownTimeSec != cDownTepTime) {
			var iCountDownTime = (iDownCountAllTime - countDownTimeSec).toString();
			//console.log(toTimeFn(iCountDownTime));
			//改变时间
			if (toTimeFn(iCountDownTime) <= 0) {
				bPlayStart = false;//游戏结束
				bDownCount = false;
				iDownCountAllTime = 1;
				cDownTepTime = 0;
				countDownTime = 0;
				countDownTimeSec = 0;
				overFn();
			}
		}
	}
	
};

//重新开始
function reStartFn(){
	game.showAnimFn(game.gMaskTk,0,0);
	game.showAnimFn(game.gOneLoseTk,0,0, function(){
		game.remove();
		
		iCountAllTime = 4;
		cTepTime = 0;
		countTime = 0;
		countTimeSec = 0;
		bCount = false;
		
		iDownCountAllTime = 1;
		cDownTepTime = 0;
		countDownTime = 0;
		countDownTimeSec = 0;
		bDownCount = false;

		tempTime = 0;
		teimTimeSec = 0;
		startTime = 0;
		iBalance = 2; //平衡基点
		iBalGap = 60;
		iBalStep = 0;
		iBalSacle = 0;	//难度
		bCountTime = false;
		iDir = 0;
		iMyTime = 0;
		iBalAdd = 0;
		bPlayStart = false;
		bCanChange = true;
		iSpeed = 0;	//点击之后加速
		iSpeedNum = 0;	//减速
		bCanAddSpeed = false;	//加速按钮
		bCanDecSpeed = false;	//加速按钮

		game = new Game(iSex);
		addChild(game);

	});
};

//赢了
function winFn(){
	bPlayStart = false;
	//alert(iSex);
	game.gSucTk.visible = true;
	game.gMaskTk.visible = true;
	game.showAnimFn(game.gMaskTk,0.7,0);
	game.showAnimFn(game.gSucTk,1,0, function(){
		setTimeout(function(){
			console.log('跳转成功');
		}, 500);
	});
};

//输了
function loseFn(){
	bPlayStart = false;
	//console.log('iPlayTime:'+iPlayTime);
	if(iPlayTime == 2){ //第一次失败
		game.loseFn(game.gOneLoseBeforeTk,game.gOneLoseTk);
	}else if(iPlayTime == 1){ //第二次失败
		game.loseFn(game.gTwoLoseBeforeTk,game.gTwoLoseTk, function(){
			setTimeout(function(){
				console.log('跳转失败');
			}, 500);
		});
	}
};

function toTimeFn(iNum){
	var i = 0,
		day = fMfloor(iNum / (60 * 60 * 24));
		hour = fMfloor(iNum / (60 * 60)) - (day * 24);
		minute = fMfloor(iNum / 60) - (day * 24 * 60) - (hour * 60);
		second = fMfloor(iNum) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);

	if (minute <= 9){
		minute = '0' + minute;
	}else{
		minute = '' + minute;
	}
	if (second <= 9){
		second = '0' + second;
	}else{
		second = '' + second;
	}
	var sSec = second+'';
	return sSec;
};

//游戏结束方法
function overFn(){
	//console.log(toTimeFn(iMyTime));
	if(toTimeFn(iMyTime)>30){//游戏胜利
		winFn();
	}else{
		game.changeDriverFn((iHeadDir%2 == 0)?0:4);
		setTimeout(function(){
			game.gloseMaskFn(function(){
				game.gloseMask.visible = false;
				loseFn();
			});
		},500);
	}
};