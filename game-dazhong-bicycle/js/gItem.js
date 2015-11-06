/*
 * 拼图对象
 * oPar 对象 父级
 * iNow 数字 第几个拼图的图片
 * i 数字 第几个拼图的索引
 * aHitPos 数组 碰撞的位置以及合并的位置
 */
function Item(oPar,iNow,i, aHitPos){
	var _this = this;
	base(_this,LSprite,[]);
	_this.iNow = iNow;
	_this.i = i;
	_this.oPar = oPar;
	_this.oMyPar = oPar.childList[_this.i];
	_this.aHitPos = aHitPos;
	
	_this.bCanDown = false;
	_this.init();

};

var i  = {
	init: function(){
		var _this = this;
		_this.addBgFn();
	},
	addBgFn: function(){
		var _this = this;
		_this.bg = new LBitmap(new LBitmapData(imglist["img" + _this.iNow]));
		_this.addChild(_this.bg);
		
		_this.addEvent();

	},
	addEvent: function(){
		var _this = this,
			i = 0;
		_this.oMyPar.addEventListener(LMouseEvent.MOUSE_DOWN,function(e){
			//console.log(_this.oMyPar);
			//e.clickTarget.startDrag(e.touchPointID);
			_this.oMyPar.startDrag(e.touchPointID);
			//console.log(_this.bg.getWidth());
			_this.bCanDown = true;
		});
		_this.oMyPar.addEventListener(LMouseEvent.MOUSE_MOVE,function(e){
			if(!_this.bCanDown){return;}
			var iLen = _this.oPar.childList.length;
			for (i=0; i<iLen; i++) {
				var oChild = _this.oPar.childList[i],
					oChildItem = oChild.childList[0];
				if(!oChildItem){return;}
				if(oChildItem.hitTestObject(_this.oMyPar)){	//碰撞检测
					//console.log(_this.iNow-oChild.childList[0].iNow);
					var iHitNow = oChild.childList[0].iNow,
						iW = ((_this.oMyPar.x - _this.bg.getWidth())/2 - (oChild.x - _this.bg.getWidth())/2),
						iH = ((_this.oMyPar.y - _this.bg.getHeight())/2 - (oChild.y - _this.bg.getHeight())/2);
					//console.log(iW +"+"+ iH);
					if(_this.iNow-iHitNow == 1){	//左边
						//console.log(_this.aHitPos[i]);
						if(iW<_this.aHitPos[i][0][1] && _this.aHitPos[i][0][0]<iW && iH<_this.aHitPos[i][0][3] && _this.aHitPos[i][0][2]<iH){
							//e.clickTarget.stopDrag();
							_this.oMyPar.stopDrag();
							//console.log(_this.oPar.childList[i]);
							_this.remove();
							_this.oPar.childList[i].addChild(_this);
							_this.x = _this.aHitPos[i][0][4] + oChildItem.x;
							_this.y = _this.aHitPos[i][0][5];
							//_this.oMyPar.remove();
							console.log('左边对了');
							_this.bCanDown = false;
							return;
						}
					}else if(_this.iNow-iHitNow == -1){ //右边
						//console.log(_this.aHitPos[i][1][1]);
						if(iW<_this.aHitPos[i][1][1] && _this.aHitPos[i][1][0]<iW && iH<_this.aHitPos[i][1][3] && _this.aHitPos[i][1][2]<iH){
							_this.oMyPar.stopDrag();
							//console.log(_this.oPar.childList[i]);
							_this.remove();
							_this.oPar.childList[i].addChild(_this);
							_this.x = _this.aHitPos[i][1][4] + oChildItem.x;
							_this.y = _this.aHitPos[i][1][5];
							//_this.oMyPar.remove();
							console.log('右边对了');
							_this.bCanDown = false;
							return;
						}
					}
				}
			}
		});
        _this.oMyPar.addEventListener(LMouseEvent.MOUSE_UP,function(e){
			//e.clickTarget.stopDrag();
			_this.oMyPar.stopDrag();
			_this.bCanDown = false;
		});
	}
};

for(var k in i)Item.prototype[k] = i[k];
