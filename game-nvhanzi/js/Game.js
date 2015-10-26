/*
 * Created with EditPlus.
 * User: leemagnum
 * Date: 14-9-15
 * Time: 11:30
 * 游戏对象.
*/
function Game(){

	var _this = this;

	base(_this,LSprite,[]);

	_this.init();

	//男神数量
	_this.manNum = 0;

};


var g = {
	init: function(){

		var _this = this;
		
		_this.bgLayer = new LSprite();
		_this.bgLayer.addChild(new LBitmap(new LBitmapData(imglist["gBg"])));
		_this.addChild(_this.bgLayer);
		
		//游戏开始引导页
		//_this.guidFn();

		//添加左边计分
		_this.scoreFn();

		//添加右边计时
		_this.timeFn();
		
		_this.manAllLayer = new LSprite();
		_this.addChild(_this.manAllLayer);

		//添加男神头像
		_this.addFn();
		
		_this.starAllLayer = new LSprite();
		_this.addChild(_this.starAllLayer);
	},
	guidFn: function(){

		var _this = this;

		_this.guidAllLayer = new LSprite();
		_this.addChild(_this.guidAllLayer);
		
		//创建弹框遮罩
		_this.blackLayer = new LSprite();
		_this.blackLayer.graphics.drawRect(0, "", [0, 0, LGlobal.width, LGlobal.height], true, "#000000");
		_this.blackLayer.alpha = 0.6;
		_this.guidAllLayer.addChild(_this.blackLayer);
		
		//倒计时时间字体
		_this.guidFontLayer = new LSprite();
		_this.guidFontLayer.x = 175;
		_this.guidFontLayer.y = 138;
		_this.guidFontBit = new LBitmap(new LBitmapData(imglist["merge"]));
		_this.guidFontBit.bitmapData.setCoordinate(220, 501);
		_this.guidFontBit.bitmapData.width = 196;
		_this.guidFontBit.bitmapData.height = 40;
		_this.guidFontLayer.addChild(_this.guidFontBit);
		_this.guidAllLayer.addChild(_this.guidFontLayer);
		
		//倒计时时间字体
		_this.guidImgLayer = new LSprite();
		_this.guidImgLayer.x = 115;
		_this.guidImgLayer.y = 200;
		_this.guidImgBit = new LBitmap(new LBitmapData(imglist["merge"]));
		_this.guidImgBit.bitmapData.setCoordinate(0, 1292);
		_this.guidImgBit.bitmapData.width = 251;
		_this.guidImgBit.bitmapData.height = 251;
		_this.guidImgLayer.addChild(_this.guidImgBit);
		_this.guidAllLayer.addChild(_this.guidImgLayer);

		//倒计时提示字体
		_this.guidTitLayer1 = new LTextField(); 
		_this.guidTitLayer1.x = 195;
		_this.guidTitLayer1.y = 477;
		_this.guidTitLayer1.size = 18; 
		_this.guidTitLayer1.color = "#ffffff"; 
		_this.guidTitLayer1.text = "猛摇手机";
		_this.guidAllLayer.addChild(_this.guidTitLayer1);

		_this.guidTitLayer2 = new LTextField(); 
		_this.guidTitLayer2.x = 195;
		_this.guidTitLayer2.y = 503;
		_this.guidTitLayer2.size = 18; 
		_this.guidTitLayer2.color = "#ffffff"; 
		_this.guidTitLayer2.text = "收集男神";  
		_this.guidAllLayer.addChild(_this.guidTitLayer2);

	},
	scoreFn: function(){

		var _this = this;

		_this.scoreBgLayer = new LSprite();
		_this.scoreBgLayer.x = 20;
		_this.scoreBgLayer.y = 15;
		_this.scoreBgLayerBit = new LBitmap(new LBitmapData(imglist["merge"]));
		_this.scoreBgLayerBit.bitmapData.width = 182;
		_this.scoreBgLayerBit.bitmapData.height = 67;
		_this.scoreBgLayer.addChild(_this.scoreBgLayerBit);
		_this.addChild(_this.scoreBgLayer);

		_this.scoreImgLayer = new LSprite();
		_this.scoreImgLayer.x = 20;
		_this.scoreImgLayer.y = 15;
		_this.scoreImgBit = new LBitmap(new LBitmapData(imglist["merge"]));
		_this.scoreImgBit.bitmapData.setCoordinate(0, 67);
		_this.scoreImgBit.bitmapData.width = 64;
		_this.scoreImgBit.bitmapData.height = 67;
		_this.scoreImgLayer.addChild(_this.scoreImgBit);
		_this.addChild(_this.scoreImgLayer);


		_this.scoreAllLayer = new LSprite();
		_this.addChild(_this.scoreAllLayer);
		
		//男神
		_this.scoreTitLayer = new LTextField(); 
		_this.scoreTitLayer.x = 30;
		_this.scoreTitLayer.y = 90;
		_this.scoreTitLayer.size = 18; 
		_this.scoreTitLayer.color = "#ffffff"; 
		_this.scoreTitLayer.text = "男神";
		_this.addChild(_this.scoreTitLayer);
		
		//计时
		_this.timeTitLayer = new LTextField(); 
		_this.timeTitLayer.x = 405;
		_this.timeTitLayer.y = 90;
		_this.timeTitLayer.size = 18; 
		_this.timeTitLayer.color = "#ffffff"; 
		_this.timeTitLayer.text = "计时";
		_this.addChild(_this.timeTitLayer);
		
		//添加分数
		_this.changeScoreFn(0);

	},
	changeScoreFn: function(iNow){

		var _this = this,
			i = 0,
			sNow = (iNow + ""),
			l = sNow.length;
		
		if(_this.scoreLayer){
			_this.scoreAllLayer.removeAllChild();
		}
		
		for(; i < l; i++){
			_this.scoreLayer = new LSprite();
			_this.scoreLayer.x = 100 + 16 * i;
			_this.scoreLayer.y = 28;
			_this.scoreBit = new LBitmap(new LBitmapData(imglist["merge"]));
			_this.scoreBit.bitmapData.setCoordinate(16 * sNow[i], 134);
			_this.scoreBit.bitmapData.width = 16;
			_this.scoreBit.bitmapData.height = 40;
			_this.scoreLayer.addChild(_this.scoreBit);
			_this.scoreAllLayer.addChild(_this.scoreLayer);
		}

	},
	timeFn: function(){

		var _this = this;

		_this.timeBgLayer = new LSprite();
		_this.timeBgLayer.rotate = 180;
		_this.timeBgLayer.x = 460;
		_this.timeBgLayer.y = 82;
		_this.timeBgLayerBit = new LBitmap(new LBitmapData(imglist["merge"]));
		_this.timeBgLayerBit.bitmapData.width = 182;
		_this.timeBgLayerBit.bitmapData.height = 67;
		_this.timeBgLayer.addChild(_this.timeBgLayerBit);
		_this.addChild(_this.timeBgLayer);

		_this.timeImgLayer = new LSprite();
		_this.timeImgLayer.x = 394;
		_this.timeImgLayer.y = 15;
		_this.timeImgBit = new LBitmap(new LBitmapData(imglist["merge"]));
		_this.timeImgBit.bitmapData.setCoordinate(64, 67);
		_this.timeImgBit.bitmapData.width = 64;
		_this.timeImgBit.bitmapData.height = 67;
		_this.timeImgLayer.addChild(_this.timeImgBit);
		_this.addChild(_this.timeImgLayer);

		_this.timeAllLayer = new LSprite();
		_this.addChild(_this.timeAllLayer);

		//添加计时数字
		_this.timeLayer = new LSprite();
		_this.timeLayer.x = 320;
		_this.timeLayer.y = 28;
		_this.timeBit = new LBitmap(new LBitmapData(imglist["merge"]));
		_this.timeBit.bitmapData.setCoordinate(0, 134);
		_this.timeBit.bitmapData.width = 16;
		_this.timeBit.bitmapData.height = 40;
		_this.timeLayer.addChild(_this.timeBit);
		_this.timeAllLayer.addChild(_this.timeLayer);

		_this.timeLayer = new LSprite();
		_this.timeLayer.x = 336;
		_this.timeLayer.y = 28;
		_this.timeBit2 = new LBitmap(new LBitmapData(imglist["merge"]));
		_this.timeBit2.bitmapData.setCoordinate(112, 134);
		_this.timeBit2.bitmapData.width = 16;
		_this.timeBit2.bitmapData.height = 40;
		_this.timeLayer.addChild(_this.timeBit2);
		_this.timeAllLayer.addChild(_this.timeLayer);

		_this.timeLayer = new LSprite();
		_this.timeLayer.x = 352;
		_this.timeLayer.y = 28;
		_this.timeBit = new LBitmap(new LBitmapData(imglist["merge"]));
		_this.timeBit.bitmapData.setCoordinate(160, 134);
		_this.timeBit.bitmapData.width = 25;
		_this.timeBit.bitmapData.height = 40;
		_this.timeLayer.addChild(_this.timeBit);
		_this.timeAllLayer.addChild(_this.timeLayer);

	},
	chaneDiffFn: function(iNow){
		this.timeBit2.bitmapData.setCoordinate(16 * iNow, 134);
	},
	addFn: function(){

		var _this = this,
			i = 0,
			l = oPosData.x.length;

		_this.manNum = l;
		
		for(; i < l; i++){
			_this.manLayer = new LSprite();
			_this.manLayer.x = oPosData.x[i];
			_this.manLayer.y = oPosData.y[i];
			_this.manLayerBit = new LBitmap(new LBitmapData(imglist["man"]));
			_this.manLayerBit.bitmapData.setCoordinate(0, 80 * i);
			_this.manLayerBit.bitmapData.width = 75;
			_this.manLayerBit.bitmapData.height = 80;
			_this.manLayer.addChild(_this.manLayerBit);
			_this.manAllLayer.addChild(_this.manLayer);
		}
		
		
	},
	addNumFn: function(iNow){	//添加固定的男神
		
		var _this = this;
			//x = _this.manAllLayer.getChildAt(iNow).x,
			//y = _this.manAllLayer.getChildAt(iNow).y;
		
		//_this.manAllLayer.getChildAt(iNow).remove();
	
		_this.manLayer = new LSprite();
		_this.manLayer.x = oPosData.x[iNow];
		_this.manLayer.y = oPosData.y[iNow];
		_this.manLayer.alpha = 0;
		_this.manLayerBit = new LBitmap(new LBitmapData(imglist["man"]));
		_this.manLayerBit.bitmapData.setCoordinate(0, 80 * iNow);
		_this.manLayerBit.bitmapData.width = 75;
		_this.manLayerBit.bitmapData.height = 80;
		_this.manLayer.addChild(_this.manLayerBit);
		_this.manAllLayer.addChild(_this.manLayer);
		
		LTweenLite.to(_this.manLayer,0.2,{
			alpha: 1,
			ease:Strong.easeOut
		});

	},
	animFn: function(iNow){

		var _this = this,
			arr = [-80, LGlobal.width + 80];
		
		//_this.manAllLayer.getChildAt(iNow).childList[0].bitmapData.setCoordinate(75, 80 * iNow);

		LTweenLite.to(_this.manAllLayer.getChildAt(iNow),0.2,{
			y:Tool.rand(580, 625),
			ease:Strong.easeOut,
			onComplete: function(){
				LTweenLite.to(_this.manAllLayer.getChildAt(iNow),0.2,{
					x: arr[Tool.rand(0, 1)],
					y: Tool.rand(285, 385),
					ease:Strong.easeOut,
					onComplete: function(){
						_this.manAllLayer.getChildAt(iNow).remove();
					}
				});
			}
		});

	},
	addStartFn: function(x, y){

		var _this = this;
		
		_this.starLayer = new LSprite();
		_this.starLayer.x = x;
		_this.starLayer.y = y;
		_this.starLayer.alpha = 0;
		_this.starLayer.addChild(new LBitmap(new LBitmapData(imglist["star"])));
		_this.starAllLayer.addChild(_this.starLayer);
		
		LTweenLite.to(_this.starLayer,0.8,{
			alpha: 1,
			ease:Strong.easeOut,
			onComplete: function(){
				//可以添加星星
				bCanAddStar = true;
			}
		});

	}
};

for(var k in g)Game.prototype[k] = g[k];

