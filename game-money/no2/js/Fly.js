/**
 * Created with EditPlus.
 * User: leemagnum
 * Date: 14-8-1
 * Time: 下午15.30
 * 飞钱对象.
 */
 /*
	n: 第几个钱
 */
 function Fly(json){

    var _this = this;
	
	base(_this, LSprite, []);

	_this.iNum = json.n;
	_this.scaleX = 0.5;
	_this.scaleY = 0.5;


	_this.x = oData.dW * 0.5 + Tool.rand(- oData.dH * 0.5, LGlobal.width - oData.dH * 0.5);
	_this.y = -30;

	_this.init();

 };

 
var f = {
	init: function(json){

		var _this = this;
		
		_this.bit = new LBitmap(new LBitmapData(imglist["d" + _this.iNum]));
		_this.bit.x = - oData.dW * 0.5;
		_this.bit.y = - oData.dH * 0.5;
		_this.addChild(_this.bit);

	},
	onframe: function(){

		var _this = this;
		
		_this.y++;
		_this.rotate++;

	}
};

for(var k in f)Fly.prototype[k] = f[k];