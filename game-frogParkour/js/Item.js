/**
 * Created with EditPlus.
 * User: leemagnum
 * Date: 14-8-8
 * Time: 上午12.00
 * 开始对象.
 */
 function Item(i){

    var _this = this;
	
	base(_this, LSprite, []);

	_this.index = i;

	if(i < 2){//0-1

		_this.itemBit = new LBitmap(new LBitmapData(imglist["item"]));
		_this.itemBit.bitmapData.setCoordinate(i * oData.item[0], 0);
		_this.itemBit.bitmapData.width = oData.item[0];
		_this.itemBit.bitmapData.height = oData.item[1];
		_this.addChild(_this.itemBit);
		_this.addShape(LShape.RECT,[0, 33, oData.item[0], 29]);

	}

	if(i > 1){	//2
		
		_this.list = LGlobal.divideCoordinate(oData.aSpeedUp[0], oData.aSpeedUp[1], 1, oData.aSpeedUp[4]);
		
		_this.data = new LBitmapData(imglist["speedup"],0,0, oData.aSpeedUp[2], oData.aSpeedUp[3]);

		_this.speedUpLayer = new LAnimationTimeline(_this.data, _this.list);
		_this.speedUpLayer.y = 25;
		_this.speedUpLayer.speed = 10;
		_this.addChild(_this.speedUpLayer);
		_this.addShape(LShape.RECT,[0, 33, oData.item[0], 29]);

	}

 };

 
var iFn = {
	run: function(){

		var _this = this;
		
		_this.x -= oData.iSpeed;

	}
};

for(var k in iFn)Item.prototype[k] = iFn[k];