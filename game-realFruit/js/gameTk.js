function addTkFn(){
	
	maskTkLayer = new LShape();
	maskTkLayer.alpha = 0;
	maskTkLayer.visible = false;
    tkLayer.addChild(maskTkLayer);
    maskTkLayer.graphics.drawRect(0, "", [0, 0, LGlobal.width, LGlobal.height], true, "000000");

	//添加失败弹框
	addLoseTkFn();

	//添加分享
	addShareTkFn();
	
};

//添加分享
function addShareTkFn(){
	shareLayer = new LSprite();
	maskShape = new LShape();
    shareLayer.addChild(maskShape);
    maskShape.graphics.drawRect(0, "", [0, 0, LGlobal.width, LGlobal.height], true, "000000");
	maskShape.alpha = 0;
	shareLayer.addChild(new LBitmap(new LBitmapData( imglist["shareTk"] )));
	shareLayer.alpha = 0;
	tkLayer.addChild(shareLayer);
	shareLayer.visible = false;

	//分享弹框消失
	shareLayer.addEventListener(LMouseEvent.MOUSE_DOWN, function(){
		//隐藏分享动画
		showHideShareTkFn();
	});

};

//添加失败弹框
function addLoseTkFn(){
	loseLayer = new LSprite();
	var loseLBit = new LBitmap(new LBitmapData( imglist["gTk1"] ));
	loseLBit.x = -240;
	loseLBit.y = - 191.5;
	loseLayer.addChild(loseLBit);
	loseLayer.x =  240;
	loseLayer.y =  149 + 191.5;
	loseLayer.alpha =  0;
	loseLayer.scaleX = 0;
	loseLayer.scaleY = 0;
	loseLayer.visible = false;
	tkLayer.addChild(loseLayer);

	var reStartBtn = new LSprite();
	reStartBtn.addChild(new LBitmap(new LBitmapData( imglist["gBtnMask2png"] )));
	reStartBtn.x =  60 - 240;
	reStartBtn.y =  200 - 140;
	loseLayer.addChild(reStartBtn);

	var shareBtn = new LSprite();
	shareBtn.addChild(new LBitmap(new LBitmapData( imglist["gBtnMask2png"] )));
	shareBtn.x =  132 - 203;
	shareBtn.y =  200 - 140;
	loseLayer.addChild(shareBtn);
	
	//重来
	reStartBtn.addEventListener(LMouseEvent.MOUSE_DOWN, function(event){
		//alert("重来按钮");
		showHideTkFn(loseLayer,false,function(){
			//重新开始游戏
			reStartFn();
		});
	});
	//分享
	shareBtn.addEventListener(LMouseEvent.MOUSE_DOWN, function(event){
		//alert("分享");
		//显示分享动画
		showHideShareTkFn(true);
	});

};

//显示|隐藏分享动画
/*
 *showOrHide true→show
 */
function showHideShareTkFn(showOrHide){ 
	if(showOrHide){
		shareLayer.visible = true;
	}
	LTweenLite.to(maskShape,0.3,{
		alpha:showOrHide?0.6:0,
		ease:LEasing.Sine.easeInOut
	});
	LTweenLite.to(shareLayer,0.3,{
		alpha:showOrHide?1:0,
		ease:LEasing.Sine.easeInOut,
		onComplete: function(){
			if(!showOrHide){
				shareLayer.visible = false;
			}
		}
	});
};

//显示除分享外的弹框动画
/*
 *showOrHide true→show
 */
function showHideTkFn(obj,showOrHide, fn){ 
	
	if(showOrHide){
		obj.visible = true;
		maskTkLayer.visible = true;
	}
	LTweenLite.to(maskTkLayer,0.3,{
		alpha:showOrHide?0.7:0,
		ease:LEasing.Sine.easeInOut
	});
	
	LTweenLite.to(obj,0.3,{
		alpha:showOrHide?1:0,
		rotate:showOrHide?360:0,
		scaleX:showOrHide?1:0,
		scaleY:showOrHide?1:0,
		ease:LEasing.Sine.easeInOut,
		onComplete: function(){
			if(fn){
				console.log(1);
				fn();
			}
			if(!showOrHide){
				obj.visible = false;
				maskTkLayer.visible = false;
			}
		}
	});
};

function showHideFontFn(iNum,showOrHide){
	if(iNum == 1){
		gBtn2.visible = true;
		LTweenLite.to(getVoucherFont1,0.3,{
			alpha:showOrHide?1:0,
			ease:LEasing.Sine.easeInOut
		});
	}
};