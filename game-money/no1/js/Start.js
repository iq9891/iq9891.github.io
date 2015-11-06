/**
 * Created with EditPlus.
 * User: leemagnum
 * Date: 14-8-4
 * Time: 下午4.00
 * 开始对象.
 */
 function Start(){

    var _this = this;
	
	base(_this, LSprite, []);

	_this.init();

 };

 
var s = {
	init: function(){

		var _this = this;
		
		_this.graphics.drawRect(0, "", [0, 0, LGlobal.width, LGlobal.height], true, oData.mainBg);
		
		//添加标题
		_this.addTitFn();

	},
	addTitFn: function(){

		var _this = this;
		
		_this.titLayer = new LSprite();
		_this.titLayer.addChild(new LBitmap(new LBitmapData(imglist["tit"]))); 
		_this.titLayer.x = Tool.sc({w: 245}).x;;
		_this.titLayer.y = 128;
		_this.addChild(_this.titLayer);

		//添加钱
		_this.addStartBtnFn();

	},
	addStartBtnFn: function(){

		var _this = this;
		
		_this.startBtnLayer = new LSprite();
		_this.startBtnLayer.addChild(new LBitmap(new LBitmapData(imglist["start"])));
		_this.startBtnLayer.x = Tool.sc({w: oData.btnW}).x;
		_this.startBtnLayer.y = 430;
		_this.addChild(_this.startBtnLayer);

		_this.startBtnLayer.addEventListener(LMouseEvent.MOUSE_UP, $.proxy(_this.moneyFn, _this));

	},
	moneyFn: function(){

		var _this = this;
		
		_this.startBtnLayer.remove();

		//游戏开始
		moneyLayer = new Main();
		gameLayer.addChild(moneyLayer);
		

	}
};

for(var k in s)Start.prototype[k] = s[k];