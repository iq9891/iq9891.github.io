/**
 * Created with EditPlus.
 * User: leemagnum
 * Date: 14-7-24
 * Time: 下午1:35
 * 玩家对象.
 */
 /*
	d: data,
	l: list,
	f: 添加的父级层,
	a: 移动的角度,
	g: game类
 */
function Player(json){

    var _this = this;
	
	base(_this, LAnimationTimeline, [json.d, json.l]);
	
	//设置播放镜头
	_this.setAnim();

};


var p = {
	setAnim: function(){

		var _this = this;
	
		_this.setLabel("one",0,0);
		_this.setLabel("two",1,0);
		_this.setLabel("three",2,0);
		_this.setLabel("four",3,0);
		_this.setLabel("five",4,0);

	}
};

for(var k in p)Player.prototype[k] = p[k];