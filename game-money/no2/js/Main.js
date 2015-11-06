/**
 * Created with EditPlus.
 * User: leemagnum
 * Date: 14-8-1
 * Time: 上午10.20
 * 主程序对象.
 */
 function Main(){

    var _this = this;
	
	base(_this, LSprite, []);

	_this.init();

	//是否滑动
	_this.isMove = false;
	//是否点击
	_this.isDown = false;

	//滑动方向 1上2下
	_this.iMoveDir = 0;

	//生成的随机数，代表哪个钱
	_this.imgNum = -1;

	//新建时间对象
	_this.timeLayer = new Time();
	_this.timeLayer.x = Tool.sc({w: 135}).x;
	_this.timeLayer.y = 130;
	_this.addChild(_this.timeLayer);
	
	//新建分数对象
	_this.scoreLayer = new Score();
	_this.scoreLayer.x = Tool.sc({w: 270}).x;
	_this.scoreLayer.y = 44;
	_this.addChild(_this.scoreLayer);
	
	//console.log(_this.scoreLayer.childList[1].childList[0].text);

	

 };

 
var m = {
	init: function(json){

		var _this = this;

		oData.iR = Tool.rand(0, 3);

		//分数记录
		_this.iScore = oData.aScore[oData.iR];

		//添加钱
		_this.addMoneyFn( oData.iR );

	},
	addMoneyFn: function(imgNum){

		var _this = this;

		_this.imgNum = imgNum;

		//console.log(_this.imgNum);
		_this.moneyBotLayer = new LSprite();
		_this.moneyBotB = new LBitmap(new LBitmapData(imglist["mb" + _this.imgNum]));
		_this.moneyBotLayer.addChild(_this.moneyBotB);
		_this.moneyBotLayer.x = Tool.sc({w: oData.mbW * 0.7}).x;
		_this.moneyBotLayer.y = 235;
		_this.moneyBotLayer.scaleX = 0.7;
		_this.moneyBotLayer.scaleY = 0.7;
		_this.addChild(_this.moneyBotLayer);
		
		_this.moneyLayer = new LSprite();
		_this.moneyB = new LBitmap(new LBitmapData(imglist["mb" + _this.imgNum]));
		_this.moneyLayer.addChild(_this.moneyB);
		_this.moneyLayer.x = Tool.sc({w: oData.mbW * 0.7}).x;
		_this.moneyLayer.y = 235;
		_this.moneyLayer.scaleX = 0.7;
		_this.moneyLayer.scaleY = 0.7;
		_this.addChild(_this.moneyLayer);

		_this.moneyLayer.addEventListener(LMouseEvent.MOUSE_DOWN, $.proxy(function(event){
			_this.moneyDownFn(event,imgNum);
		}, _this)); 
		_this.addEventListener(LMouseEvent.MOUSE_MOVE, $.proxy(_this.moneyMoveFn, _this));
		_this.addEventListener(LMouseEvent.MOUSE_UP, $.proxy(function(event){
			_this.moneyUpFn(imgNum);
		}, _this));

	},
	moneyDownFn: function(event,imgNum){

		var _this = this;
		
		if(!oData.bIsStart){
			return;
		}

		_this.moneyB.remove();
		_this.moneyB = new LBitmap(new LBitmapData(imglist["m" + imgNum]));
		_this.moneyLayer.addChild(_this.moneyB);
		
		_this.oldPos = {};

		_this.oldPos.x = event.offsetX;
		_this.oldPos.y = event.offsetY;

		_this.isDown = true;

		//开始倒计时
		oData.bStartTime = true;
		//console.log("点");

	},
	moneyMoveFn: function(event){

		var _this = this;
		
		if(!oData.bIsStart){
			return;
		}

		if(_this.isDown && _this.oldPos){
			
			if(_this.oldPos.y - event.offsetY > 10){
				_this.iMoveDir = 1;
				_this.isMove = true;
				//console.log("↑");
			}else if(_this.oldPos.y - event.offsetY < 10){
				_this.iMoveDir = 2;
				_this.isMove = true;
				//console.log("↓");
			}

		}
		

	},
	moneyUpFn: function(imgNum){

		var _this = this;
		
		if(!oData.bIsStart){
			return;
		}
		
		if(_this.isMove){
			_this.isDown = false;
			_this.isMove = false;
			
			//console.log("变");

			//添加随机钱
			if(_this.iMoveDir == 1){
				LTweenLite.to(_this.moneyLayer, 0.1, {
					y: - oData.mH,
					ease: LEasing.Strong.easeInOut,
					onComplete: function(){

						//_this.moneyBotLayer.remove();
						//_this.moneyBotLayer.die();
						//_this.moneyLayer.remove();
						//_this.moneyLayer.die();

						oData.iR = Tool.rand(0, 3);

						//更新分数
						_this.updateScoreFn();

						//添加钱
						_this.addMoneyFn(oData.iR);

						//分数
						_this.iScore += oData.aScore[oData.iR];

					}
				});
			}else if(_this.iMoveDir == 2){
				LTweenLite.to(_this.moneyLayer, 0.1, {
					y: oData.mH,
					ease: LEasing.Strong.easeInOut,
					onComplete: function(){

						//_this.moneyBotLayer.remove();
						//_this.moneyBotLayer.die();
						//_this.moneyLayer.remove();
						//_this.moneyLayer.die();

						oData.iR = Tool.rand(0, 3);

						//添加钱
						_this.addMoneyFn(oData.iR);

						////分数
						//_this.iScore += oData.aScore[oData.iR];

						////更新分数
						//_this.updateScoreFn();

					}
				});
			}
			
			//开始自动飞钱
			oData.bAutoFly = true;

		}else{
			//console.log("没变");
			_this.moneyB.remove();
			_this.moneyB = new LBitmap(new LBitmapData(imglist["mb" + imgNum]));
			_this.moneyLayer.addChild(_this.moneyB);

		}
		
		//更新点击坐标参考对象
		_this.oldPos = {};


	},
	updateScoreFn: function(){

		var _this = this;
		
		//更新分数
		_this.sScore = _this.iScore + "";
		_this.sScoreL = _this.sScore.length;
		
		if(_this.sScoreL == 4){
			
			_this.scoreLayer.childList[1].childList[0].text = "飞了" + _this.iScore/1000 + "k";

		}else if(_this.sScoreL >= 5){
			
			_this.scoreLayer.childList[1].childList[0].text = "飞了" + _this.iScore/10000 + "w";

		}else{
			_this.scoreLayer.childList[1].childList[0].text = "飞了" + _this.iScore ;
		}

		//console.log(_this.iScore);

	}
};

for(var k in m)Main.prototype[k] = m[k];