var imgData = [
			{ type: "js", path: "./js/jquery-1.8.3.min.js" },
			{ type: "js", path: "./js/Tool.js" },
			{ type: "js", path: "./js/Data.js" },
			{ type: "js", path: "./js/Start.js" },
			{ type: "js", path: "./js/Main.js" },
			{ type: "js", path: "./js/Time.js" },
			{ type: "js", path: "./js/Score.js" },
			{ type: "js", path: "./js/Over.js" },
			{ name: "tit", path: "./images/name.png" },
			{ name: "start", path: "./images/start.jpg" },
			{ name: "gameBtn", path: "./images/gameBtn.jpg" },
			{ name: "gameBtnOn", path: "./images/gameBtnOn.jpg" },
			{ name: "restart", path: "./images/restart.jpg" },
			{ name: "share", path: "./images/share.jpg" }
		],
		imglist,
		_win = window,
		_doc = document,
		startLayer = null,
		gameLayer = null,
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

    //调试模式
    //LGlobal.setDebug(true);

    //游戏初始
    startLayer = new Start();
    addChild(startLayer);

	gameLayer =  new LSprite();
	addChild(gameLayer);

};

