/*
 * Created with EditPlus.
 * User: leemagnum
 * Date: 14-11-21
 * Time: 12:00
 * 游戏主对象.
*/
function Game(){

	var _this = this;

	base(_this,LSprite,[]);

	_this.aW = [];
	
	_this.iMoveNum = 0;

	_this.bClick = true;

	_this.init();

};


var g = {
	init: function(){

		var _this = this;

		_this.iOneW = fMfloor(oMathRan() * iAllNum.pillarMaxX + iAllNum.pillarMinX);
		
		_this.allBg = new LSprite();
		_this.addChild(_this.allBg);
		_this.flow = new LSprite();
		_this.addChild(_this.flow);
		_this.allElf = new LSprite();
		_this.allElf.x = (LGlobal.width - _this.iOneW) * 0.5;
		_this.allElf.y = 100;
		_this.addChild(_this.allElf);
		_this.allPillar = new LSprite();
		_this.allElf.addChild(_this.allPillar);
		//console.log(iOneW);
		//添加背景
		_this.addBgFn();

		//添加开始按钮
		_this.addStartFn();

		//添加分数
		_this.addScoreFn();

		//添加玩家
		_this.addPlayerFn();
		
		_this.aW.push(_this.iOneW)
		//添加竹竿
		_this.addPillarFn(_this.aW[0]);

	},
	addBgFn: function(){

		var _this = this;

		_this.bgArea = new LSprite();
		_this.bgArea.addChild(new LBitmap(new LBitmapData(imglist["bg"])));
		_this.allBg.addChild(_this.bgArea);
		
	},
	addScoreFn: function(){

		var _this = this;
		
		_this.scoreBox = new LSprite();
		_this.scoreBox.addChild(new LBitmap(new LBitmapData(imglist["scoreBg"])));
		_this.scoreBox.x = 159;
		_this.scoreBox.y = 150;
		_this.scoreBox.visible = false;
		_this.flow.addChild(_this.scoreBox);

		_this.guide = new LSprite();
		_this.guide.addChild(new LBitmap(new LBitmapData(imglist["help"])));
		_this.guide.x = 131;
		_this.guide.y = 250;
		_this.guide.visible = false;
		_this.flow.addChild(_this.guide);

		_this.scoreCenter = new LSprite();
		_this.scoreCenter.x = 80;
		_this.scoreCenter.y = 25;
		_this.scoreBox.addChild(_this.scoreCenter);
		_this.score = new LTextField();
		_this.score.textAlign = "center";
		_this.score.size = 30;
		_this.score.color = "#ffffff";
		_this.score.text = score;
		_this.scoreCenter.addChild(_this.score);

	},
	addStartFn: function(){

		var _this = this;

		_this.startBtn = new LButton(new LBitmap(new LBitmapData(imglist["startUp"])),new LBitmap(new LBitmapData(imglist["startDown"])));
		_this.flow.addChild(_this.startBtn);
		_this.startBtn.scaleX = 0.7;
		_this.startBtn.scaleY = 0.7;
		_this.startBtn.y = 190;
		_this.startBtn.x = 130;
		_this.startBtn.addEventListener(LMouseEvent.MOUSE_DOWN, $.proxy(_this.startFn, _this));
		
	},
	startFn: function(){

		var _this = this;

		LTweenLite.to(_this.startBtn,1,{
			alpha:0,
			ease:LEasing.Strong.easeInOut
		});
		
		LTweenLite.to(_this.allElf,1,{
			x:0,
			y:0,
			ease:LEasing.Strong.easeInOut
		});
		LTweenLite.to(_this.player,1,{
			x: _this.iOneW - iAllNum.playerW,
			ease:LEasing.Strong.easeInOut,
			onComplete: function(){
				
				bStart = true;

				_this.pillarClickFn();

				_this.scoreBox.visible = true;
				_this.guide.visible = true;

			}
		});

		//可点击显示
		onClickLayer.visible = true;


	},
	addPlayerFn: function(){

		var _this = this,
			list = LGlobal.divideCoordinate(iAllNum.playerW*2, iAllNum.playerW, 1, 2),
			data = new LBitmapData(imglist["player"], 0, 0, iAllNum.playerW, iAllNum.playerW);
		
		_this.player = new LAnimationTimeline(data, list);
        _this.player.x = (_this.iOneW - iAllNum.playerW) * 0.5;
        _this.player.y = iAllNum.pillarY - iAllNum.playerW;
        _this.player.speed = 4;
		_this.allElf.addChild(_this.player);
		_this.player.stop();

	},
	addPillarFn: function(iW){

		var _this = this;
		
		_this.pillar = new LSprite();
		_this.pillar.graphics.drawRect(0, "", [0, 0, iW, iAllNum.pillarH], true, "#880088");
		_this.pillar.y = iAllNum.pillarY;
		_this.allPillar.addChild(_this.pillar);
		
		//_this.addBridgeFn(iW, iAllNum.pillarY);

	},
	pillarClickFn: function(){

		var _this = this;
		
		_this.aW.push(fMfloor(oMathRan() * iAllNum.pillarMaxX + iAllNum.pillarMinX));
		//_this.aW.push(190);

		//添加竹竿
		_this.addPillarClickFn(_this.aW[1]);

	},
	addPillarClickFn: function(iW){

		var _this = this;
		
		_this.pillar = new LSprite();
		_this.pillar.graphics.drawRect(0, "", [0, 0, iW, iAllNum.pillarH], true, "#880088");
		_this.pillar.x = LGlobal.width + _this.iMoveNum;
		_this.pillar.y = iAllNum.pillarY;
		_this.allPillar.addChild(_this.pillar);
		LTweenLite.to(_this.pillar,0.5,{
			x: LGlobal.width - iW - 60,
			ease:LEasing.Strong.easeInOut,
			onComplete: function(){
				_this.bClick = true;
			}
		});
		
		_this.addBridgeFn(iW, iAllNum.pillarY);

	},
	addBridgeFn: function(oX){

		var _this = this,
			iBriX = oX,
			iBriY = iAllNum.pillarY;

		if(_this.bridge){_this.bridge.remove();}

		_this.bridge = new LSprite();
		_this.bridgeCon = new LSprite();
		_this.bridgeCon.x = -iAllNum.brigeW;
		_this.bridgeCon.y = -iBridgeH;
		_this.bridgeCon.graphics.drawRect(0, "", [0, 0, iAllNum.brigeW, iBridgeH], true, "#000088");
		_this.bridge.addChild(_this.bridgeCon);

		_this.bridge.x = _this.aW[0];
		_this.bridge.y = iBriY;
		_this.allElf.addChild(_this.bridge);
		
	},
	bridgeMoveFn: function(){

		var _this = this,
			iMyx = _this.allPillar.childList[1].x;
		
		_this.bClick = false;

		if(iBridgeH>=LGlobal.width - _this.aW[1] - _this.aW[0] - 60 &&iBridgeH<LGlobal.width - _this.aW[0] - 60 ){

			LTweenLite.to(_this.bridge,0.2,{
				rotate: 90,
				ease:LEasing.Strong.easeInOut,
				onComplete: function(){
					_this.player.play();
					LTweenLite.to(_this.player,0.3,{
						x: LGlobal.width -60 - iAllNum.playerW,
						onComplete: function(){
							_this.player.stop();
							_this.iMoveNum += iMyx;
							LTweenLite.to(_this.allPillar.childList[0],0.5,{
								x: -iMyx,
								ease:LEasing.Strong.easeInOut,
								onComplete: function(){
									_this.allPillar.childList[0].remove();
									_this.aW.shift();
									iBridgeH = 0;
									_this.pillarClickFn();
									//分数
									_this.score.text = ++score;
								}
							});
							LTweenLite.to(_this.allPillar.childList[1],0.5,{
								x: 0,
								ease:LEasing.Strong.easeInOut
							});
							LTweenLite.to(_this.player,0.5,{
								x: _this.aW[1] - iAllNum.playerW,
								ease:LEasing.Strong.easeInOut
							});
								
							LTweenLite.to(_this.bridge, 0.5,{
								x: -iMyx + _this.aW[0],
								ease:LEasing.Strong.easeInOut
							});
							
						}
					});
				}
			});
			
		}else{

			LTweenLite.to(_this.bridge,0.2,{
				rotate: 90,
				ease:LEasing.Strong.easeInOut,
				onComplete: function(){
					_this.player.play();
					LTweenLite.to(_this.player,0.3,{
						x: _this.aW[0] + iBridgeH - iAllNum.playerW,
						onComplete: function(){
							_this.player.stop();
							
							LTweenLite.to(_this.player,0.3,{
								y: LGlobal.height,
								ease:LEasing.Strong.easeInOut
							});
							LTweenLite.to(_this.bridge,0.3,{
								rotate: 180,
								alpha: 0,
								ease:LEasing.Strong.easeInOut,
								onComplete: function(){
									overFn();
								}
							});
							
						}
					});
				}
			});
		}
	}
};

for(var k in g)Game.prototype[k] = g[k];
