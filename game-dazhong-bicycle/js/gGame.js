/*
 * iNow 数字 0→男 1→女
 */
function Game(iNow){
	var _this = this;
	base(_this,LSprite,[]);

	_this.iNow = iNow;

	_this.bPlay = true;//暂停开关
	
	_this.init();

};

var i  = {
	init: function(){

		var _this = this;
		
		_this.bg = new LSprite();
		_this.addChild(_this.bg);
		_this.btn = new LSprite();
		_this.addChild(_this.btn);
		_this.spirit = new LSprite();
		_this.addChild(_this.spirit);

		//添加背景
		_this.addBgFn();
		
		//增加司机
		_this.addDriverFn();

		//添加按钮
		_this.addBtnFn();

		//添加倒计时
		//_this.countFn(03);
		bCount = true;
		countTime = new Date().getTime();

		//添加提示框
		_this.addTipTkFn();


	},
	addBgFn: function(){

		var _this = this;

		_this.gPlayBg1 = new LSprite();
		_this.gPlayBg1.addChild(new LBitmap(new LBitmapData(imglist["gPlayBg"])));
		_this.bg.addChild(_this.gPlayBg1);

		_this.gPlayBg2 = new LSprite();
		_this.gPlayBg2.addChild(new LBitmap(new LBitmapData(imglist["gPlayBg"])));
		_this.gPlayBg2.y = -780;
		_this.bg.addChild(_this.gPlayBg2);
		
		//头部
		_this.gTop = new LSprite();
		_this.gTop.addChild(new LBitmap(new LBitmapData(imglist["gTop"])));
		_this.bg.addChild(_this.gTop);
		
		//我的时间
		_this.addTimeFn();
		
	},
	addTimeFn: function(){

		var _this = this;

		_this.time1 = new LSprite();
		_this.time1Bit = new LBitmap(new LBitmapData(imglist["gNum"],0,0,18,26));
		_this.time1Bit.bitmapData.setCoordinate(0, 0);
		_this.time1.addChild(_this.time1Bit);
		_this.bg.addChild(_this.time1);
		_this.time1.x = 193;
		_this.time1.y = 160;
		
		_this.time2 = new LSprite();
		_this.time2Bit = new LBitmap(new LBitmapData(imglist["gNum"],0,0,18,26));
		_this.time2Bit.bitmapData.setCoordinate(0, 0);
		_this.time2.addChild(_this.time2Bit);
		_this.bg.addChild(_this.time2);
		_this.time2.x = 213;
		_this.time2.y = 160;
		
		_this.time3 = new LSprite();
		_this.time3Bit = new LBitmap(new LBitmapData(imglist["gNum"],0,0,18,26));
		_this.time3Bit.bitmapData.setCoordinate(0, 260);
		_this.time3.addChild(_this.time3Bit);
		_this.bg.addChild(_this.time3);
		_this.time3.x = 233;
		_this.time3.y = 160;
		
		_this.time4 = new LSprite();
		_this.time4Bit = new LBitmap(new LBitmapData(imglist["gNum"],0,0,18,26));
		_this.time4Bit.bitmapData.setCoordinate(0, 0);
		_this.time4.addChild(_this.time4Bit);
		_this.bg.addChild(_this.time4);
		_this.time4.x = 253;
		_this.time4.y = 160;
		
		_this.time5 = new LSprite();
		_this.time5Bit = new LBitmap(new LBitmapData(imglist["gNum"],0,0,18,26));
		_this.time5.addChild(_this.time5Bit);
		_this.time5Bit.bitmapData.setCoordinate(0, 0);
		_this.bg.addChild(_this.time5);
		_this.time5.x = 273;
		_this.time5.y = 160;
		
	},
	changeTimeFn: function(iNum){

		var _this = this,
			i = 0,
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
		var sSec = second+'',
			sMin = minute+'';

		_this.time1Bit.bitmapData.setCoordinate(0, sMin.charAt(0)* 26);
		_this.time2Bit.bitmapData.setCoordinate(0, sMin.charAt(1)* 26);

		_this.time4Bit.bitmapData.setCoordinate(0, sSec.charAt(0)* 26);
		_this.time5Bit.bitmapData.setCoordinate(0, sSec.charAt(1)* 26);
			
	},
	addDriverFn: function(){//增加司机

		var _this = this;

		_this.gDriver = new LSprite();
		_this.gDriverBit = new LBitmap(new LBitmapData(imglist["gDriver"],0,0,iDriverW,245));
		_this.gDriverBit.bitmapData.setCoordinate(iDriverW*iBalance, 245 * _this.iNow);
		_this.gDriver.addChild(_this.gDriverBit);
		_this.bg.addChild(_this.gDriver);
		_this.gDriver.x = 168;
		_this.gDriver.y = 369;

	},
	addBtnFn: function(){

		var _this = this;
		
		//左边
		_this.gLeftBtn = new LSprite();
		_this.gLeftBtnBit = new LBitmap(new LBitmapData(imglist["gLeftBtn"],0,0,134,243));
		//_this.gLeftBtnBit.bitmapData.setCoordinate(0, 0);
		_this.gLeftBtn.addChild(_this.gLeftBtnBit);
		_this.gLeftBtn.y = 505;
		_this.btn.addChild(_this.gLeftBtn);
		_this.gLeftBtn.addEventListener(LMouseEvent.MOUSE_DOWN, function(){
			if(!bPlayStart){return;}
			_this.leftDownFn();
		});
		_this.gLeftBtn.addEventListener(LMouseEvent.MOUSE_UP, function(){
			if(!bPlayStart){return;}
			_this.leftUpFn();
		});

		//右边
		_this.gRightBtn = new LSprite();
		_this.gRightBtnBit = new LBitmap(new LBitmapData(imglist["gRightBtn"],0,0,134,243));
		//_this.gRightBtnBit.bitmapData.setCoordinate(0, 0);
		_this.gRightBtn.addChild(_this.gRightBtnBit);
		_this.gRightBtn.x = 375;
		_this.gRightBtn.y = 505;
		_this.btn.addChild(_this.gRightBtn);
		_this.gRightBtn.addEventListener(LMouseEvent.MOUSE_DOWN, function(){
			if(!bPlayStart){return;}
			_this.rightDownFn();
		});
		_this.gRightBtn.addEventListener(LMouseEvent.MOUSE_UP, function(){
			if(!bPlayStart){return;}
			_this.rightUpFn();
		});

		//双击
		_this.dou = new LSprite();
		_this.dou.graphics.drawRect(1, "#ff0000", [0, 535, LGlobal.width-2, 243]);
		_this.dou.visible = false;
		_this.dou.alpha = 0;
		_this.btn.addChild(_this.dou);

		_this.dou.addEventListener(LMouseEvent.MOUSE_DOWN, function(e){
			if(!bPlayStart){return;}
			_this.btnDownFn(e);
		});
		_this.dou.addEventListener(LMouseEvent.MOUSE_UP, function(e){
			if(!bPlayStart){return;}
			_this.btnUpFn(e);
		});

		//开始暂停
		_this.gIngBtn = new LSprite();
		_this.gIngBtnBit = new LBitmap(new LBitmapData(imglist["gIngBtn"],0,0,78,80));
		_this.gIngBtn.addChild(_this.gIngBtnBit);
		_this.bg.addChild(_this.gIngBtn);
		_this.gIngBtn.x = 378;
		_this.gIngBtn.y = 129;
		_this.gIngBtn.addEventListener(LMouseEvent.MOUSE_DOWN, function(){
			_this.gIngBtnFn(_this);
		});
		//音乐
		_this.gMusic = new LSprite();
		_this.gMusicBit = new LBitmap(new LBitmapData(imglist["gMusic1"],0,0,107,113));
		_this.gMusic.addChild(_this.gMusicBit);
		_this.spirit.addChild(_this.gMusic);
		_this.gMusic.y = 77;
		var audio = document.getElementById('audio');
		if(audio.paused){
			_this.gMusicBit.bitmapData.setCoordinate(0, 113);
		}
		_this.gMusic.addEventListener(LMouseEvent.MOUSE_DOWN, function(){
			//console.log(audio);
			if(!audio.paused){
				_this.gMusicBit.bitmapData.setCoordinate(0, 113);
				audio.pause();
			}else{
				_this.gMusicBit.bitmapData.setCoordinate(0, 0);
				audio.play();
			}
		});

	},
	addTipTkFn: function(){
		var _this = this;	

		//遮罩
		_this.gMaskTk = new LSprite();
		_this.gMaskTk.alpha = 0;
		_this.gMaskTk.visible = false;
		_this.gMaskTk.graphics.drawRect(0, "", [0, 0, LGlobal.width, LGlobal.height], true, "#000000");
		_this.spirit.addChild(_this.gMaskTk);

		//失败遮罩
		_this.gloseMask = new LSprite();
		_this.gloseMask.alpha = 0;
		_this.gloseMask.visible = false;
		_this.gloseMask.graphics.drawRect(0, "", [0, 0, LGlobal.width, LGlobal.height], true, "#dd0000");
		_this.spirit.addChild(_this.gloseMask);

		//第一次失败对话
		_this.gOneLoseBeforeTk = new LSprite();
		_this.gOneLoseBeforeTk.addChild(new LBitmap(new LBitmapData(imglist["gLoseDialog"+ _this.iNow+ 2])));
		_this.gOneLoseBeforeTk.x = 28;
		_this.gOneLoseBeforeTk.y = 129;
		_this.gOneLoseBeforeTk.alpha = 0;
		_this.gOneLoseBeforeTk.visible = false;
		_this.spirit.addChild(_this.gOneLoseBeforeTk);

		//第二次失败对话
		_this.gTwoLoseBeforeTk = new LSprite();
		_this.gTwoLoseBeforeTk.addChild(new LBitmap(new LBitmapData(imglist["gLoseDialog"+ _this.iNow+ 1])));
		_this.gTwoLoseBeforeTk.x = 28;
		_this.gTwoLoseBeforeTk.y = 129;
		_this.gTwoLoseBeforeTk.alpha = 0;
		_this.gTwoLoseBeforeTk.visible = false;
		_this.spirit.addChild(_this.gTwoLoseBeforeTk);

		//第一次失败弹框
		_this.gOneLoseTk = new LSprite();
		_this.gOneLoseTk.addChild(new LBitmap(new LBitmapData(imglist["gLose"+ _this.iNow+ iPlayTime])));
		_this.gOneLoseTk.x = 28;
		_this.gOneLoseTk.y = 129;
		_this.gOneLoseTk.alpha = 0;
		_this.gOneLoseTk.visible = false;
		_this.spirit.addChild(_this.gOneLoseTk);

		//第一次失败弹框 按钮
		_this.gOneLoseTkBtn = new LSprite();
		_this.gOneLoseTkBtn.addChild(new LBitmap(new LBitmapData(imglist["gLoseReStart"])));
		_this.gOneLoseTkBtn.x = 196;
		//console.log(_this.iNow);
		if(_this.iNow==0){
			_this.gOneLoseTkBtn.y = 342;
		}else{
			_this.gOneLoseTkBtn.y = 302;
		}
		_this.gOneLoseTk.addChild(_this.gOneLoseTkBtn);
		_this.gOneLoseTkBtn.addEventListener(LMouseEvent.MOUSE_DOWN, _this.gReStartFn);

		
		//第二次失败弹框
		_this.gTwoLoseTk = new LSprite();
		_this.gTwoLoseTk.addChild(new LBitmap(new LBitmapData(imglist["gLose"+ _this.iNow+ iPlayTime])));
		_this.gTwoLoseTk.x = 28;
		_this.gTwoLoseTk.y = 129;
		_this.gTwoLoseTk.alpha = 0;
		_this.gTwoLoseTk.visible = false;
		_this.spirit.addChild(_this.gTwoLoseTk);

		//快要掉下来的对白
		_this.gLoseDialogTk = new LSprite();
		_this.gLoseDialogTk.addChild(new LBitmap(new LBitmapData(imglist["gOneLoseDialog"+ _this.iNow])));
		_this.gLoseDialogTk.x = 266;
		_this.gLoseDialogTk.y = 356;
		_this.gLoseDialogTk.alpha = 0;
		_this.gLoseDialogTk.visible = false;
		_this.spirit.addChild(_this.gLoseDialogTk);

		//成功弹框
		_this.gSucTk = new LSprite();
		_this.gSucTk.addChild(new LBitmap(new LBitmapData(imglist["gSuc"])));
		_this.gSucTk.x = 30;
		_this.gSucTk.y = 172;
		_this.gSucTk.alpha = 0;
		_this.gSucTk.visible = false;
		_this.spirit.addChild(_this.gSucTk);


	},
	gloseMaskFn: function(fn){
		var _this = this;
		
		_this.gloseMask.visible = true;
		LTweenLite.to(_this.gloseMask,0.3,{
			alpha:0.1,
			onComplete: function(){
				LTweenLite.to(_this.gloseMask,0.3,{
					alpha:0,
					onComplete: function(){
						LTweenLite.to(_this.gloseMask,0.3,{
							alpha:0.1,
							onComplete: function(){
								if(fn){
									fn();
								}
							}
						});
					}
				});
			}
		});
	},
	gIngBtnFn: function(my){

		var _this = my;

		if(bCount){return;} //开始倒计时的时候不起作用
			
		if(_this.bPlay){
			bPlayStart = false;
			_this.gIngBtnBit.bitmapData.setCoordinate(0, 80);
		}else{
			bPlayStart = true;
			_this.gIngBtnBit.bitmapData.setCoordinate(0, 0);
		}

		_this.bPlay = !_this.bPlay;

	},
	gReStartFn: function(){
		//console.log('点击再来一次');
		//再来一次
		reStartFn();
		iPlayTime--;
	},
	btnDownFn: function(e){
		var _this = this,
			f = false;
		//console.log("左"+iBalance);
		//_this.changeDriverFn(1);
		for(var i=0;i<touchPointIDList.length;i++){
			if(touchPointIDList[i].touchPointID == e.touchPointID){
				touchPointIDList[i] = e;
				f = true;
				break;
			}
		}
		if(!f)touchPointIDList.push(e);
		
		if(touchPointIDList.length>1){
			//alert("你按了两下");
			_this.downFn();
			_this.gLeftBtnBit.bitmapData.setCoordinate(0, 486);
			_this.gRightBtnBit.bitmapData.setCoordinate(0, 486);
		}

	},
	btnUpFn: function(){
		var _this = this;
		if(touchPointIDList.length==1){
			overFn();
			return;
		};
		_this.upFn();
		_this.gLeftBtnBit.bitmapData.setCoordinate(0, 0);
		_this.gRightBtnBit.bitmapData.setCoordinate(0, 0);
		touchPointIDList.length = 0;
		_this.dou.visible = false;
	},
	leftDownFn: function(){
		var _this = this;
		//console.log("左"+iBalance);
		//console.log(iDir);
		if(iDir==1){
			overFn();
			bDownCount = false;
			return;
		}
		
		_this.gLeftBtnBit.bitmapData.setCoordinate(0, 486);
		_this.downFn();

	},
	leftUpFn: function(){
		var _this = this;
		_this.upFn();
		_this.gLeftBtnBit.bitmapData.setCoordinate(0, 0);
	},
	rightDownFn: function(){
		var _this = this;
		if(iDir==0){
			overFn();
			return;
		}
		_this.gRightBtnBit.bitmapData.setCoordinate(0, 486);
		_this.downFn();
	},
	rightUpFn: function(){
		var _this = this;
		_this.upFn();
		_this.gRightBtnBit.bitmapData.setCoordinate(0, 0);
	},
	downFn: function(){
		var _this = this;
		bDownCount = false;
		//console.log(iHeadDir+"iNum");
		_this.changeDriverFn((iHeadDir%2 == 0)?1:3);
		bCanAddSpeed = true;
	},
	upFn: function(){
		var _this = this;
		_this.changeDriverFn(2);
		bCanChange = true;
	},
	showAnimFn: function(obj, aVal, dVal, fn){//对象，透明度参数，延迟参数，之后函数
		LTweenLite.to(obj,1,{
			alpha:aVal,
			delay:dVal,
			onComplete: function(){
				if(fn){
					fn();
				}
			}
		});
	},
	countFn: function(iNow){
		
		var _this = this,
			index = iNow+'';
		if(_this.gCount){
			_this.gCount.remove();
		}
		_this.gCount = new LSprite();
		_this.gCount.addChild(new LBitmap(new LBitmapData(imglist["gCount" + index])));
		_this.gCount.x = 111;
		_this.gCount.y = 241;
		_this.addChild(_this.gCount);

	},
	changeDriverFn: function(iNum){
		
		var _this = this;
		//console.log(iNum+"iNum");
		_this.gDriverBit.bitmapData.setCoordinate(iDriverW*iNum, 245 * _this.iNow);
		
	},
	loseFn: function(objTip, objTk, fn){
		var _this = this;
		objTip.visible = true;
		_this.showAnimFn(objTip,1,0, function(){
			_this.showAnimFn(objTip,0,0, function(){
				objTip.visible = false;
				objTk.visible = true;
				_this.gMaskTk.visible = true;
				_this.showAnimFn(_this.gMaskTk,0.7,0);
				_this.showAnimFn(objTk,1,0, function(){
					if(fn){fn();}
				});
			});
		});
	}
};

for(var k in i)Game.prototype[k] = i[k];