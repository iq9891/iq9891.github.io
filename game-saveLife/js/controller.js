var imgData = [
			{ type: "js", path: "./js/Box2dWeb-2.1.a.3.min.js" },
			{ type: "js", path: "./js/jquery-1.8.3.min.js" },
			{ type: "js", path: "./js/Tool.js" },
			{ type: "js", path: "./js/Player.js" },
			{ type: "js", path: "./js/main.js" },
			{ name: "player", path: "./images/ren.png" },
			{ name: "jiantou", path: "./images/jiantou.png" },
			{ name: "notice", path: "./images/notice.png" },
			{ name: "gameover", path: "./images/gameover.png" },
			{ name: "start", path: "./images/start.png" },
			{ name: "reStart", path: "./images/restart.png" },
			{ name: "name", path: "./images/name.png" }
		],
		imglist,
		_win = window,
		_doc = document,
		startAllBtn = false, //开始游戏按钮
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

LInit(16.6, "legend", 480, 755, main); //16.6

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
			
			LStage.box2d = new LBox2d();

		}
	);
};
function gameInit(event) {

    var _this = this;
    onFrameLayer = new LSprite();

    addChild(onFrameLayer);

    //调试模式
    //LGlobal.setDebug(true);

    //游戏初始
    game.start();

    //添加游戏关键帧
    onFrameLayer.addEventListener(LEvent.ENTER_FRAME, function () {
        onframe(game);
    });

};

function onframe(game) {

	if(startAllBtn){//游戏开始按钮判断

		var _this = game;
		
		_this.gameLayer.graphics.clear();
		for(var i=0;i<_this.myData.aLineList.length - 1;i++){
			_this.gameLayer.graphics.drawLine(2,"#000000",[_this.myData.aLineList[i].x,_this.myData.aLineList[i].y, _this.myData.aLineList[i+1].x, _this.myData.aLineList[i+1].y]);
		}
		
		//碰到前面的障碍物
		if(_this.myData.bCanAwake && _this.playerPareLayer.box2dBody && !_this.playerPareLayer.box2dBody.IsAwake()){
			
			//移除所有小人绳子系列
			_this.removeFn();

			//移动障碍物
			_this.nextBlockFn();
			
			//移动小人
			LTweenLite.to(_this.playerPareLayer,0.5,{
				x: _this.iPrevX,
				y: _this.iPrevY - _this.myData.oImgData.h * 0.5,
				ease: LEasing.Sine.easeInOut,
				onComplete: function(){
			
					//检查一次就不检查了
					_this.myData.bCanAwake = false;
					
					//删除之前小人，添加小人，并跳起
					_this.resetPlayerFn();

				}
			});
		}

		//碰到起跳的障碍物
		if(_this.myData.bCanOneAwake && _this.playerPareLayer.box2dBody && !_this.playerPareLayer.box2dBody.IsAwake()){
			
			//移除所有小人绳子系列
			_this.removeFn();

			//检查一次就不检查了
			_this.myData.bCanOneAwake = false;
					
			//删除之前小人，添加小人，并跳起
			_this.resetPlayerFn();
			
		}

	}//游戏开始按钮判断
};