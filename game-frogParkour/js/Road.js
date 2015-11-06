/**
 * Created with EditPlus.
 * User: leemagnum
 * Date: 14-8-1
 * Time: 上午10.20
 * 开始对象.
 */
 function Road(){

    var _this = this;
	
	base(_this, LSprite, []);

	_this.init();

 };

 
var r = {
	init: function(){

		var _this = this;
		
		//添加路
		_this.roadFn();		

		//添加背景
		_this.bgFn();

	},
	bgFn: function(){

		var _this = this;

		_this.bgLayer = new LSprite();
		_this.bgLayer.y = -40;
		_this.bgBitmap = new LBitmap(new LBitmapData(imglist["bg"]));
		_this.bgLayer.addChild(_this.bgBitmap);
		_this.addChild(_this.bgLayer);
		
		_this.bgLayer2 = new LSprite();
		_this.bgLayer2.x = oData.bg[0] - 2;
		_this.bgLayer2.y = -40;
		_this.bgBitmap2 = new LBitmap(new LBitmapData(imglist["bg"]));
		_this.bgLayer2.addChild(_this.bgBitmap2);
		_this.addChild(_this.bgLayer2);

		
	},
	roadFn: function(){

		var _this = this;

		_this.roadLayer = new LSprite();
		_this.addChild(_this.roadLayer);

		_this.roadLayer1 = new LSprite();
		_this.roadLayer1.y = 120;
		_this.roadBitmap1 = new LBitmap(new LBitmapData(imglist["road"]));
		_this.roadLayer1.addChild(_this.roadBitmap1);
		_this.roadLayer.addChild(_this.roadLayer1);
		
		_this.roadLayer2 = new LSprite();
		_this.roadLayer2.x = oData.road[0] - 2;
		_this.roadLayer2.y = 120;
		_this.roadBitmap2 = new LBitmap(new LBitmapData(imglist["road"]));
		_this.roadLayer2.addChild(_this.roadBitmap2);
		_this.roadLayer.addChild(_this.roadLayer2);

	},
	addRoadFn: function(x){

		var _this = this;

		_this.roadLayer2 = new LSprite();
		_this.roadLayer2.x = x;
		_this.roadLayer2.y = 120;
		_this.roadBitmap2 = new LBitmap(new LBitmapData(imglist["road"]));
		_this.roadLayer2.addChild(_this.roadBitmap2);
		_this.roadLayer.addChild(_this.roadLayer2);

	},
	bgFrameFn: function(){

		var _this = this;

		//背景
		if(_this.bgLayer.x <= - oData.bg[0] - 10){
			//console.log(1);
			_this.bgLayer.x = oData.bg[0] - 10 * 2;
		}else{
			_this.bgLayer.x -= oData.bgSpeed;
		}
		
		if(_this.bgLayer2.x <= - oData.bg[0] - 10){
			//console.log(2);
			_this.bgLayer2.x = oData.bg[0] - 10 * 2;
		}else{
			_this.bgLayer2.x -= oData.bgSpeed;
		}

		//console.log(oData.iSpeed);
		//路
        if (_this.roadLayer.x <= - oData.road[0] + oData.iSpeed + oData.s) {
            _this.roadLayer.x = 0;
        }
        _this.roadLayer.x -= oData.iSpeed + oData.s;
        
		

	}
};

for(var k in r)Road.prototype[k] = r[k];