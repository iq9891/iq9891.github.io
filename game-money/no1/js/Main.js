/**
 * Created with EditPlus.
 * User: leemagnum
 * Date: 14-8-4
 * Time: 下午14.20
 * 主程序对象.
 */
 function Main(){

    var _this = this;
	
	base(_this, LSprite, []);

	_this.init();

	//是否点击
	_this.isDown = false;

	//滑动方向 1上2下
	_this.iMoveDir = 0;

	//生成的随机数，代表哪个钱
	_this.imgNum = -1;

	//新建时间对象
	_this.timeLayer = new Time();
	_this.timeLayer.x = LGlobal.width / 2;
	_this.timeLayer.y = 230;
	_this.addChild(_this.timeLayer);
	
	//新建分数对象
	_this.scoreLayer = new Score();
	_this.scoreLayer.x = Tool.sc({w: 270}).x;
	_this.scoreLayer.y = 320;
	_this.addChild(_this.scoreLayer);
	
	//console.log(_this.scoreLayer.childList[1].childList[0].text);

	

 };

 
var m = {
	init: function(json){

		var _this = this;

		//分数记录
		_this.iScore = 0;

		//添加钱
		_this.addMoneyFn();

	},
	addMoneyFn: function(){

		var _this = this;


		_this.moneyLayer = new LButton(
				new LBitmap(new LBitmapData(imglist["gameBtn"])),
				new LBitmap(new LBitmapData(imglist["gameBtnOn"]))
		);
		_this.moneyLayer.x = Tool.sc({w: oData.btnW}).x;
		_this.moneyLayer.y = 430;
		_this.addChild(_this.moneyLayer);

		_this.moneyLayer.addEventListener(LMouseEvent.MOUSE_DOWN, $.proxy(_this.moneyDownFn, _this)); 

	},
	moneyDownFn: function(){

		var _this = this;

		if(!oData.bIsStart){
			return;
		}
		
		//开始倒计时
		oData.bStartTime = true;
		
		//分数累加
		_this.iScore += 10;
		
		//更新分数
		_this.updateScoreFn();

	},
	updateScoreFn: function(){

		var _this = this;
		
		//更新分数
		_this.sScore = _this.iScore + "";
		_this.sScoreL = _this.sScore.length;
		
		if(_this.sScoreL == 4){
			
			_this.scoreLayer.childList[0].childList[0].text = "￥" + _this.iScore/1000 + "k";

		}else if(_this.sScoreL >= 5){
			
			_this.scoreLayer.childList[0].childList[0].text = "￥" + _this.iScore/10000 + "w";

		}else{
			_this.scoreLayer.childList[0].childList[0].text = "￥" + _this.iScore ;
		}

		//console.log(_this.iScore);

	}
};

for(var k in m)Main.prototype[k] = m[k];