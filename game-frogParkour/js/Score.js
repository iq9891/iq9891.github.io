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

		//添加文字
		_this.addFontFn();

	},
	addFontFn: function(){

		var _this = this;

		_this.score = new LTextField();
		_this.score.color = oData.startColor;
		_this.score.font = "HG行書体";
		_this.score.size = 30;
		_this.score.text = "得分：0";
		_this.addChild(_this.score);

	}
};

for(var k in s)Score.prototype[k] = s[k];