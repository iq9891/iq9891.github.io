var game = {
	steering: {
		oldX: 0,	//左右点下去的X
		oldY: 0,		//左右点下去的y
		aChangeR: 0		//拖动方向盘改变的半径
	},
	gameTime: 1,	//游戏3分钟 
	steeringAreaLayerX: 225,	//左右方向实际控制层的x
	steeringLayerX: 210,			//左右方向视觉层的x
	carW: 60,			//车的宽度
	bWin: false,	//游戏是否赢了
	bLose: false,	//游戏是否输了
	bStart:false,	//是否开始游戏
	firstDirUp: true,	//是不是第一次抬起
    start: function () {

        var _this = this;

        _this.allLayer = new LSprite();
        onFrameLayer.addChild(_this.allLayer);

        _this.bgLayer = new LSprite();
		_this.bgLayer.addChild(new LBitmap(new LBitmapData(imglist["bg"])));
        _this.allLayer.addChild(_this.bgLayer);

        _this.gameLayer = new LSprite();
        _this.allLayer.addChild(_this.gameLayer);
		
		_this.startGame();

    },
	startGame: function(){

        var _this = this;

		_this.gameOverFn("tit");

	},
	gameFn: function(){

        var _this = this;

		//车轮左右是否可以滑动
		_this.bSteeringMove = false;

		//停车位 
		_this.parkRoomFn();

		//添加汽车
        _this.carRadiusLayer = new LSprite();
        _this.gameLayer.addChild(_this.carRadiusLayer);

		_this.carFn();

		//添加油门方向感
		_this.throttleFn();

		//添加左右方向
		_this.steeringBgFn();

		//添加建筑物
		_this.widgetsFn();

		//碰撞边界层
		_this.hitSideFn();

		//添加倒计时时间
		_this.timeFn();
		
		//初始时间
		_this.startTime = new Date().getTime();

	},
	widgetsFn: function(){

        var _this = this;
		
		//右上第一个建筑物
        _this.widgetsLayer1 = new LSprite();
		_this.widgetsBit1 = new LBitmap(new LBitmapData(imglist["widgets"]));
		_this.widgetsBit1.bitmapData.setCoordinate(0, 0);
		_this.widgetsBit1.bitmapData.width = 130;
		_this.widgetsBit1.bitmapData.height = 130;
		_this.widgetsLayer1.addChild(_this.widgetsBit1);
		_this.widgetsLayer1.x = 320;
		_this.widgetsLayer1.y = 60;
        _this.gameLayer.addChild(_this.widgetsLayer1);

		//右上第一辆车
        _this.otherCarLayer1 = new LSprite();
		_this.otherCarBit1 = new LBitmap(new LBitmapData(imglist["car2"]));
		_this.otherCarLayer1.addChild(_this.otherCarBit1);
		_this.otherCarLayer1.x = 313;
		_this.otherCarLayer1.y = 190;
        _this.gameLayer.addChild(_this.otherCarLayer1);

		//右上第2辆车
        _this.otherCarLayer2 = new LSprite();
		_this.otherCarBit2 = new LBitmap(new LBitmapData(imglist["car1"]));
		_this.otherCarLayer2.addChild(_this.otherCarBit2);
		_this.otherCarLayer2.x = 313;
		_this.otherCarLayer2.y = 290;
        _this.gameLayer.addChild(_this.otherCarLayer2);
		
		//右上第2个建筑物
        _this.widgetsLayer2 = new LSprite();
		_this.widgetsBit2 = new LBitmap(new LBitmapData(imglist["widgets"]));
		_this.widgetsBit2.bitmapData.setCoordinate(130, 130);
		_this.widgetsBit2.bitmapData.width = 130;
		_this.widgetsBit2.bitmapData.height = 130;
		_this.widgetsLayer2.addChild(_this.widgetsBit2);
		_this.widgetsLayer2.x = 313;
		_this.widgetsLayer2.y = 405;
        _this.gameLayer.addChild(_this.widgetsLayer2);

		//左上第一辆车
        _this.otherCarLayer3 = new LSprite();
		_this.otherCarBit3 = new LBitmap(new LBitmapData(imglist["car1"]));
		_this.otherCarLayer3.addChild(_this.otherCarBit3);
		_this.otherCarLayer3.rotate = 180;
		_this.otherCarLayer3.x = 161;
		_this.otherCarLayer3.y = 400;
        _this.gameLayer.addChild(_this.otherCarLayer3);
		
		//左上第一个建筑物
        _this.widgetsLayer3 = new LSprite();
		_this.widgetsBit3 = new LBitmap(new LBitmapData(imglist["widgets"]));
		_this.widgetsBit3.bitmapData.setCoordinate(0, 0);
		_this.widgetsBit3.bitmapData.width = 130;
		_this.widgetsBit3.bitmapData.height = 130;
		_this.widgetsLayer3.addChild(_this.widgetsBit3);
		_this.widgetsLayer3.x = 35;
		_this.widgetsLayer3.y = 160;
        _this.gameLayer.addChild(_this.widgetsLayer3);

	},
	hitSideFn: function(){

        var _this = this;
		
		//左边边界
        _this.hitSideLeftLayer = new LSprite();
		_this.hitSideLeftLayer.addChild(new LBitmap(new LBitmapData(imglist["hitLRSide"])));
        _this.gameLayer.addChild(_this.hitSideLeftLayer);

		//右边边界
        _this.hitSideRightLayer = new LSprite();
		_this.hitSideRightLayer.addChild(new LBitmap(new LBitmapData(imglist["hitLRSide"])));
		_this.hitSideRightLayer.x = LGlobal.width - 14;
        _this.gameLayer.addChild(_this.hitSideRightLayer);

		//上边边界
        _this.hitSideTopLayer = new LSprite();
		_this.hitSideTopLayer.addChild(new LBitmap(new LBitmapData(imglist["hitTBSide"])));
        _this.gameLayer.addChild(_this.hitSideTopLayer);

		//下边边界
        _this.hitSideBottomLayer = new LSprite();
		_this.hitSideBottomLayer.addChild(new LBitmap(new LBitmapData(imglist["hitTBSide"])));
		_this.hitSideBottomLayer.y = LGlobal.height - 14;
        _this.gameLayer.addChild(_this.hitSideBottomLayer);

	},
	throttleFn: function(){

        var _this = this;
		
        _this.throttleBtnTopLayer = new LSprite();
		_this.throttleBtnTopLayer.addChild(new LBitmap(new LBitmapData(imglist["throttleBtnTop"])));
		_this.throttleBtnTopLayer.x = 30;
		_this.throttleBtnTopLayer.y = 450;
        _this.gameLayer.addChild(_this.throttleBtnTopLayer);
		
        _this.throttleBtnBotLayer = new LSprite();
		_this.throttleBtnBotLayer.addChild(new LBitmap(new LBitmapData(imglist["throttleBtnBot"])));
		_this.throttleBtnBotLayer.x = 30;
		_this.throttleBtnBotLayer.y = 650;
        _this.gameLayer.addChild(_this.throttleBtnBotLayer);
		
		//添加油门向上按钮事件
		_this.throttleBtnTopLayer.addEventListener(LMouseEvent.MOUSE_DOWN, $.proxy(_this.throttleBtnTopDowm, _this));
		_this.throttleBtnTopLayer.addEventListener(LMouseEvent.MOUSE_UP, $.proxy(_this.throttleBtnTopUp, _this));

		//添加油门向下按钮事件
		_this.throttleBtnBotLayer.addEventListener(LMouseEvent.MOUSE_DOWN, $.proxy(_this.throttleBtnBotDowm, _this));
		_this.throttleBtnBotLayer.addEventListener(LMouseEvent.MOUSE_UP, $.proxy(_this.throttleBtnBotUp, _this));


	},
	throttleBtnTopDowm: function(){//上按钮

        var _this = this;
		_this.carLayer.dirFB = "f";

	},
	throttleBtnTopUp: function(){//上按钮

        var _this = this;

		_this.carLayer.dirFB = "";
		
		//改变方向以后重置
		_this.reSet();

	},
	throttleBtnBotDowm: function(){//下按钮

        var _this = this;

		_this.carLayer.dirFB = "b";
		
	},
	throttleBtnBotUp: function(){ //下按钮

        var _this = this;

		_this.carLayer.dirFB = "";
		
		//改变方向以后重置
		_this.reSet();

	},
	steeringBgFn: function(){

        var _this = this;
		
		//左右方向背景
        _this.steeringBgLayer = new LSprite();
		_this.steeringBgLayer.addChild(new LBitmap(new LBitmapData(imglist["steering_pilot"])));
		_this.steeringBgLayer.x = 200;
		_this.steeringBgLayer.y = 642;
        _this.gameLayer.addChild(_this.steeringBgLayer);
		
		//左右方向检测碰撞区块
        _this.steeringAreaLayer = new LSprite();
        _this.steeringAreaLBitmap = new LBitmap(new LBitmapData(imglist["steeringArea"]));
		_this.steeringAreaLBitmap.bitmapData.width = 12;
		_this.steeringAreaLBitmap.bitmapData.height = 25;
		_this.steeringAreaLayer.addChild(_this.steeringAreaLBitmap);
		_this.steeringAreaLayer.x = _this.steeringAreaLayerX + 80;
		_this.steeringAreaLayer.y = 645;
        _this.gameLayer.addChild(_this.steeringAreaLayer);
		
		//左右方向检测运动碰撞区块
        _this.sAreaMoveLayer = new LSprite();
        _this.sAreaMoveLBitmap = new LBitmap(new LBitmapData(imglist["steeringArea"]));
		_this.sAreaMoveLBitmap.bitmapData.setCoordinate(12, 0);
		_this.sAreaMoveLBitmap.bitmapData.width = 12;
		_this.sAreaMoveLBitmap.bitmapData.height = 25;
		_this.sAreaMoveLayer.addChild(_this.sAreaMoveLBitmap);
		_this.sAreaMoveLayer.x = _this.steeringAreaLayerX + 80;
		_this.sAreaMoveLayer.y = 645;
        _this.gameLayer.addChild(_this.sAreaMoveLayer);
		
		//左右方向键
        _this.steeringLayer = new LSprite();
		_this.steeringLayer.addChild(new LBitmap(new LBitmapData(imglist["steering"])));
		_this.steeringLayer.x = _this.steeringLayerX + 75;
		_this.steeringLayer.y = 632;
        _this.gameLayer.addChild(_this.steeringLayer);

		//添加油门向下按钮事件
		_this.steeringLayer.addEventListener(LMouseEvent.MOUSE_DOWN, $.proxy(_this.steeringDowm, _this));
		_this.gameLayer.addEventListener(LMouseEvent.MOUSE_MOVE, $.proxy(_this.steeringMove, _this));
		_this.gameLayer.addEventListener(LMouseEvent.MOUSE_UP, $.proxy(_this.steeringUp, _this));

	},
	steeringDowm: function(e){

        var _this = this;
		
		//获取参照坐标
		_this.steering.oldX = e.offsetX;
		_this.bSteeringMove = true;
		
		if(_this.firstDirUp){
			_this.firstDirUp = false;
		}else{
			_this.reSet(true);
		}
	
	},
	steeringMove: function(e){
		
		//如果不能滑动
		if(!this.bSteeringMove){return;}

        var _this = this,
			steeringPos =  e.offsetX - _this.steering.oldX;
		
		if(_this.carLayer.wheelL.rotate >= 135){
			_this.carLayer.wheelL.rotate = 135;
			_this.carLayer.wheelR.rotate = 135;
		}else if(_this.carLayer.wheelL.rotate <= 45){
			_this.carLayer.wheelL.rotate = 45;
			_this.carLayer.wheelR.rotate = 45;
		}
		
		if(LGlobal.hitTest(_this.steeringAreaLayer,_this.sAreaMoveLayer)){
			_this.carLayer.wheelL.rotate = _this.carLayer.wheelR.rotate = 90;
		}else{
			_this.carLayer.wheelL.rotate += steeringPos;
			_this.carLayer.wheelR.rotate += steeringPos;
		}
		
		//更新x轴移动距离
		_this.steeringLayer.x += steeringPos;
		_this.sAreaMoveLayer.x += steeringPos;
		_this.steering.oldX = e.offsetX;

		if(_this.steeringLayer.x > 145 + _this.steeringLayerX) {
			_this.steeringLayer.x = 145 + _this.steeringLayerX;
			_this.sAreaMoveLayer.x = 150 + _this.steeringAreaLayerX;
		}else if(_this.steeringLayer.x < _this.steeringLayerX){
			_this.steeringLayer.x = _this.steeringLayerX;
			_this.sAreaMoveLayer.x = _this.steeringAreaLayerX + 5;
		}else{
			if(steeringPos != 0){	//如果方向盘移动距离不等于0，证明移动了
				_this.steering.aChangeR += steeringPos;
				//可以开启抬起开关
				bIsMove = true;
				if(steeringPos<0){
					bLeft = true;
				}else if(steeringPos>0){
					bRight = true;
				}

			}
		}
		

	},
	steeringUp: function(){

        var _this = this;
		
		_this.bSteeringMove = false;

		if(bIsMove){
			bIsMove = false;

			//方向盘左右切换
			if(_this.carLayer.wheelR.rotate>90){
				
				if(bRight){
					bRight = false;
					bLeft = true;
			
					_this.carLayer.shadow.bitmapData.setCoordinate(60, 0);
					_this.carLayer.car.bitmapData.setCoordinate(60, 0);
					_this.carLayer.carChild.x = _this.steering.aChangeR;
					_this.carLayer.carChild.y = -30;
					_this.carLayer.rotate += 180;

					_this.carLayer.x -= Tool.oMath.cos(Tool.toRad(_this.carLayer.rotate))* (_this.carW + _this.steering.aChangeR);

					_this.carLayer.y -= Tool.oMath.sin(Tool.toRad(_this.carLayer.rotate))* (_this.carW + _this.steering.aChangeR);

					_this.carLayer.wheelR.y = _this.carLayer.wheelL.y = 100;

				}
			}else if(_this.carLayer.wheelR.rotate<90){
				if(bLeft){
					bLeft = false;
					bRight = true;

					_this.carLayer.shadow.bitmapData.setCoordinate(0, 0);
					_this.carLayer.car.bitmapData.setCoordinate(0, 0);
					_this.carLayer.carChild.x = - _this.steering.aChangeR;
					_this.carLayer.carChild.y = -100;
					
					_this.carLayer.x += Tool.oMath.cos(Tool.toRad(_this.carLayer.rotate))*_this.steering.aChangeR;
					_this.carLayer.y += Tool.oMath.sin(Tool.toRad(_this.carLayer.rotate))*_this.steering.aChangeR;

					_this.carLayer.wheelR.y = _this.carLayer.wheelL.y = 20;
					
				}
			}

		}

	},
	reSet: function(btn){
		/*
			btn: true 的时候，是改变方向之后没有前进的错位bug修复
		*/
        var _this = this,
			oPos = {
				x: _this.carLayer.x,
				y: _this.carLayer.y,
				oR: _this.carLayer.rotate,
				oCR: _this.carLayer.wheelL.rotate,
				g: _this
			};
		
        _this.carRadiusLayer.removeChild(_this.carLayer);
		
		if(oPos.oCR > 90){
			_this.carLayer = new Car({
				oX: oPos.x + Tool.oMath.cos(Tool.toRad(_this.carLayer.rotate))* (_this.carW + _this.steering.aChangeR),
				oY: oPos.y + Tool.oMath.sin(Tool.toRad(_this.carLayer.rotate))* (_this.carW + _this.steering.aChangeR ),
				oR: oPos.oR - 180,
				oCR: 90,
				g: oPos.g
			});
		}else{
			_this.carLayer = new Car({
				oX: oPos.x - Tool.oMath.cos(Tool.toRad(_this.carLayer.rotate))*_this.steering.aChangeR,
				oY: oPos.y - Tool.oMath.sin(Tool.toRad(_this.carLayer.rotate))*_this.steering.aChangeR,
				oR: oPos.oR,
				oCR: 90,
				g: oPos.g
			});
		}
        _this.carRadiusLayer.addChild(_this.carLayer);
		
		if(!btn){
			//方向盘各种重置
			_this.carLayer.wheelR.rotate = _this.carLayer.wheelL.rotate = 90;
			_this.steeringAreaLayer.x = _this.steeringAreaLayerX + 80;
			_this.sAreaMoveLayer.x = _this.steeringAreaLayerX + 80;
			_this.steeringLayer.x = _this.steeringLayerX + 75;
			_this.steering.aChangeR = 0;
		}

	},
	carFn: function (){

        var _this = this;

        _this.carLayer = new Car({
			oX: 410,
			oY: 610,
			oR: 270,
			oCR: 90,
			g: _this
		});
        _this.carRadiusLayer.addChild(_this.carLayer);
		
	},
	parkRoomFn: function(){

        var _this = this;
        _this.parkRoomLayer = new LSprite();
		_this.parkRoomLayer.addChild(new LBitmap(new LBitmapData(imglist["parkRoom"])));
		_this.parkRoomLayer.x = 213;//313;
		_this.parkRoomLayer.y = 130;
		_this.parkRoomLayer.rotate = 180;
        _this.gameLayer.addChild(_this.parkRoomLayer);

	},
	timeFn: function(){

        var _this = this;
		
		_this.times = new LTextField();
		_this.times.color = "#ffffff";
		_this.times.font = "HG行書体";
		_this.times.size = 16;
		_this.times.x = 380;
		_this.times.y = 30;
		_this.times.text = "0" + _this.gameTime + ":00";
		_this.gameLayer.addChild(_this.times);

		_this.diffFn(_this.gameTime * 60 - 1);

	},
	diffFn: function (intDiff){

        var _this = this,
			day=0,
			hour=0,
			minute=0,
			second=0;//时间默认值		

		_this.oTim = setInterval(function(){
			if(intDiff > 0){
				day = Math.floor(intDiff / (60 * 60 * 24));
				hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
				minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
				second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
			}
			if (minute <= 9) minute = '0' + minute;
			if (second <= 9) second = '0' + second;
			
			if(intDiff < 0){
				
				clearInterval(_this.oTim);
				_this.times.text = "00:00";
				_this.bLose = true;

			}else{
				
				_this.times.text = minute + ":" + second;
				intDiff--;

			}

		}, 1000);
	},
	gameOverFn: function(oImg){

        var _this = this;
	
		clearInterval(_this.oTim);

        _this.startLayer = new LSprite();
        _this.gameLayer.addChild(_this.startLayer);

        _this.gameOverLayer = new LSprite();
		_this.gameOverLayer.graphics.drawRect(0,"#000000",[0, 0, LGlobal.width, LGlobal.height],true,"#000000");
		_this.gameOverLayer.alpha = 0.8;
        _this.startLayer.addChild(_this.gameOverLayer);


        _this.gameOverBtnLayer = new LSprite();
		_this.gameOverBtnLayer.addChild(new LBitmap(new LBitmapData(imglist[oImg])));
		_this.gameOverBtnLayer.x = Tool.sc({w:120}).x;
		_this.gameOverBtnLayer.y = 350;
        _this.startLayer.addChild(_this.gameOverBtnLayer);
		
        _this.restartBtnLayer = new LSprite();
		_this.restartBtnLayer.addChild(new LBitmap(new LBitmapData(imglist["restart"])));
		_this.restartBtnLayer.x = Tool.sc({w:120}).x;
		_this.restartBtnLayer.y = 380;
        _this.startLayer.addChild(_this.restartBtnLayer);
		
		//添加游戏按下
		_this.restartBtnLayer.addEventListener(LMouseEvent.MOUSE_DOWN, function (event) {

			_this.gameLayer.removeChild(_this.startLayer);
			_this.gameLayer.removeChild(_this.gameOverBtnLayer);
			_this.gameLayer.removeChild(_this.restartBtnLayer);
			
			_this.steering.aChangeR = 0;

			if(oImg == "gameover" || oImg == "win"){
				_this.gameLayer.removeAllChild();
			}
			
			_this.bStart = true;

			_this.gameFn();

		});

	}
};

