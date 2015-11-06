/**
 * Created with EditPlus.
 * User: leemagnum
 * Date: 14-8-8
 * Time: 下午15.30
 * 玩家对象.
 *	{
		data:
		list:
	}
 */
 function Player(json){

    var _this = this;
	
	base(_this, LAnimationTimeline, [json.data,json.list]);

 };

 
var p = {
	init: function(){

		var _this = this;

	}
};

for(var k in p)Player.prototype[k] = p[k];