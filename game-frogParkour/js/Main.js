/**
 * Created with EditPlus.
 * User: leemagnum
 * Date: 14-8-7
 * Time: 下午 5.40
 * 主程序对象.
 */
 function Main(){

    var _this = this;
	
	base(_this, LSprite, []);

	_this.init();

	//新建分数对象
	//_this.scoreLayer = new Score();
	//_this.scoreLayer.x = 30;
	//_this.scoreLayer.y = 40;
	//_this.addChild(_this.scoreLayer);

	//新建时间对象
	_this.timeLayer = new Time();
	_this.timeLayer.x = 230;
	_this.timeLayer.y = 20;
	_this.addChild(_this.timeLayer);
	
	//console.log(_this.scoreLayer.childList[1].childList[0].text);

	

 };

 
var m = {
	init: function(json){

		var _this = this;
		
		//添加背景
		_this.roadLayer = new Road();
		_this.addChild(_this.roadLayer);
		
		//添加所有障碍物层
		_this.iTemAll = new LSprite();
		_this.addChild(_this.iTemAll);
		

		_this.playerFn();

		//添加按钮
		_this.addBtnFn();

	},
	playerFn: function(){

		var _this = this;
		
		_this.list = LGlobal.divideCoordinate(oData.aPlayer[0], oData.aPlayer[1], 1, oData.aPlayer[4]);
		
		_this.data = new LBitmapData(imglist["frog"],0,0, oData.aPlayer[2], oData.aPlayer[3]);

		_this.playerLayer = new LAnimationTimeline(_this.data, _this.list);
		_this.playerLayer.speed = 10;
		_this.playerLayer.x = 0;
		_this.playerLayer.y = oData.aFrogPos[1];
		_this.addChild(_this.playerLayer);
		_this.playerLayer.stop();
		

		_this.playerHit = new LSprite();
		_this.playerHit.x = oData.aFrogPos[0] - oData.item[0];
		_this.playerHit.y = oData.aFrogPos[1] + 30;
		_this.addChild(_this.playerHit);
		_this.playerHit.addShape(LShape.RECT,[0, 33, oData.item[0], 29]);

	},
	addBtnFn: function(){

		var _this = this;
		
		_this.btnFn(15, 325, 0, _this.topDownFn);
		_this.btnFn(727, 325, 1, _this.botDownFn);

	},
	btnFn: function(oX, oY, i, fn){

		var _this = this;
		
		_this.btnBit1 = new LBitmap(new LBitmapData(imglist["btn"]));
		_this.btnBit1.bitmapData.setCoordinate(0, oData.aBtn[1] * i);
		_this.btnBit1.bitmapData.width = oData.aBtn[0];
		_this.btnBit1.bitmapData.height = oData.aBtn[1];

		_this.btnBit2 = new LBitmap(new LBitmapData(imglist["btn"]));
		_this.btnBit2.bitmapData.setCoordinate(0, oData.aBtn[1] * (i + 2));
		_this.btnBit2.bitmapData.width = oData.aBtn[0];
		_this.btnBit2.bitmapData.height = oData.aBtn[1];

		_this.btnLayer1 = new LButton(
							_this.btnBit1,
							_this.btnBit2
						);

		_this.btnLayer1.x = oX;
		_this.btnLayer1.y = oY;
		_this.addChild(_this.btnLayer1);
		
		_this.btnLayer1.addEventListener(LMouseEvent.MOUSE_DOWN,$.proxy(fn, _this));
		
	},
	topDownFn: function(){

		var _this = this;
			
		//开始
		oData.bIsStart = true;

		//开始计时
		oData.bStartTime = true;

		//青蛙动画
		_this.playerLayer.play();
		
		//console.log(oData.aPlayerIndex);
		if(oData.aPlayerIndex == 0){
			oData.aPlayerIndex = 0;
		}else{
			oData.aPlayerIndex--;
		}
		//console.log(oData.aFrogPos[oData.aPlayerIndex]);
		_this.playerLayer.y = oData.aFrogPos[oData.aPlayerIndex];
		frogLayer.playerHit.y = oData.aFrogPos[oData.aPlayerIndex] + 30;
		
	},
	botDownFn: function(){

		var _this = this;
			
		//开始
		oData.bIsStart = true;

		//开始计时
		oData.bStartTime = true;

		//青蛙动画
		_this.playerLayer.play();
		
		if(oData.aPlayerIndex == oData.aFrogPos.length - 1){
			oData.aPlayerIndex = oData.aFrogPos.length - 1;
		}else{
			oData.aPlayerIndex++;
		}

		_this.playerLayer.y = oData.aFrogPos[oData.aPlayerIndex];
		frogLayer.playerHit.y = oData.aFrogPos[oData.aPlayerIndex] + 30;

	}
};

for(var k in m)Main.prototype[k] = m[k];