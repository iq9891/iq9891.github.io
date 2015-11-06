var game = {
	myData: {
		oRopePos: {	//绳子的数据
			x: 300,
			y: 0
		},
		oSteel: {	//刚体的数据
			n: 23,	//动态刚体个数
			r: 15	//刚体半径10
		},
		oBlock: {	//障碍物数据
			minW: 50,
			maxW: 130,
			minY: 320,
			maxY: 620,
			h: LGlobal.height,
			topMove: 100,
			minGap: 50,
			maxGap: 130 * 2,
			firstX: 50,
			bApplyForce: true,	//是否允许添加向量
			iForce: 50,			//添加向量的力
			iCloud: 1,			//风力
			iApplyForceDir:0,		//摇摆方向
			iApplyForce:0,		//每隔长时间添加向量
			iApplyForceStep: 100	//添加向量的间隔时间数
		},
		iSorce: 0,		//分数
		oImgData: {w: 61, h: 62},	//玩家1张图片大小
		aLineList: [],	//存储线刚体的数组,
		aBlockList: [],	//存储障碍物的数组
		aBodyList: [],	//存储障碍物刚体的数组 
		bCanAwake: false,	//是否可以检查刚体的静止状态
		bCanOneAwake: false,	//是否可以检查刚体的静止状态（落到起始地点）
		canDown: true	//可以点击
	},
    start: function () {

        var _this = this;

        _this.allLayer = new LSprite();
        onFrameLayer.addChild(_this.allLayer);
		
		//添加开始界面
		_this.startFn(imglist["name"], imglist["start"]);

    },
	startFn: function(oImgA, oImgB, bRestart){

		var _this = this;
		

        _this.startLayer = new LSprite();
		_this.startLayer.graphics.drawRect(0,"",[0,0,LGlobal.width,LGlobal.height],true);
        _this.allLayer.addChild(_this.startLayer);	

		if(bRestart){
			_this.scoreLayer = new LSprite();
			_this.scoreLayer.x = LGlobal.width / 2;
			_this.startLayer.addChild(_this.scoreLayer);
			_this.score = new LTextField();
			_this.score.color = "#ffffff";
			_this.score.font = "HG行書体";
			_this.score.size = 16;
			_this.score.textAlign = "center";
			_this.score.y = 350;
			_this.score.text = "登顶" + _this.myData.iSorce + "次";;
			_this.scoreLayer.addChild(_this.score);

			_this.gameLayer.die();
			_this.gameLayer.remove();

			//删除绳子层
			_this.gameLayer.graphics.clear();
			_this.myData.aLineList.length = 0;
			_this.steelAllLayer.remove();


		}		

        _this.nameLayer = new LSprite();
		_this.nameLayer.addChild(new LBitmap(new LBitmapData( oImgA )));
		_this.nameLayer.x =  Tool.sc({w:120}).x;

		if(bRestart){
			_this.nameLayer.y =  250;
		}else{
			_this.nameLayer.y =  350;
		}
        _this.startLayer.addChild(_this.nameLayer);	

        _this.btnLayer = new LSprite();
		_this.btnLayer.addChild(new LBitmap(new LBitmapData( oImgB )));
		_this.btnLayer.x =  Tool.sc({w:120}).x;
		_this.btnLayer.y =  400;
        _this.startLayer.addChild(_this.btnLayer);	
	

		//添加开始游戏点击事件
		_this.btnLayer.addEventListener(LMouseEvent.MOUSE_UP, function(event){
			
			_this.allLayer.removeChild(_this.startLayer);

			//进入游戏页面
			_this.gameFn();

			//开始游戏按钮
			startAllBtn = true;

		});


	},
	gameFn: function(){

        var _this = this;
		
        _this.gameLayer = new LSprite();
        _this.allLayer.addChild(_this.gameLayer);
		
        _this.bgLayer = new LSprite();
		
		_this.bgLayer.graphics.drawRect(0,"",[0,0,LGlobal.width,LGlobal.height],true,"#cccccc");
		_this.bgLayer.alpha = 0.2;
        _this.gameLayer.addChild(_this.bgLayer);

		//添加障碍物
		_this.addBlockFn();

		//添加点击事件层
		_this.clickFullFn();

		//创建边界墙
		_this.wallFn();
		
	},
	wallFn: function(){

        var _this = this;
		
		//左墙
		_this.wallLayer =  new LSprite();
		_this.wallLayer.nameHit = 'wall';
		_this.wallLayer.graphics.drawRect(0,"#000000",[ 0, 0, 10, LGlobal.height],false,"#ff0000");
		_this.wallLayer.x = - _this.myData.oImgData.w;
		_this.wallLayer.y = LGlobal.height * 0.5;
        _this.gameLayer.addChild(_this.wallLayer);

		//添加动态刚体
		_this.wallLayer.addBodyPolygon(10, LGlobal.height, 0); 

		
		//右墙
		_this.wallLayer =  new LSprite();
		_this.wallLayer.nameHit = 'wall';
		_this.wallLayer.graphics.drawRect(0,"#000000",[ 0, 0, 10, LGlobal.height],false,"#ff0000");
		_this.wallLayer.x = LGlobal.width + _this.myData.oImgData.w;
		_this.wallLayer.y = LGlobal.height * 0.5;
        _this.gameLayer.addChild(_this.wallLayer);

		//添加动态刚体
		_this.wallLayer.addBodyPolygon(10, LGlobal.height, 0); 
		
		//上墙
		_this.wallLayer =  new LSprite();
		_this.wallLayer.nameHit = 'wall';
		_this.wallLayer.graphics.drawRect(0,"#000000",[ 0, 0, LGlobal.width, 10],false,"#ff0000");
		_this.wallLayer.x = LGlobal.width * 0.5;
		_this.wallLayer.y = -_this.myData.oImgData.h;
        _this.gameLayer.addChild(_this.wallLayer);

		//添加动态刚体
		_this.wallLayer.addBodyPolygon(LGlobal.width, 10, 0); 
		
		//下墙
		_this.wallLayer =  new LSprite();
		_this.wallLayer.nameHit = 'wall';
		_this.wallLayer.graphics.drawRect(0,"#000000",[ 0, 0, LGlobal.width, 10],false,"#ff0000");
		_this.wallLayer.x = LGlobal.width * 0.5;
		_this.wallLayer.y = LGlobal.height + _this.myData.oImgData.h;
        _this.gameLayer.addChild(_this.wallLayer);

		//添加动态刚体
		_this.wallLayer.addBodyPolygon(LGlobal.width, 10, 0); 

	},
	clickFullFn: function(){

        var _this = this;

		if(_this.clickFullLayer){
			_this.clickFullLayer.remove();
			_this.clickFullLayer.die();
		}

		//添加全屏点击事件层
        _this.clickFullLayer = new LSprite();
		_this.clickFullLayer.graphics.drawRect(0,"",[0,0,LGlobal.width,LGlobal.height],true,"#ffe0e0");
		_this.clickFullLayer.alpha = 0.5;
        _this.gameLayer.addChild(_this.clickFullLayer);
		_this.clickFullLayer.addEventListener(LMouseEvent.MOUSE_DOWN, $.proxy(_this.flyFn, _this));

	},
	addBlockFn: function(){
		
        var _this = this;
		
		_this.allBlockLayer =  new LSprite();
        _this.gameLayer.addChild(_this.allBlockLayer);

		
		_this.allBodyLayer =  new LSprite();
        _this.gameLayer.addChild(_this.allBodyLayer);
		
		_this.addFn(LGlobal.width - _this.myData.oBlock.minW, _this.myData.oBlock.minW, true);
		_this.addFn(_this.myData.oBlock.firstX, _this.myData.oBlock.maxW);
		
		_this.bodyFn(LGlobal.width - _this.myData.oBlock.minW, _this.myData.oBlock.minW, 1, true);
		_this.bodyFn(_this.myData.oBlock.firstX, _this.myData.oBlock.maxW, 2);

	},
	flyFn: function(){
		
        var _this = this;
			
		//将玩家和绳子刚体脱离
		LGlobal.box2d.world.DestroyJoint(_this.playerBox2dBody);

		//播放脱离飞越的动画
		_this.playerLayer.gotoAndStop("four");
		
		
		LTweenLite.to(_this.playerLayer,0.2,{
			x: 0
		});
		
		_this.playerLayer.y = -_this.myData.oImgData.h * 0.5;
		
		
		//刚体碰撞检测
		LGlobal.box2d.setEvent(LEvent.BEGIN_CONTACT,beginContact); 

		function beginContact(contact){
			
			if(contact.GetFixtureA().GetBody().GetUserData().nameHit == "player" && contact.GetFixtureB().GetBody().GetUserData().nameHit == "body"){
				//console.log(contact.GetFixtureB().GetBody().GetUserData().aIndex);
				if(contact.GetFixtureB().GetBody().GetUserData().aIndex == 2){
					
					//开始检测静止状态
					_this.myData.bCanAwake = true;
				
				}else{

					//开始检测静止状态
					_this.myData.bCanOneAwake = true;
						

				}
			} 
			if(contact.GetFixtureA().GetBody().GetUserData().nameHit == "player" && contact.GetFixtureB().GetBody().GetUserData().nameHit == "wall"){
				console.log(9999999);
				//开始检测静止状态
				_this.myData.bCanAwake = false;

				//开始检测静止状态
				_this.myData.bCanOneAwake = false;

				//添加结束界面
				_this.startFn(imglist["gameover"], imglist["reStart"],true);
			} 
		};  
		
		
	},
	nextBlockFn: function(){
		
        var _this = this;
		
			_this.moveBlockFn();

		//if(_this.myData.canDown){

			//_this.myData.canDown = false;
			
			//_this.moveBlockFn();

		//}

	},
	moveBlockFn: function(){

        var _this = this,
			iRandW = Tool.rand(_this.myData.oBlock.minW,_this.myData.oBlock.maxW);

		_this.iPrevX = _this.allBlockLayer.childList[0].x; //LGlobal.width - _this.allBlockLayer.childList[1].w;
		_this.iPrevY = _this.allBlockLayer.childList[1].y - _this.myData.oBlock.topMove;

		LTweenLite.to(_this.allBlockLayer.childList[1],0.5,{
			x: _this.iPrevX,
			y: _this.iPrevY,
			ease: LEasing.Sine.easeInOut,
			onComplete: function(){
				
				var iNewX = Tool.rand(0,_this.iPrevX - iRandW);

				_this.addFn(iNewX,iRandW);
				_this.bodyFn(iNewX,iRandW, 2);

				_this.bodyFn(_this.iPrevX,_this.myData.aBlockList[0].w, 1, true);
				
				//添加点击事件层
				_this.clickFullFn();
				
				//更新分数
				_this.fen.text = "登顶" + ++_this.myData.iSorce + "次";

			}
		});

		_this.myData.aBlockList[0].remove();
		_this.myData.aBlockList.shift();
		_this.myData.aBodyList[0].remove();
		_this.myData.aBodyList[1].remove();
		_this.myData.aBodyList.length = 0;

	},
	addFn: function(aX, aW, bIsFirst){
		
        var _this = this,
			blockY = _this.myData.oBlock.maxY - _this.myData.oBlock.topMove * (bIsFirst? 2 : 1);
		
		_this.blockLayer =  new LSprite();
		_this.blockLayer.graphics.drawRect(1,"#000000",[ 0, 0, aW, _this.myData.oBlock.h],false,"#000000");
		_this.blockLayer.x = aX;
		_this.blockLayer.y = LGlobal.height;
		_this.blockLayer.w = aW;
		_this.blockLayer.h = _this.myData.oBlock.h;
        _this.allBlockLayer.addChild(_this.blockLayer);
		_this.myData.aBlockList.push(_this.blockLayer);

		LTweenLite.to(_this.blockLayer,0.5,{
			y: blockY,
			ease: LEasing.Sine.easeInOut,
			onComplete: function(){
				//_this.myData.canDown = true;

				if(bIsFirst){		//第一次开始的时候障碍物向上停止动画

					//添加通知动画
					_this.noticeFn();

				}
			}
		});

	},
	bodyFn: function(aX, aW, aIndex, bIsFirst){	//添加障碍物刚体
		
        var _this = this,
			blockY = _this.myData.oBlock.maxY - _this.myData.oBlock.topMove * (bIsFirst? 2 : 1);

		_this.bodyLayer =  new LSprite();
		_this.bodyLayer.nameHit = 'body';
		_this.bodyLayer.aIndex = aIndex;
		_this.bodyLayer.graphics.drawRect(0,"#000000",[ 0, 0, aW, LGlobal.height - blockY],false,"#ff0000");
		_this.bodyLayer.x = aX + aW * 0.5;
		_this.bodyLayer.alpha = 0.3;
		_this.bodyLayer.y = blockY + (LGlobal.height - blockY) * 0.5;
        _this.allBodyLayer.addChild(_this.bodyLayer);
		_this.myData.aBodyList.push(_this.bodyLayer);

		//添加动态刚体
		_this.bodyLayer.addBodyPolygon(aW, LGlobal.height - blockY, 0); 

	},
	noticeFn: function(){

        var _this = this;

        _this.noticeLayer = new LSprite();
		_this.noticeLayer.addChild(new LBitmap(new LBitmapData(imglist["notice"])));

		_this.noticeLayer.x = _this.myData.oBlock.firstX;
		_this.noticeLayer.alpha = 0;
		_this.noticeLayer.y = _this.myData.oBlock.maxY - _this.myData.oBlock.topMove - 80;
        _this.gameLayer.addChild(_this.noticeLayer);
		
		//提示动画
		LTweenLite.to(_this.noticeLayer,0.2,{
			alpha: 1
		}).to(_this.noticeLayer,0.2,{
			alpha: 0
		}).to(_this.noticeLayer,0.1,{
			alpha: 1
		}).to(_this.noticeLayer,0.1,{
			alpha: 0
		}).to(_this.noticeLayer,0.05,{
			alpha: 1,
			onComplete: function(){		//真正游戏开始

				//隐藏提示
				_this.noticeLayer.remove();
				
				//添加新的小人，及秋千动画
				_this.playMoveFn();

				//添加分数计数
				_this.addFenFn();
				
			}
		});

	},
	playerFn: function(iPx, iPy){
		
        var _this = this;
		
		_this.playerPareLayer = new LSprite();
		_this.playerPareLayer.nameHit = 'player';
		_this.playerPareLayer.x = iPx; //Tool.sc({w: 41}).x;
		_this.playerPareLayer.y = iPy - _this.myData.oImgData.h; //310;
        _this.gameLayer.addChild(_this.playerPareLayer);
		
		var list = LGlobal.divideCoordinate(976,308, 5, 16);
		var data = new LBitmapData(imglist["player"],0,0, _this.myData.oImgData.w, _this.myData.oImgData.h);

		_this.playerLayer = new Player({
			d: data,
			l: list,
		});

		_this.playerLayer.speed = 3;
		//图片错位
		//_this.playerLayer.x = -20; //Tool.sc({w: 41}).x;
		//_this.playerLayer.y = -50; //310;
		_this.playerPareLayer.addChild(_this.playerLayer);
		_this.playerLayer.gotoAndStop("two");

	},
	addPlayerBodyFn: function(){

        var _this = this;

		//添加玩家动态刚体
		_this.playerPareLayer.addBodyPolygon(38, _this.myData.oImgData.h * 0.5, 1,0.5,0.5,0.0000001); 
		
		//让玩家和绳子刚体链接到一起
		_this.playerBox2dBody = LGlobal.box2d.setRevoluteJoint(_this.steelLayer.box2dBody, _this.playerPareLayer.box2dBody);

	},
	playMoveFn: function(){

        var _this = this;

		//添加玩家
		_this.playerFn(LGlobal.width - _this.myData.oBlock.minW, _this.myData.oBlock.maxY - _this.myData.oBlock.topMove * 2);

		//添加绳子
		_this.ropeAddFn();

		//添加玩家动态刚体
		_this.addPlayerBodyFn();
		
		//让小人窜上绳子
		LTweenLite.to(_this.playerLayer,0.2,{
			x: -20,
			y: -50
		});

		//播放荡秋千动画
		_this.playerLayer.play();
		_this.playerLayer.speed = 10;
		_this.playerLayer.gotoAndPlay("three");
	},
	ropeAddFn: function(){

        var _this = this,
			aSi = 0;

		//创建绳子层 
		_this.steelAllLayer = new LSprite();
		_this.gameLayer.addChild(_this.steelAllLayer);

		//创建固定刚体
		_this.steelLayer = new LSprite();
		_this.steelLayer.x = _this.myData.oRopePos.x;
		_this.steelLayer.y = _this.myData.oRopePos.y;
		_this.steelAllLayer.addChild(_this.steelLayer);
		//添加刚体
		_this.steelLayer.addBodyCircle(10,0,0,0,1,10,0.2);
		//让刚体可鼠标操作
		_this.steelLayer.setBodyMouseJoint(true);

		_this.myData.aLineList.push(_this.steelLayer);

		//创建动态刚体
		for(aSi=0; aSi < _this.myData.oSteel.n; aSi++){
			_this.steelRanLayer = new LSprite();
			_this.steelRanLayer.x = _this.myData.oRopePos.x + aSi * _this.myData.oSteel.r * 0.4;
			_this.steelRanLayer.y = _this.myData.oRopePos.y + aSi * _this.myData.oSteel.r;
			_this.steelAllLayer.addChild(_this.steelRanLayer);
			//添加动态刚体
			_this.steelRanLayer.addBodyCircle(10,0,0,1,1,10,0.2);
			//让刚体链接到一起
			LGlobal.box2d.setRevoluteJoint(_this.steelLayer.box2dBody, _this.steelRanLayer.box2dBody );
			_this.myData.aLineList.push(_this.steelRanLayer);
			_this.steelLayer = _this.steelRanLayer;
		}
		

	},
	removeFn: function(){

        var _this = this;
		
		//播放脱离飞越的动画
		_this.playerLayer.play();
		_this.playerLayer.gotoAndStop("one");
	
		//删除绳子层
		_this.gameLayer.graphics.clear();
		_this.myData.aLineList.length = 0;
		_this.steelAllLayer.remove();

		//删除人物刚体
		_this.playerPareLayer.clearBody();

	},
	resetPlayerFn: function(){

        var _this = this;

		//删除之前的小人
		_this.playerPareLayer.remove();
		
		//添加新的小人，及秋千动画
		_this.playMoveFn();

	},
	addFenFn: function(){
		
        var _this = this;

		_this.fenLayer = new LSprite();
		_this.fenLayer.x = 100;
		_this.gameLayer.addChild(_this.fenLayer);
		_this.fen = new LTextField();
		_this.fen.color = "#000000";
		_this.fen.font = "HG行書体";
		_this.fen.size = 20;
		_this.fen.textAlign = "center";
		_this.fen.y = 30;
		_this.fen.text = "登顶0次";
		_this.fenLayer.addChild(_this.fen);

	}
};