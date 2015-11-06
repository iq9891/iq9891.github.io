/**
 * Created with EditPlus.
 * User: leemagnum
 * Date: 14-5-28
 * Time: 22:35
 * 车对象.
 */
 /*
	oX: 起始x坐标,
	oY: 起始y坐标,
	g: game对象.
	oR: 车的角度
	oCR: 咕噜的角度
 */

function Car(json){

    var _this = this;

	base(_this, LSprite, []);

	_this.dirFB = "";
	_this.dirLR = "";

	_this.a = json.oR;
	_this.oCR = json.oCR;
	_this.r = 100;
	_this.oX = json.oX;
	_this.oY = json.oY;
	_this.g = json.g;
	//_this.i = json.i;
	_this.oSpeed = {base:20};
	
	//图片加载
	_this.init();

};


var c = {
	init: function(){

		var _this = this;

        _this.carChild = new LSprite();
		_this.addChild(_this.carChild);

		_this.shadow = new LBitmap(new LBitmapData(imglist["shadow"]));
		_this.shadow.bitmapData.setCoordinate(0, 0);
		_this.shadow.bitmapData.width = 60;
		_this.shadow.bitmapData.height = 130;
		_this.carChild.addChild(_this.shadow);

		_this.wheelL = new LBitmap(new LBitmapData(imglist["wheel"]));
		_this.wheelL.x = 4;
		_this.wheelL.y = 20;
		_this.wheelL.rotate = _this.oCR;
		_this.carChild.addChild(_this.wheelL);

		_this.wheelR = new LBitmap(new LBitmapData(imglist["wheel"]));
		_this.wheelR.x = 42;
		_this.wheelR.y = 20;
		_this.wheelR.rotate = _this.oCR;
		_this.carChild.addChild(_this.wheelR);

		_this.car = new LBitmap(new LBitmapData(imglist["car"]));
		_this.car.bitmapData.setCoordinate(0, 0);
		_this.car.bitmapData.width = 60;
		_this.car.bitmapData.height = 130;
		_this.carChild.addChild(_this.car);

		_this.x = _this.oX;
		_this.y = _this.oY;
		_this.rotate = _this.a;
		
		_this.carChild.y = -100;

	},
	onCarFrame: function(){

		var _this = this,
			bHit = _this.carHit();

		if(_this.wheelL.rotate == 90){  //判断角度 开始
			
			var aMyRotate = _this.rotate-90,
				aMySpeed = 10;
			
				switch(_this.dirFB){
					case "b":
						if(!bHit){
							_this.x -= Tool.oMath.sin(Tool.toRad(180-_this.rotate))* aMySpeed;
							_this.y -= Tool.oMath.cos(Tool.toRad(180-_this.rotate))* aMySpeed;
						}
			
						break;
					case "f":
						if(!bHit){
							_this.x += Tool.oMath.sin(Tool.toRad(180-_this.rotate))* aMySpeed;
							_this.y += Tool.oMath.cos(Tool.toRad(180-_this.rotate))* aMySpeed;
						}
			
						break;
				}

		}else{
			switch(_this.dirFB){
				case "b":
					if(!bHit){
						if(_this.wheelL.rotate>90){
							_this.rotate--;

						}else{
							_this.rotate++;
						}
					}
					break;
				case "f":
					if(!bHit){
						if(_this.wheelL.rotate>90){
							_this.rotate++;
						}else{
							_this.rotate--;
						}
					}
					break;
			}
		}  //判断角度 开始
		
		if(bHit){
			_this.g.bLose = true;
			return false;
		}
		
		//与停车场的碰撞
		if(Tool.includeHitFn(_this.g.carLayer,_this.g.parkRoomLayer, 60, 130, 180, 96)){
	
			_this.g.bWin = true;

			_this.g.bStart = false;
		}

	},
	carHit: function(){

		var _this = this;
		if( _this.carChild.hitTestObject(_this.g.widgetsLayer1) ||
			_this.carChild.hitTestObject(_this.g.otherCarLayer1) ||
			_this.carChild.hitTestObject(_this.g.otherCarLayer2) ||
			_this.carChild.hitTestObject(_this.g.widgetsLayer2) ||
			_this.carChild.hitTestObject(_this.g.otherCarLayer3) ||
			_this.carChild.hitTestObject(_this.g.widgetsLayer3) ||
			_this.carChild.hitTestObject(_this.g.hitSideLeftLayer) ||
			_this.carChild.hitTestObject(_this.g.hitSideRightLayer) ||
			_this.carChild.hitTestObject(_this.g.hitSideTopLayer) ||
			_this.carChild.hitTestObject(_this.g.hitSideBottomLayer) ){
			
			return true;
			
		}else{
			return false;
		}
	},
	carHitSide: function(){

		var _this = this;

		if(LGlobal.hitTest(_this.g.hitSideLeftLayer, _this) || LGlobal.hitTest(_this.g.hitSideRightLayer, _this) || LGlobal.hitTest(_this.g.hitSideTopLayer, _this) || LGlobal.hitTest(_this.g.hitSideBottomLayer, _this)){
			return true;
		}else{
			return false;
		}

	}
};

for(var k in c)Car.prototype[k] = c[k];
