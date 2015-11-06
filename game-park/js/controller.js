var imgData = [
			{ type: "js", path: "./js/jquery-1.8.3.min.js" },
			{ type: "js", path: "./js/jquery.bpopup.min.js" },
			{ type: "js", path: "./js/Tool.js" },
			{ type: "js", path: "./js/Car.js" },
			{ type: "js", path: "./js/main.js" },
			{ name: "bg", path: "./images/bg.jpg" },
			{ name: "steering", path: "./images/android_steering.png" },
			{ name: "steering_pilot", path: "./images/steering_pilot.png" },
			{ name: "throttle_pilot", path: "./images/throttle_pilot.png" },
			{ name: "widgets", path: "./images/widgets.png" },
			{ name: "car", path: "./images/car.png" },
			{ name: "shadow", path: "./images/shadow.png" },
			{ name: "throttleBtnTop", path: "./images/throttleBtnTop.png" },
			{ name: "throttleBtnBot", path: "./images/throttleBtnBot.png" },
			{ name: "steeringArea", path: "./images/steeringArea.png" },
			{ name: "wheel", path: "./images/wheel.jpg" },
			{ name: "hitLRSide", path: "./images/hitLRSide.jpg" },
			{ name: "hitTBSide", path: "./images/hitTBSide.jpg" },
			{ name: "parkRoom", path: "./images/parkRoom.png" },
			{ name: "car1", path: "./images/car1.png" },
			{ name: "car2", path: "./images/car2.png" },
			{ name: "gameover", path: "./images/gameover.png" },
			{ name: "restart", path: "./images/restart.png" },
			{ name: "win", path: "./images/win.png" },
			{ name: "tit", path: "./images/tit.png" }
		],
		imglist,
		_win = window,
		_doc = document,
		bLeft = false,	//向左拐弯
		bRight = false,	//是否向右拐弯
		oSec = 0,	//倒计时秒
		bIsMove = false,	//是否移动方向盘
		twoRotating = false; 

function doScroll() {
    if (_win.pageYOffset === 0) {
        _win.scrollTo(0, 1);
    }
}

_win.addEventListener('load', function () {
    setTimeout(doScroll, 100);
}, false);

_win.onorientationchange = function () {
    setTimeout(doScroll, 100);
};
_win.onresize = function () {
    setTimeout(doScroll, 100);
};

_doc.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

init(30, "legend", 480, 755, main); //16.6

_win.addEventListener("onorientationchange" in _win ? "orientationchange" : "resize", function () {
	if (_win.orientation == 180 || _win.orientation == 0) {

		$(".rotating,.b-modal").hide().css({
			"opacity": 0,
			"zIndex": 1
		});

	}
	if (_win.orientation == 90 || _win.orientation == -90) {

		setTimeout(function () {

			if (twoRotating) {
				$(".rotating,.b-modal").show().css({
					"opacity": 1,
					"zIndex": 10
				});
				$('.b-modal').css({
					"opacity": 0.6
				});

			} else {

				twoRotating = true;

				$('.rotating').bPopup({
					onOpen: function () {
						$('.rotating').css({
							"zIndex": 10
						});

					},
					onClose: function () {

						$('.rotating').css({
							"zIndex": 1
						});

					},
					opacity: 0.6
				});

			}

		}, 1000);

	}
}, false);



//设置全屏
LGlobal.stageScale = LStageScaleMode.SHOW_ALL;
LGlobal.align = LStageAlign.TOP_MIDDLE;
LSystem.screen(LStage.FULL_SCREEN);

function main() {
    var loadingLayer = new LoadingSample4();
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
function gameInit(event) {

    var _this = this;
    onFrameLayer = new LSprite();

    addChild(onFrameLayer);

    //游戏初始
    game.start();

    //添加游戏关键帧
    onFrameLayer.addEventListener(LEvent.ENTER_FRAME, function () {
        onframe(game);
    });
    //添加游戏按下
    onFrameLayer.addEventListener(LMouseEvent.MOUSE_DOWN, function (event) {

    });
    //添加游戏关抬起
    onFrameLayer.addEventListener(LMouseEvent.MOUSE_UP, function () {
      
    });


};


function onframe(game) {
    var _this = game;
	
	if(_this.bStart){
		_this.carLayer.onCarFrame();

		if(_this.bWin){
			_this.bWin = false;
			_this.bStart = false;

			//游戏结束
			_this.gameOverFn("win");
		}

		if(_this.bLose){
			_this.bLose = false;
			_this.bStart = false;
			
			//游戏结束
			_this.gameOverFn("gameover");
		}
	}


};