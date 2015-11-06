//横屏必备
LGlobal.aspectRatio = LANDSCAPE;

var imgData = [
			{ type: "js", path: "./js/jquery-1.8.3.min.js" },
			{ type: "js", path: "./js/Tool.js" },
			{ type: "js", path: "./js/Data.js" },
			{ type: "js", path: "./js/Main.js" },
			{ type: "js", path: "./js/Road.js" },
			{ type: "js", path: "./js/Player.js" },
			{ type: "js", path: "./js/Item.js" },
			{ type: "js", path: "./js/Score.js" },
			{ type: "js", path: "./js/Time.js" },
			{ type: "js", path: "./js/Over.js" },
			{ name: "bg", path: "./images/bg.png" },
			{ name: "item", path: "./images/item.png" },
			{ name: "road", path: "./images/road.png" },
			{ name: "btn", path: "./images/btn.png" },
			{ name: "frog", path: "./images/frog.png" },
			{ name: "speedup", path: "./images/speedup.png" },
			{ name: "share", path: "./images/share.jpg" }
		],
		imglist,
		_win = window,
		_doc = document,
		onFrameLayer = null,
		startLayer = null,
		frogLayer = null,
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

LInit(16.6, "legend", 852, 400, main); //16.6

//竖屏
_win.addEventListener("onorientationchange" in _win ? "orientationchange" : "resize", function () {
	if (_win.orientation == 180 || _win.orientation == 0) {

		horizontalErrorFn();

	}
}, false);

LGlobal.horizontalError = horizontalErrorFn;

function horizontalErrorFn(){
	//alert(0)
	LGlobal.object.innerHTML='<img src="./images/screenchange.png" style="width:100%" />';
	var f = function(){
		setTimeout(function(){location.href=location.href;}, 100);
	};
	window.onorientationchange = f;
};



//设置全屏
if(LGlobal.canTouch){
	LGlobal.stageScale = LStageScaleMode.SHOW_ALL;
	LGlobal.align = LStageAlign.TOP_MIDDLE;
	LSystem.screen(LStage.FULL_SCREEN);
}

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
    //LGlobal.setDebug(true);

    //游戏初始
	frogLayer =  new Main();
	addChild(frogLayer);

    //添加游戏关键帧
    onFrameLayer.addEventListener(LEvent.ENTER_FRAME, function () {
        onframe();
    });

	
	//addChild(new FPS());

};


function onframe() {



	//frogLayer.childList[0].bgFrameFn();
	if(oData.bIsStart){		//如果游戏开始
		
		//分数
		oData.score++;
		
		//道路在走
		frogLayer.childList[0].bgFrameFn();
		
		if(++oData.addStep >= oData.addGap){
			oData.addStep = 0;
			//console.log(1);
			
			var myRand = Tool.rand(0,100);
		
			if(myRand > 90){
				
				//添加障碍物
				frogLayer.Item = new Item(2);
				frogLayer.Item.x = LGlobal.width;
				frogLayer.Item.y = oData.aItemPos[Tool.rand(0,2)];
				frogLayer.iTemAll.addChild(frogLayer.Item);

			}else{
				
				//添加障碍物 
				frogLayer.Item = new Item(Tool.rand(0,1));
				frogLayer.Item.x = LGlobal.width;
				frogLayer.Item.y = oData.aItemPos[Tool.rand(0,2)];
				frogLayer.iTemAll.addChild(frogLayer.Item);
				
			}
			

		}


		var iI = 0,
			iLen = frogLayer.iTemAll.childList.length,
			iLen2 = 0,
			iI2 = 0;
		

		for(iI = 0; iI < iLen; iI++){
			
			//碰上了
			if(frogLayer.playerHit.hitTestObject(frogLayer.iTemAll.childList[iI])){
				if(frogLayer.iTemAll.childList[iI].index == 2){	//碰到加速
					
					if(oData.s >= 5){
						oData.s = 5;
					}else{
						oData.s++;
						//console.log(oData.s);
					}
					//oData.s = 5;
					//LGlobal.setFrameRate(10);
					//setTimeout(function(){
						//LGlobal.setFrameRate(16.6);
					//}, oData.iSpeedChangeTime);
				
				}else{
					if(oData.s <= -5){
						oData.s = -5;
					}else{
						oData.s--;
					}
					//oData.s = -5;
					
					//LGlobal.setFrameRate(25);
					//碰到障碍物动画
					LTweenLite.to(frogLayer.iTemAll.childList[iI],1,{
						x: -oData.item[0] - 100,
						y: 50,
						rotate: 720,
						ease:Strong.easeOut,
						onComplete: function(){
							//LGlobal.setFrameRate(16.6);
							
						}
					});
					//console.log("iSpeed2");
				}
			}

		}
		
		//障碍物跑
		for (iI2 in frogLayer.iTemAll.childList) {
			if(frogLayer.iTemAll.childList[iI2].x <= 10){	 //-oData.item[0]
				frogLayer.iTemAll.childList[iI2].remove();
			}
			if(frogLayer.iTemAll.childList[iI2]){
				if(oData.s<0){
					setTimeout(function(){
						if(oData.s >= 0){
							oData.s = 0;
						}else{
							oData.s++;
							//console.log(oData.s);
						}
					}, oData.iSpeedChangeTime);
				}
				if(oData.s>0){
					setTimeout(function(){
						if(oData.s <= 0){
							oData.s = 0;
						}else{
							oData.s-=0.2;
						}
					}, oData.iSpeedChangeTime);
				}
				
				frogLayer.iTemAll.childList[iI2].x -= oData.iSpeed + oData.s;
			}
		}


	}
	


};