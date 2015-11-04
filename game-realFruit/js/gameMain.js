/*
 * Created with EditPlus.
 * User: leemagnum
 * Date: 14-11-21
 * Time: 12:00
 * 游戏主对象.
*/
function Game(){

	var _this = this;

	base(_this,LSprite,[]);

	_this.oBanMove = null;

	_this.iClickNum = 0;

	_this.first = true;

	_this.init();

};


var g = {
	init: function(){

		var _this = this;
		
		_this.allBg = new LSprite();
		_this.addChild(_this.allBg);
		_this.flow = new LSprite();
		_this.addChild(_this.flow);
		_this.allMask = new LSprite();
		_this.allMask.y = 436;
		_this.addChild(_this.allMask);
		_this.allElf = new LSprite();
		_this.addChild(_this.allElf);
		
		//添加背景
		_this.addBgFn();

		//添加底部背景
		_this.addMaskBgFn();

		//添加上面
		_this.addElfFn();

	},
	addBgFn: function(){

		var _this = this;
		
		_this.bg = new LSprite();
		_this.bg.addChild(new LBitmap(new LBitmapData(imglist["gBgTop"])));
		_this.allBg.addChild(_this.bg);
		
		_this.bgGrid = new LSprite();
		_this.bg.addChild(_this.bgGrid);
		_this.bgGrid.addEventListener(LMouseEvent.MOUSE_DOWN, function(event){
			if(!bStart){return;}
			//游戏结束
			overFn();

			_this.overAnimFn(event.target,function(){
				//点其他不可点地方，游戏失败
				loseFn();
			});
		});
		
		//添加格子背景
		_this.addGridBgFn();

	},
	overAnimFn: function(obj,fn){
		
		LTweenLite.to(obj,0.1,{
			alpha:0.3}).to(obj,0.1,{
			alpha:1}).to(obj,0.1,{
			alpha:0.3}).to(obj,0.1,{
			alpha:1}).to(obj,0.1,{
			alpha:0.3})
		.to(obj,0.2,{
			alpha:1,
			ease:LEasing.Quint.easeIn,
			onComplete:function(e){
				//点其他不可点地方，游戏失败
				loseFn();
			}
		});
	},
	addGridBgFn: function(){

		var _this = this;

		for(j=0; j < iInitNumY; j++){
			for(i=0; i < iInitNumX; i++){

				_this.perGrid = new LSprite();
				_this.perGrid.addChild(new LBitmap(new LBitmapData(imglist["gGrid"])));
				_this.bgGrid.addChild(_this.perGrid);
				_this.perGrid.x = 15 + iGridX * (i%4);
				_this.perGrid.y = -125 + iGridX * j;

			}
		}
		
		//添加点击的格子
		_this.addItemFn();
		_this.addItemFn();
		_this.addItemFn();
		_this.addItemFn();
		_this.addItemFn();
		_this.addItemFn();

		_this.flow.addEventListener(LMouseEvent.MOUSE_DOWN, $.proxy(_this.perClickFn, _this));

	},
	perClickFn: function(event){
		
		//if(!bStart){return;}

		var _this = this,
			iIndex = event.currentTarget.getChildIndex(event.target);
		
		if(iIndex == 0){
			
			if(_this.first){
				_this.first = false;
				
				_this.startFn();
			}

			event.currentTarget.y += iGridX;
			event.target.remove();
			gameLayer.addItemFn();
			_this.iClickNum++;
			if(_this.iClickNum < iStep){
				LTweenLite.to(_this.gHeadImgMan,0.2,{
					x: _this.gHeadImgMan.x-1,
					ease: LEasing.Sine.leaner
				});
			}
		}

	},
	addItemFn: function(){

		var _this = this,
			oLast = _this.flow.childList.length?_this.flow.childList[_this.flow.childList.length-1]:null,
			iNow = parseInt(iInitNumX*oMathRan());
		_this.itemlayer = new Item();
		_this.itemlayer.x = 15 + iGridX*iNow;
		_this.itemlayer.y = oLast?(oLast.y - iGridX):(322);
		_this.flow.addChild(_this.itemlayer);

	},
	addElfFn: function(){

		var _this = this;
		
		_this.elfBg = new LSprite();
		_this.elfBgSha = new LShape();
		_this.elfBgSha.graphics.drawRect(0, "", [0, 0, LGlobal.width , 60], true, "#000000");
		_this.elfBgSha.alpha = 0.5;
		_this.allElf.addChild(_this.elfBgSha);
		_this.allElf.addChild(_this.elfBg);

		//添加时间
		_this.addTimeFn();
		
	},
	addTimeFn: function(){

		var _this = this;
		
		_this.timeLayer = new LSprite();
		_this.timeLayerBit = new LBitmap(new LBitmapData(imglist["gMerge"],0,0,49,48));
		_this.timeLayerBit.bitmapData.setCoordinate(iNumW, 0);
		_this.timeLayer.addChild(_this.timeLayerBit);
		_this.elfBg.addChild(_this.timeLayer);
		_this.timeLayer.x = 182;
		_this.timeLayer.y = 6;

		var sAllTime = iAllTime+"";
		
		_this.time1 = new LSprite();
		_this.time1Bit = new LBitmap(new LBitmapData(imglist["gMerge"],0,0,iNumW,iNumH));
		_this.time1Bit.bitmapData.setCoordinate(0, sAllTime.charAt(0)* iNumH);
		_this.time1.addChild(_this.time1Bit);
		_this.elfBg.addChild(_this.time1);
		_this.time1.x = 245;
		_this.time1.y = 14;
		
		_this.time2 = new LSprite();
		_this.time2Bit = new LBitmap(new LBitmapData(imglist["gMerge"],0,0,iNumW,iNumH));
		_this.time2Bit.bitmapData.setCoordinate(0, sAllTime.charAt(1)* iNumH);
		_this.time2.addChild(_this.time2Bit);
		_this.elfBg.addChild(_this.time2);
		_this.time2.x = 261;
		_this.time2.y = 14;
		
		_this.time3 = new LSprite();
		_this.time3Bit = new LBitmap(new LBitmapData(imglist["gMerge"],0,0,iNumW,iNumH));
		_this.time3Bit.bitmapData.setCoordinate(0, 10 * iNumH);
		_this.time3.addChild(_this.time3Bit);
		_this.elfBg.addChild(_this.time3);
		_this.time3.x = 277;
		_this.time3.y = 14;
		
		_this.time4 = new LSprite();
		_this.time4Bit = new LBitmap(new LBitmapData(imglist["gMerge"],0,0,iNumW,iNumH));
		_this.time4.addChild(_this.time4Bit);
		_this.elfBg.addChild(_this.time4);
		_this.time4.x = 285;
		_this.time4.y = 14;
		
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
		var sSec = second+'';

		_this.time1Bit.bitmapData.setCoordinate(0, sSec.charAt(0)* iNumH);
		_this.time2Bit.bitmapData.setCoordinate(0, sSec.charAt(1)* iNumH);
			
	},
	addMaskBgFn: function(){

		var _this = this;
		
		_this.allMaskBg = new LSprite();
		_this.allMaskBg.addChild(new LBitmap(new LBitmapData(imglist["gBgBot"])));
		_this.allMask.addChild(_this.allMaskBg);

		//进度
		_this.addProgressFn();
		
		//添加开始按钮
		_this.addStartFn();

	},
	addStartFn: function(){

		var _this = this;
		
		_this.start = new LSprite();
		_this.start.addChild(new LBitmap(new LBitmapData(imglist["gStart"])));
		_this.start.x = 135;
		_this.start.y = 195;
		_this.allMask.addChild(_this.start);

		_this.start.addEventListener(LMouseEvent.MOUSE_DOWN, $.proxy(_this.startFn, _this));

		_this.gFont5 = new LSprite();
		_this.gFont5.addChild(new LBitmap(new LBitmapData(imglist["gFont5"])));
		_this.gFont5.y = 280;
		_this.allMask.addChild(_this.gFont5);

	},
	startFn: function(){

		var _this = this;
		
		bStart = true;

		startTime = new Date().getTime();

		_this.gHeadImgMan.play();
		_this.gHeadImgWoMan.play();

	},
	addProgressFn: function(){

		var _this = this;
		
		_this.gClold1 = new LSprite();
		_this.allMask.addChild(_this.gClold1);

		//后面的云朵
		_this.gClold1Left = new LSprite();
		_this.gClold1Left.addChild(new LBitmap(new LBitmapData(imglist["gClold1"])));
		_this.gClold1.addChild(_this.gClold1Left);

		_this.gClold1Right = new LSprite();
		_this.gClold1Right.addChild(new LBitmap(new LBitmapData(imglist["gClold1"])));
		_this.gClold1Right.x = -532;
		_this.gClold1.addChild(_this.gClold1Right);
		
		//前面的云朵
		_this.gClold2 = new LSprite();
		_this.allMask.addChild(_this.gClold2);

		_this.gClold2Left = new LSprite();
		_this.gClold2Left.addChild(new LBitmap(new LBitmapData(imglist["gClold2"])));
		_this.gClold2.addChild(_this.gClold2Left);

		_this.gClold2Right = new LSprite();
		_this.gClold2Right.addChild(new LBitmap(new LBitmapData(imglist["gClold2"])));
		_this.gClold2Right.x = -532;
		_this.gClold2.addChild(_this.gClold2Right);
		
		//曲线
		_this.gJindu = new LSprite();
		_this.allMask.addChild(_this.gJindu);

		_this.gJinduLeft = new LSprite();
		_this.gJinduLeft.addChild(new LBitmap(new LBitmapData(imglist["gJindu"])));
		_this.gJindu.addChild(_this.gJinduLeft);

		_this.gJinduRight = new LSprite();
		_this.gJinduRight.addChild(new LBitmap(new LBitmapData(imglist["gJindu"])));
		_this.gJinduRight.x = -LGlobal.width;
		_this.gJindu.addChild(_this.gJinduRight);

		//女头像
		_this.gWoManList = LGlobal.divideCoordinate(816,157,1,8);
		_this.gWoManData = new LBitmapData(imglist["gHeadImgWoMan"],0,0,102,157);
		_this.gHeadImgWoMan = new LAnimationTimeline(_this.gWoManData, _this.gWoManList);
		_this.gHeadImgWoMan.speed = 3;
		_this.gHeadImgWoMan.x = iManEnd - 85;
		_this.gHeadImgWoMan.stop();
		_this.allMask.addChild(_this.gHeadImgWoMan);

		//男头像
		_this.gManList = LGlobal.divideCoordinate(816,157,1,8);
		_this.gManData = new LBitmapData(imglist["gHeadImgMan"],0,0,102,157);
		_this.gHeadImgMan = new LAnimationTimeline(_this.gManData, _this.gManList);
		_this.gHeadImgMan.speed = 3;
		_this.gHeadImgMan.stop();
		_this.gHeadImgMan.x = iManStart;
		_this.allMask.addChild(_this.gHeadImgMan);

	},
	manMoveFn: function(iNow){
		var _this = this,
			perMove = iManDiff/iAllTime;
		
		_this.oBanMove = LTweenLite.to(_this.gHeadImgMan,0.2,{
			x: iManStart - perMove*iNow - iStep,
			ease: LEasing.Sine.leaner
		});
	}
};

for(var k in g)Game.prototype[k] = g[k];
