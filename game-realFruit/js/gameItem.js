/*
 * Created with EditPlus.
 * User: leemagnum
 * Date: 14-11-21
 * Time: 12:00
 * 游戏主对象.
*/
function Item(){

	var _this = this;

	base(_this,LSprite,[]);

	_this.iNow = 0;

	_this.bClicked = false;

	_this.init();

};


var g = {
	init: function(){

		var _this = this;
		
		//添加背景
		_this.addBgFn();

	},
	addBgFn: function(){

		var _this = this;

		_this.iNow = parseInt(iInitNumX*oMathRan());

        _this.itemlayerBit = new LBitmap(new LBitmapData(imglist["gItem"],0,0,iGridX,iGridX));
		_this.itemlayerBit.bitmapData.setCoordinate(0, iGridX * _this.iNow);
        _this.addChild(_this.itemlayerBit);

	}
};

for(var k in g)Item.prototype[k] = g[k];
