var imgData = [
			{ type: "js", path: "./js/jquery-1.8.3.min.js" },
			{ type: "js", path: "./js/Tool.js" },
			{ type: "js", path: "./js/Data.js" },
			{ type: "js", path: "./js/Start.js" },
			{ type: "js", path: "./js/Main.js" },
			{ type: "js", path: "./js/Time.js" },
			{ type: "js", path: "./js/Score.js" },
			{ type: "js", path: "./js/Over.js" },
			{ type: "js", path: "./js/Fly.js" },
			{ name: "bg", path: "./images/splash.png" },
			{ name: "tit", path: "./images/splashtitle.png" },
			{ name: "d0", path: "./images/d0.png" },
			{ name: "d1", path: "./images/d1.png" },
			{ name: "d2", path: "./images/d2.png" },
			{ name: "d3", path: "./images/d3.png" },
			{ name: "m0", path: "./images/m0.png" },
			{ name: "m1", path: "./images/m1.png" },
			{ name: "m2", path: "./images/m2.png" },
			{ name: "m3", path: "./images/m3.png" },
			{ name: "mb0", path: "./images/mb0.png" },
			{ name: "mb1", path: "./images/mb1.png" },
			{ name: "mb2", path: "./images/mb2.png" },
			{ name: "mb3", path: "./images/mb3.png" },
			{ name: "top", path: "./images/starttip.png" },
			{ name: "time", path: "./images/board.png" },
			{ name: "score", path: "./images/tmbg.png" },
			{ name: "restart", path: "./images/restart.png" }
		],
		imglist,
		_win = window,
		_doc = document,
		onFrameLayer = null,
		startLayer = null,
		gameLayer = null,
		flyLayer = null,
		overLayer = null,
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

LInit(6, "legend", 480, 755, main); //16.6

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

    //调试模式
    LGlobal.setDebug(true);


	onFrameLayer.graphics.drawRect(0, "", [0, 0, LGlobal.width, LGlobal.height], true, oData.mainBg);

    //游戏初始
    startLayer = new Start();
    addChild(startLayer);
	
	flyLayer =  new LSprite();
	addChild(flyLayer);

	gameLayer =  new LSprite();
	addChild(gameLayer);

    //添加游戏关键帧
    onFrameLayer.addEventListener(LEvent.ENTER_FRAME, function () {
        onframe();
    });

};


function onframe() {

	if(oData.bAutoFly){
		
		if(++oData.bAutoFlyNum >= oData.bAutoFlyStep){
			//console.log(1);

			//console.log(oData.iR);

			flyLayer.addChild(new Fly({
				n: Tool.rand(0, 3)
			}));

			oData.bAutoFlyNum = 0;

		}

		for(i=0, l = flyLayer.childList.length; i < l; i++){
			flyLayer.childList[i].onframe();
			if(flyLayer.childList[i].y > LGlobal.height + oData.dH){
				flyLayer.childList[i].remove();
				break;
			}
		}

	}

};