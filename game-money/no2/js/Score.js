/**
 * Created with EditPlus.
 * User: leemagnum
 * Date: 14-8-1
 * Time: 下午14.50
 * 分数对象.
 */
 function Score(){

    var _this = this;
	
	base(_this, LSprite, []);

	_this.init();

 };

 
var s = {
	init: function(json){

		var _this = this;

		_this.addChild(new LBitmap(new LBitmapData(imglist["score"])));

		//添加文字
		_this.addFontFn();

	},
	addFontFn: function(){

		var _this = this;
		
		_this.scoreLayer = new LSprite();
		_this.scoreLayer.x = 135;
		_this.addChild(_this.scoreLayer);

		_this.score = new LTextField();
		_this.score.color = "#ffffff";
		_this.score.font = "HG行書体";
		_this.score.size = 30;
		_this.score.textAlign  = "center";
		_this.score.y = 15;
		_this.score.text = "飞了"+0;
		_this.scoreLayer.addChild(_this.score);

	}
};

for(var k in s)Score.prototype[k] = s[k];