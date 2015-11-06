/**
 * Created with EditPlus.
 * User: leemagnum
 * Date: 14-8-1
 * Time: 上午10.20
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
		
		_this.addChild(new LBitmap(new LBitmapData(imglist["bg"])));
		
		//添加标题
		_this.addTitFn();

	},
	addTitFn: function(){

		var _this = this;
		
		_this.titLayer = new LSprite();
		_this.titLayer.addChild(new LBitmap(new LBitmapData(imglist["tit"])));
		_this.addChild(_this.titLayer);

		//添加钱
		_this.addMoneyFn();

	},
	addMoneyFn: function(){

		var _this = this;
		
		_this.moneyLayer = new LSprite();
		_this.moneyLayer.addChild(new LBitmap(new LBitmapData(imglist["mb3"])));
		_this.moneyLayer.x = Tool.sc({w: oData.mbW * 0.7}).x;
		_this.moneyLayer.y = 524;
		_this.moneyLayer.scaleX = 0.7;
		_this.moneyLayer.scaleY = 0.7;
		_this.addChild(_this.moneyLayer);

		_this.moneyLayer.addEventListener(LMouseEvent.MOUSE_DOWN, $.proxy(_this.moneyDownFn, _this));
		_this.addEventListener(LMouseEvent.MOUSE_UP, $.proxy(_this.moneyUpFn, _this));

		//添加方向指示
		_this.addDirFn();

	},
	moneyDownFn: function(event){

		var _this = this;
		
		_this.oldPos = {};

		_this.oldPos.x = event.offsetX;
		_this.oldPos.y = event.offsetY;
		
		//console.log(_this.oldPos);

	},
	moneyUpFn: function(event){

		var _this = this;
		
		if(_this.oldPos && event.offsetY < _this.oldPos.y){

			LTweenLite.to(_this.moneyLayer, 1, {
				y: - oData.mbH,
				ease: LEasing.Strong.easeInOut,
				onComplete: function(){

					//console.log("上");
					_this.remove();

					//新建主程序
					moneyLayer =  new Main();
					gameLayer.addChild(moneyLayer);


				}
			});
		}

	},
	addDirFn: function(){

		var _this = this;
		
		_this.dirLayer = new LSprite();
		_this.dirLayer.addChild(new LBitmap(new LBitmapData(imglist["top"])));
		_this.dirLayer.x = Tool.sc({w: oData.dirW}).x;
		_this.dirLayer.y = 450;
		_this.addChild(_this.dirLayer);

	}
};

for(var k in s)Start.prototype[k] = s[k];