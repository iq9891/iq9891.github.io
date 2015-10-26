var imgData = [
			{ type: "js", path: "./js/Start.js" },
			{ type: "js", path: "./js/Game.js" },
			{ name: "bg", path: "./images/iBg.jpg" },
			{ name: "gBg", path: "./images/gBg.jpg" },
			{ name: "merge", path: "./images/merge.png" },
			{ name: "man", path: "./images/man.png" },
			{ name: "star", path: "./images/star.png" }
		],
		imglist,
		_win = window,
		_doc = document,
		bStart = false,	//计时开关
		onFrameLayer = null,
		bgLayer = null,
		gameLayer = null,
		startLayer = null,
		oPosData = {
				x: [92, 372, 48, 311, 382, 158, 78, 169, 102, 30, 260, 223, 94, 374, 288, 359, 40, 97, 238, 366, 287],
				y: [238, 268, 360, 160, 226, 136, 196, 206, 330, 313, 182, 252, 448, 408, 377, 368, 255, 143, 101, 165, 130]
			},
		oStar = {x: [89, 391], y: [167, 468]}, //[x1,x2]
        oDown = 'ontouchend' in _win ? "touchend" : "click", 
			Tool = {
				rand: function (under, over){ //over上限(最大),under下限(最小)
					switch(arguments.length){ 
						case 1: return parseInt(Math.random()*under); 
						case 2: return parseInt(Math.random()*(over-under+1) + under); 
						default: return 0; 
					}
				}
			},
		//重设的参数
		bCanAddStar = false,
		iStartTime = 0,
		iStartDiffNum = 3,
		iStartDiffBtn = false,
		iGameTime = 0,
		iGameDiffNum = 7,
		iGameDiffBtn = false,
		bIsShake = false,
		iScore = 0; 

function doScroll() {if (_win.pageYOffset === 0) {_win.scrollTo(0, 1);}}
_win.addEventListener('load', function () {setTimeout(doScroll, 100);}, false);
_win.onorientationchange = function () {setTimeout(doScroll, 100);};
_win.onresize = function () { setTimeout(doScroll, 100);};

_doc.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

LInit(16.6, "legend", 480, 755, delayMain); //16.6
function delayMain() {setTimeout(function(){main();}, 100);}

_win.addEventListener("onorientationchange" in _win ? "orientationchange" : "resize", function () {
	if (_win.orientation == 180 || _win.orientation == 0) {$(".rotating").hide();}
	if (_win.orientation == 90 || _win.orientation == -90) {$(".rotating").show();}
}, false);



//设置全屏
if (LGlobal.canTouch) {
	LGlobal.stageScale = LStageScaleMode.NO_BORDER;
} else {
	LGlobal.stageScale = LStageScaleMode.SHOW_ALL;
}
LSystem.screen(LStage.FULL_SCREEN);

function main() {
    var loadingLayer = new LoadingSample4("","#0d4a79");
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
		    gameInit();
		}
	);
};

function gameInit() {

    var _this = this;

    onFrameLayer = new LSprite();
    addChild(onFrameLayer);

    //调试模式
    LGlobal.setDebug(true);

    //游戏初始
    startLayer = new Start();
    addChild(startLayer);
	
    //添加游戏关键帧
    onFrameLayer.addEventListener(LEvent.ENTER_FRAME, onframe);
	
	//摇晃
	yaohuang();

};

function onframe(){
	
	//倒计时开始
	if(iStartDiffBtn){

		var tempTimeStart = (new Date().getTime() - iStartTime) + "",
			teimTimeSecStart = parseInt(tempTimeStart.substr(0, tempTimeStart.length - 3));
		if (teimTimeSecStart >= 0) {
			if (teimTimeSecStart != tempTimeStart) {
				var numStart = (iStartDiffNum - teimTimeSecStart).toString();
				if (numStart <= 0) {//游戏开始
					hideInfo();
					iStartDiffBtn = false;
					//获取下时间基数
					iGameTime = new Date().getTime();
					//开始游戏倒计时
					iGameDiffBtn = true;
					//开始摇
					bIsShake = true;
					//可以添加星星
					bCanAddStar = true;
				} else {	//改变
					startDiffFn(numStart)
				}
			}
		}

	}
	
	//开始游戏计时
	if(iGameDiffBtn){

		var tempTimeGame = (new Date().getTime() - iGameTime) + "",
			teimTimeSecGame = parseInt(tempTimeGame.substr(0, tempTimeGame.length - 3));
		if (teimTimeSecGame >= 0) {
			if (teimTimeSecGame != tempTimeGame) {
				var numGame = (iGameDiffNum - teimTimeSecGame).toString();
				if (numGame <= 0) {//游戏结束
					console.log('游戏结束:'+iScore);
					iGameDiffBtn = false;
					gameLayer.chaneDiffFn(0);
					//停止摇
					bIsShake = false;
					//显示结束
					showOver();
					//不可以添加星星
					bCanAddStar = false;
				} else {	//改变
					gameLayer.chaneDiffFn(numGame);
				}
			}
		}

		if(bCanAddStar){
			bCanAddStar = false;
			gameLayer.addStartFn(Tool.rand(oStar.x[0], oStar.x[1]), Tool.rand(oStar.y[0], oStar.y[1]));
		}

	}
	
};

//摇晃事件
function yaohuang(){
		
　　if (window.DeviceMotionEvent) {
　　　　window.addEventListener('devicemotion', deviceMotionHandler, false);
　　} 
	//else {
　　　　// 移动浏览器不支持运动传感事件
　　　　//alert("您的手机不支持摇晃翻页")
	//} 

	// 首先，定义一个摇动的阀值
	var SHAKE_THRESHOLD = 3000,
		last_update = 0,
		x = 0, y = 0, z = 0, last_x = 0, last_y = 0, last_z = 0,
		count = 0;

	function deviceMotionHandler(eventData) {

	　　// 获取含重力的加速度
		var acceleration = eventData.accelerationIncludingGravity; 

	　　// 获取当前时间
		var curTime = new Date().getTime(); 
		var diffTime = curTime -last_update;
		
	　　// 固定时间段
		if (diffTime > 100) {
	　　　　last_update = curTime; 

	　　　　x = acceleration.x; 
	　　　　y = acceleration.y; 
	　　　　z = acceleration.z; 
	
			var speed = Math.abs(x + y + z - last_x - last_y - last_z) / diffTime * 10000; 

	　　　　if (speed > SHAKE_THRESHOLD && bIsShake) { 

				//bIsOne = false;
				
				//document.getElementById("cs").innerHTML = "您摇了"+ ++iManNum;
				var iMoveNum = Tool.rand(0, 20);
				gameLayer.addNumFn(iMoveNum);
				gameLayer.animFn(iMoveNum);
				gameLayer.changeScoreFn(++iScore);

		　　　　last_x = x; 
		　　　　last_y = y; 
		　　　　last_z = z; 

		　　} 
		} 

	}
}