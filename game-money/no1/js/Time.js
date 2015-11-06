/**
 * Created with EditPlus.
 * User: leemagnum
 * Date: 14-8-4
 * Time: 下午14.20
 * 时间对象.
 */
 function Time(){

    var _this = this;
	
	base(_this, LSprite, []);

	_this.init();

 };

 
var t = {
	init: function(json){

		var _this = this;

		//添加文字
		_this.addFontFn();

	},
	addFontFn: function(){

		var _this = this;
		
		_this.times = new LTextField();
		_this.times.color = "#ffffff";
		_this.times.font = "HG行書体";
		_this.times.size = 30;
		_this.times.textAlign  = "center";
		_this.times.y = 15;
		_this.times.text = "倒计时：" + oData.iTime + "\"";
		_this.addChild(_this.times);

		_this.diffFn(oData.iTime);

	},
	diffFn: function (intDiff){

        var _this = this,
			day=0,
			hour=0,
			minute=0,
			second=0;//时间默认值		

		_this.oTim = setInterval(function(){
			
			if(!oData.bStartTime){
				return;
			}

			if(intDiff > 0){
				day = Math.floor(intDiff / (60 * 60 * 24));
				hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
				minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
				second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
			}
			if (minute <= 9) minute = '0' + minute;
			if (second <= 9) second = '0' + second;
			
			if(intDiff < 1){
				//console.log("游戏结束");
				clearInterval(_this.oTim);
				_this.times.text = "倒计时：00" + "\"";
				//游戏结束
				
				//不能点
				oData.bIsStart = false;

				//创建游戏结束对象
				overLayer = new Over();
				addChild(overLayer);
				
			}else{
				
				_this.times.text = "倒计时：" + second + "\"";
				//console.log(intDiff);
				intDiff--;

			}

		}, 1000);
	}
};

for(var k in t)Time.prototype[k] = t[k];