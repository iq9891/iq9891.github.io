/**
 * Created with EditPlus.
 * User: leemagnum
 * Date: 14-8-4
 * Time: 上午 11.00
 * 游戏结束对象.
 */
 function Over(){

    var _this = this;
	
	base(_this, LSprite, []);

	//_this.share();
	
	_this.init();

 };

 
var o = {
	//share: function(){

		//var _this = this;
		
		//_this.share = new LSprite();
		//_this.share.addChild(new LBitmap(new LBitmapData(imglist["share"]))); 
		//_this.addChild(_this.share);
		//_this.share.alpha = 0;
		//LTweenLite.to(_this.share,2,{
			//alpha:1,
			//ease:LEasing.Strong.easeInOut,
			//onComplete: function(){

				//_this.share.addEventListener(LMouseEvent.MOUSE_UP, $.proxy(_this.shareFn, _this));

			//}
		//})
		
	//},
	//shareFn: function(){

		//var _this = this;
		
		//_this.share.remove();

		////游戏重置
		//_this.reSetFn();
		
		//_this.init();

	//},
	init: function(json){

		var _this = this;
		
		
		_this.graphics.drawRect(0, "", [0, 0, LGlobal.width, LGlobal.height], true, oData.mainBg);

		//添加文字
		_this.addFontFn();

	},
	addFontFn: function(){

		var _this = this;
		
		_this.scoreLayer = new LSprite();
		_this.scoreLayer.x = LGlobal.width / 2;
		_this.scoreLayer.y = 70;
		_this.addChild(_this.scoreLayer);
		
		_this.score = new LTextField();
		_this.score.color = "#ff0000";
		_this.score.font = "HG行書体";
		_this.score.size = 30;
		_this.score.textAlign  = "center";
		_this.score.y = 40;
		//_this.score.text = "游戏结束";
		_this.score.text = "你跑了" + oData.score + "米";
		
		_this.scoreLayer.addChild(_this.score);

		_this.startLayer = new LSprite();
		_this.startLayer.x = LGlobal.width / 2;
		_this.startLayer.y = 180;
		_this.addChild(_this.startLayer);
		
		_this.start = new LTextField();
		_this.start.color = "#ff0000";
		_this.start.size = 30;
		_this.start.textAlign = "center";
		_this.start.text = "重新开始";
		_this.startLayer.addChild(_this.start);
		
		_this.startLayer.graphics.drawRect(0, "", [ - _this.start.width * 0.5, 0, _this.start.width, 50], true, oData.mainBg);
		
		_this.startLayer.addEventListener(LMouseEvent.MOUSE_UP, $.proxy(_this.restartFn, _this));


	},
	reSetFn: function(){

		var _this = this;
		
		console.log(1);

		frogLayer.remove();
		
		//游戏开始可以点
		oData.bIsStart = false;
			
		//开始计时
		oData.bStartTime = false;

		//分数重置
		oData.score = 0;

	},
	restartFn: function(){

		var _this = this;
		
		//console.log(1);
		
		//删除游戏结束画面
		_this.remove();
	
		//游戏重置
		_this.reSetFn();

		//重新开始
		frogLayer =  new Main();
		addChild(frogLayer);

	}
};

for(var k in o)Over.prototype[k] = o[k];