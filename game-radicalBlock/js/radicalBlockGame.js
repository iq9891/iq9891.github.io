function Game(){
	var _this = this;
	base(_this,LSprite,[]);
	
	_this.bTruePlay = false;	//游戏真正的开关

	//是不是第一次点击
	_this.bOne = false;

	//分数
	_this.iScore = 0;

	_this.init();

};

var i  = {
	init: function(){

		var _this = this;
		
		_this.bg = new LSprite();
		_this.addChild(_this.bg);
		_this.spirit = new LSprite();
		_this.addChild(_this.spirit);
		_this.btn = new LSprite();
		_this.addChild(_this.btn);

		//添加背景
		_this.addBgFn();

		//添加玩法提示
		if(!localStorage.getItem('tips')){
			_this.bTruePlay = true;
			_this.addTipFn();
		}

		//添加游戏按钮
		_this.addhanleBtnFn();

		//添加分数
		_this.addScoreFn();

		//添加游戏的障碍格子
		_this.addItemFn(0,true);
		
	},
	addBgFn: function(){

		var _this = this;

		_this.gPlayBg1 = new LSprite();
		_this.gPlayBg1.addChild(new LBitmap(new LBitmapData(imglist["gbg"])));
		_this.bg.addChild(_this.gPlayBg1);

		_this.gPlayBg2 = new LSprite();
		_this.gPlayBg2.addChild(new LBitmap(new LBitmapData(imglist["gbg"])));
		_this.gPlayBg2.y = -1040;
		_this.bg.addChild(_this.gPlayBg2);
		
	},
	addTipFn: function(){

		var _this = this;

		_this.tip = new LSprite();
		_this.tipBit = new LBitmap(new LBitmapData(imglist["gameRes"],0,0,427,305));
		_this.tipBit.bitmapData.setCoordinate(446, 1386);
		_this.tip.addChild(_this.tipBit);
		_this.btn.addChild(_this.tip);
		_this.tip.x = 15;
		_this.tip.y = 1010;
		_this.tip.alpha = 0;
		_this.tip.rotate = -90;

		_this.tipLine = new LSprite();
		_this.tipLineBit = new LBitmap(new LBitmapData(imglist["gameRes"],0,0,86,404));
		_this.tipLineBit.bitmapData.setCoordinate(921, 365);
		_this.tipLine.addChild(_this.tipLineBit);
		_this.tip.addChild(_this.tipLine);
		_this.tipLine.x = 390;
		_this.tipLine.y = 118;

		_this.tipFont = new LSprite();
		_this.tipFontBit = new LBitmap(new LBitmapData(imglist["gameRes"],0,0,456,51));
		_this.tipFontBit.bitmapData.setCoordinate(0, 1233);
		_this.tipFont.addChild(_this.tipFontBit);
		_this.tip.addChild(_this.tipFont);
		_this.tipFont.x = 530;
		_this.tipFont.y = 115;
		_this.tipFont.rotate = 90;

		_this.tip.addEventListener(LMouseEvent.MOUSE_DOWN, function(){
			_this.tipRemoveFn();
		});
		
	},
	tipRemoveFn: function(){
		var _this = this;
		_this.tip.remove();
		_this.bOne = true;
		_this.bTruePlay = false;
		localStorage.setItem('tips',true);
	},
	addhanleBtnFn: function(){

		var _this = this;
		
		_this.hanleBtnLeft = new LSprite();
		_this.hanleBtnLeftBit = new LBitmap(new LBitmapData(imglist["gameRes"],0,0,150,160));
		_this.hanleBtnLeftBit.bitmapData.setCoordinate(780, 91);
		_this.hanleBtnLeft.addChild(_this.hanleBtnLeftBit);
		_this.btn.addChild(_this.hanleBtnLeft);
		_this.hanleBtnLeft.x = 88;
		_this.hanleBtnLeft.y = 739;
		_this.hanleBtnLeft.iNum = 0;
		_this.hanleBtnLeft.sState = 'on';
		_this.hanleBtnLeft.addEventListener(LMouseEvent.MOUSE_DOWN, function(){
			if(!_this.bOne&&!localStorage.getItem('tips')){
				_this.tipRemoveFn();
			}else{
				hanleBtnLeftDownUpFn(true);
			}
		});
		_this.hanleBtnLeft.addEventListener(LMouseEvent.MOUSE_UP, function(){
			hanleBtnLeftDownUpFn();
		});
		function hanleBtnLeftDownUpFn(bIsDown){
			if(bIsDown){//如果按下
				if(_this.hanleBtnLeft.sState){
					_this.hanleBtnLeftBit.bitmapData.setCoordinate(771, 251);
					_this.hanleBtnLeft.iNum = 1;
				}else{
					_this.hanleBtnLeftBit.bitmapData.setCoordinate(780, 91);
					_this.hanleBtnLeft.iNum = 0;
				}
			}else{
				if(_this.hanleBtnLeft.sState){
					_this.hanleBtnLeftBit.bitmapData.setCoordinate(780, 91);
					_this.hanleBtnLeft.iNum = 0;
				}else{
					_this.hanleBtnLeftBit.bitmapData.setCoordinate(771, 251);
					_this.hanleBtnLeft.iNum = 1;
				}
			}
		}
		
		_this.hanleBtnRight = new LSprite();
		_this.hanleBtnRightBit = new LBitmap(new LBitmapData(imglist["gameRes"],0,0,150,160));
		_this.hanleBtnRightBit.bitmapData.setCoordinate(771, 251);
		_this.hanleBtnRight.addChild(_this.hanleBtnRightBit);
		_this.btn.addChild(_this.hanleBtnRight);
		_this.hanleBtnRight.x = 408;
		_this.hanleBtnRight.y = 739;
		_this.hanleBtnRight.sState = '';
		_this.hanleBtnRight.iNum = 1;
		_this.hanleBtnRight.addEventListener(LMouseEvent.MOUSE_DOWN, function(){
			//第一次没点提示
			if(!_this.bOne){return;}
			hanleBtnRightDownUpFn(true);
		});
		_this.hanleBtnRight.addEventListener(LMouseEvent.MOUSE_UP, function(){
			hanleBtnRightDownUpFn();
		});
		function hanleBtnRightDownUpFn(bIsDown){
			if(bIsDown){//如果按下
				if(_this.hanleBtnRight.sState){
					_this.hanleBtnRightBit.bitmapData.setCoordinate(771, 251);
					_this.hanleBtnRight.iNum = 1;
				}else{
					_this.hanleBtnRightBit.bitmapData.setCoordinate(780, 91);
					_this.hanleBtnRight.iNum = 0;
				}
			}else{
				if(_this.hanleBtnRight.sState){
					_this.hanleBtnRightBit.bitmapData.setCoordinate(780, 91);
					_this.hanleBtnRight.iNum = 0;
				}else{
					_this.hanleBtnRightBit.bitmapData.setCoordinate(771, 251);
					_this.hanleBtnRight.iNum = 1;
				}
			}
		}

	},
	addItemFn: function(iNum,bOne){

		var _this = this,
			aTemX = [5,320];
		
		_this.item = new LSprite();
		_this.itemBit = new LBitmap(new LBitmapData(imglist["gameRes"],0,0,134,308));
		//iNum == 0粉色
		_this.itemBit.bitmapData.setCoordinate(771, (iNum == 0)?411:719);
		
		_this.item.addChild(_this.itemBit);
		_this.spirit.addChild(_this.item);
		_this.item.x = bOne?5:aTemX[randomNum(0,1)];
		_this.item.y = 0;
		_this.item.sState = '';
		_this.item.iNum = iNum;
		_this.item.rotate = -90;
		
		if(bOne){
			LTweenLite.to(_this.item,0.5,{
				y:339,
				onComplete: function(){
					if(_this.bTruePlay){
						LTweenLite.to(_this.tip,0.5,{
							alpha:1,
							onComplete: function(){
								
							}
						});
					}
				}
			});
		}
		
	},
	itemRunFn: function(){

		var _this = this,
			iTemI = 0,
			iTemLen = _this.spirit.childList.length;
		
		for (iTemI=0; iTemI<iTemLen; iTemI++) {
			_this.spirit.childList[iTemI].y += iTemSpeed;
			
			if(_this.hanleBtnLeft.hitTestObject(_this.spirit.childList[iTemI])){
				if(_this.hanleBtnLeft.iNum == _this.spirit.childList[iTemI].iNum){
					_this.spirit.childList[iTemI].sState = '删除';
					game.iScore++;
					_this.scoreFont.text = game.iScore;
				}else{
					overFn();
				}
			}
			if(_this.hanleBtnRight.hitTestObject(_this.spirit.childList[iTemI])){
				if(_this.hanleBtnRight.iNum == _this.spirit.childList[iTemI].iNum){
					_this.spirit.childList[iTemI].sState = '删除';
					game.iScore++;
					_this.scoreFont.text = game.iScore;
				}else{
					overFn();
				}
			}
		}
		for (iTemI=0; iTemI<iTemLen; iTemI++) {
			if(_this.spirit.childList[iTemI]&&_this.spirit.childList[iTemI].sState){
				_this.spirit.childList[iTemI].remove();
			}
		}
		
	},
	addScoreFn:function(){

		var _this = this;

		_this.scoreBg = new LSprite();
		_this.scoreBgBit = new LBitmap(new LBitmapData(imglist["gameRes"],0,0,113,557));
		_this.scoreBgBit.bitmapData.setCoordinate(911, 769);
		_this.scoreBg.addChild(_this.scoreBgBit);
		_this.btn.addChild(_this.scoreBg);
		_this.scoreBg.x = (LGlobal.width-557)/2;
		_this.scoreBg.y = 110;
		_this.scoreBg.rotate = -90;
		
		_this.score = new LSprite();
		_this.score.x = 95;
		_this.score.y = LGlobal.width/2-40;
		_this.scoreBg.addChild(_this.score);
		
		_this.scoreFont = new LTextField();
		_this.scoreFont.color = "#ffffff";
		_this.scoreFont.font = "HG行書体";
		_this.scoreFont.size = 60;
		_this.scoreFont.textAlign  = "center";
		_this.scoreFont.text = _this.iScore;
		_this.scoreFont.rotate = 90;
		_this.score.addChild(_this.scoreFont);

	}
};

for(var k in i)Game.prototype[k] = i[k];