init(1000/50,"legend",480,1046,load);//1046
var imgData = [
			{ name: "bg1", path: "./images/tzImgBg.png"},
			//上传图片，调取数据库用户传的图片
			{ name: "bg2", path: "./images/tzImgFile.jpg"},
			{ name: "tzBtnL", path: "./images/qxmiBtn1.png" },
			{ name: "tzBtnR", path: "./images/qxmiBtn2.png" },
			{ name: "qxmiMask", path: "./images/qxmiMask.png" },
			{ name: "titTop", path: "./images/titTop.png" },
			{ name: "close", path: "./images/close.png" },
			{ name: "qxmiBtn3", path: "./images/qxmiBtn3.png" },
			{ name: "qxmiBtnBg", path: "./images/qxmiBtnBg.png" },
			{ name: "qxmiTit", path: "./images/qxmiTit.png" },
			{ name: "tel", path: "./images/tel.png" }
		],
		imglist, loadingLayer,
		layer,back,
		aOldX = 0,
		aOldY = 0,
		aNewX = 0,
		aNewY = 0,
		oMath = Math,
		oUp = ('ontouchstart' in window) ? "touchend" : "click", 
		txt = [];	//多点对象数组

function load(){
	//设备判断
	if (LGlobal.canTouch) {
		LGlobal.width = 480;
		LGlobal.height = 480 * window.innerHeight / window.innerWidth;
		LGlobal.canvasObj.width = LGlobal.width;
		LGlobal.canvasObj.height = LGlobal.height;
		//alert(LGlobal.width + " " + LGlobal.height + " " + LGlobal.canvasObj.width + " " + LGlobal.canvasObj.height);
		LGlobal.align = LStageAlign.TOP_Middle;
		LGlobal.stageScale = LStageScaleMode.NO_BORDER;
		LSystem.screen(LStage.FULL_SCREEN);
	} else {
		LGlobal.stageScale = LStageScaleMode.SHOW_ALL;
	}

	loadingLayer = new LoadingSample4("","rgba(255,255,255,0)");
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


function main(){
	
	LGlobal.preventDefault = false;
	LMultitouch.inputMode = LMultitouchInputMode.TOUCH_POINT;

	layer = new LSprite();
	layer.graphics.drawRect(2,"#ffffff",[0,0,LGlobal.width,LGlobal.height],true,"#ffffff");
	addChild(layer);
	
	//背景图
    tzImgBgLayer = new LSprite();
	tzImgBgLayer.addChild(new LBitmap(new LBitmapData(imglist["tzImgBg"])));
	tzImgBgLayer.x = 0;
	tzImgBgLayer.y = 60;
	layer.addChild(tzImgBgLayer);

	//
	var dragBitmap = new LBitmapData(imglist["bg2"]);
	dragLayer = new MiddleBitmap(dragBitmap);
	dragLayer.x = 407/2;
	dragLayer.y = 800/2;
	dragLayer.scaleX = 1.5;
	dragLayer.scaleY = 1.5;
	
	layer.addChild(dragLayer);

	//拖拽背景图
    bgLayer = new LSprite();
	bgLayer.addChild(new LBitmap(new LBitmapData(imglist["bg1"])));
	layer.addChild(bgLayer);

	//大小操作区域
    qxmiMaskLayer = new LSprite();
	qxmiMaskLayer.addChild(new LBitmap(new LBitmapData(imglist["qxmiMask"])));
	qxmiMaskLayer.x = 37;
	qxmiMaskLayer.y = 439;
	layer.addChild(qxmiMaskLayer);
	qxmiMaskLayer.addEventListener(LMouseEvent.MOUSE_DOWN,ondown);
	qxmiMaskLayer.addEventListener(LMouseEvent.MOUSE_MOVE,onmove);
	qxmiMaskLayer.addEventListener(LMouseEvent.MOUSE_UP,onup);

	//标题
    titTop = new LSprite();
	titTop.addChild(new LBitmap(new LBitmapData(imglist["titTop"])));
	layer.addChild(titTop);

	//关闭按钮
    close = new LSprite();
	close.addChild(new LBitmap(new LBitmapData(imglist["close"])));
	close.x = 390;
	close.y = 15;
	layer.addChild(close);
	close.addEventListener(LMouseEvent.MOUSE_DOWN, function(){
		//关闭
		window.location.href = 'index.html';
	});

	//合成图片
    qxmiTit = new LSprite();
	qxmiTit.addChild(new LBitmap(new LBitmapData(imglist["qxmiTit"])));
	qxmiTit.y = 129;
	layer.addChild(qxmiTit);
	//电话
    tel = new LSprite();
	tel.addChild(new LBitmap(new LBitmapData(imglist["tel"])));
	tel.y = 980;
	layer.addChild(tel);

	//旋转背景
    qxmiBtnBg = new LSprite();
	qxmiBtnBg.addChild(new LBitmap(new LBitmapData(imglist["qxmiBtnBg"])));
	qxmiBtnBg.x = 37;
	qxmiBtnBg.y = 283;
	layer.addChild(qxmiBtnBg);

	//旋转按钮
    qxmiBtn3 = new LSprite();
	qxmiBtn3.addChild(new LBitmap(new LBitmapData(imglist["qxmiBtn3"])));
	qxmiBtn3.x = 169;
	qxmiBtn3.y = 338;
	layer.addChild(qxmiBtn3);
	qxmiBtn3.addEventListener(LMouseEvent.MOUSE_DOWN, function(){
		dragLayer.rotate += 90;
	});
	

    tzBtnLLayer = new LSprite();
	tzBtnLLayer.addChild(new LBitmap(new LBitmapData(imglist["tzBtnL"])));
	tzBtnLLayer.x = 37;
	tzBtnLLayer.y = 209;
	layer.addChild(tzBtnLLayer);
	tzBtnLLayer.addEventListener(LMouseEvent.MOUSE_DOWN, function(){
		//上一步
		window.location.href = 'QxImgLoad.html';
	});

    tzBtnRLayer = new LSprite();
	tzBtnRLayer.addChild(new LBitmap(new LBitmapData(imglist["tzBtnR"])));
	tzBtnRLayer.x = 292;
	tzBtnRLayer.y = 209;
	layer.addChild(tzBtnRLayer);
	tzBtnRLayer.addEventListener(LMouseEvent.MOUSE_DOWN, function(){
		//下一步
		window.location.href = 'QxImgResult.html';
	});

}

function draw(){
	if(LGlobal.canTouch){
		if(txt.length>1){ //多点

			dragLayer.stopDrag();
			
			aNewX = oMath.abs(txt[0].offsetX - txt[1].offsetX);
			aNewY = oMath.abs(txt[0].offsetY - txt[1].offsetY);


			if(aOldX>=aNewX && aOldY>=aNewY){

				if(dragLayer.scaleX > 0 || dragLayer.scaleY > 0){
					dragLayer.scaleX-=0.01;
					dragLayer.scaleY-=0.01;
				}

			}else{
				dragLayer.scaleX+=0.01;
				dragLayer.scaleY+=0.01;
			}
			
			//更新对比坐标
			aOldX = aNewX;
			aOldY = aNewY;

		}else{//单点拖拽
			dragLayer.stopDrag();
			dragLayer.startDrag(txt[0].touchPointID);
		}
	}

}
function setTTT(e, fn){
	var f = false;
	
	for(var i=0;i<txt.length;i++){
		if(txt[i].touchPointID == e.touchPointID){
			txt[i] = e;
			f = true;
			break;
		}
	}
	if(!f)txt.push(e);

	if(fn == "down"){
		aOldX = oMath.abs(txt[0].offsetX - txt[1].offsetX);
		aOldY = oMath.abs(txt[0].offsetY - txt[1].offsetY);
	}

	draw();
}

function ondown(e){
	LGlobal.preventDefault = true;
	setTTT(e, "down");
}
function onmove(e){
	setTTT(e, "move");
}
function onup(e){
	LGlobal.preventDefault = false;
	txt.length = 0;
	draw();
}

//中心
function MiddleBitmap(bitmapData) {
    var self = this;
    base(self, LSprite, []);
    self.bitmapTitle = new LBitmap(bitmapData);
    self.bitmapTitle.x = -self.bitmapTitle.getWidth() * 0.5;
    self.bitmapTitle.y = -self.bitmapTitle.getHeight() * 0.5;
    self.addChild(self.bitmapTitle);
}