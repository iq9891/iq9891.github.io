init(16.5,"legend",480,780,load);
var imgData = [
			{ type: "js", path: "./js/zepto.min.js" },
			{ type: "js", path: "./js/Game.js" },
			{ name: "bg", path: "./images/background8.jpg" },
			{ name: "help", path: "./images/guide_text.png" },
			{ name: "scoreBg", path: "./images/scoreBg.png" },
			{ name: "startUp", path: "./images/start_normal.png" },
			{ name: "startDown", path: "./images/start_select.png" },
			{ name: "player", path: "./images/player.png" }
		],
		_win = window,
		_doc = document,
		oMath = Math,
		oMathRan = oMath.random,
		imglist, loadingLayer,onClickLayer,
		fMfloor = oMath.floor,

		iAllNum = {
			playerW: 60,
			pillarMinX: 70,
			pillarMaxX: 90,
			pillarH: 300,
			pillarY: 465,
			brigeW:5
		},
		bDown = false,
		iBridgeH = 0,
		score = 0,
		
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

function doScroll() {if (_win.pageYOffset === 0) {_win.scrollTo(0, 1);}}

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
LGlobal.stageScale = LGlobal.canTouch?LStageScaleMode.NO_BORDER:LStageScaleMode.SHOW_ALL;
LSystem.screen(LStage.FULL_SCREEN);


function main(){

    gameLayer = new Game();
	addChild(gameLayer);

    onClickLayer = new LSprite();
	onClickLayer.visible = false;
	onClickLayer.graphics.drawRect(0, "", [0, 0, LGlobal.width, LGlobal.height], true, "#880088");
	onClickLayer.alpha = 0;
	addChild(onClickLayer);
	
    //添加游戏关键帧
    onClickLayer.addEventListener(LEvent.ENTER_FRAME, frameFn);
	onClickLayer.addEventListener(LMouseEvent.MOUSE_DOWN, allDownFn);
	onClickLayer.addEventListener(LMouseEvent.MOUSE_UP, allUpFn);

}

function allDownFn(){
	if(!bStart){return;}
	if(!gameLayer.bClick){return;}
	bDown = true;
};

function allUpFn(){
	if(!bStart){return;}
	if(!gameLayer.bClick){return;}
	bDown = false;
	gameLayer.bridgeMoveFn();
};

function frameFn(){
	if(!bStart){return;}
	if(!bDown){return;}
	//console.log(1);
	if(score == 0){gameLayer.guide.visible = false;}
	iBridgeH += 10;
	gameLayer.addBridgeFn(gameLayer.aW[0]);
};

function reStartFn(){
	

};

function winFn(){
	
};

function loseFn(){
	
};

function overFn(){
	//console.log("游戏结束");
	if(confirm("Gameover,restart?")){
		_win.location.reload();
	}
};