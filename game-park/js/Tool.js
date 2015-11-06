/**
 * Created with EditPlus.
 * User: leemagnum
 * Date: 14-5-17
 * Time: 上午10:18
 * 工具对象.
 */
var Tool = {
	//水平居中
	//obj.w --- objWidth
	//obj.h --- objHeight
	sc: function(obj){
		
		var oL = obj.w ? ((LGlobal.width - obj.w) / 2) : 0,
			oT = obj.h ? ((LGlobal.height - obj.h) / 2) : 0;

		return {x: oL, y: oT};
	},
	//垂直靠下
	//obj.h --- objHeight
	cb: function(obj){
		
		oT = obj.h ? (LGlobal.height - obj.h) : 0;

		return {y: oT};
	},
	oMath: Math,
	toAngle: function(radian){
		//弧度转角度
		return radian*180/this.oMath.PI;
	},
	toRad: function(angle){
		//角度转弧度
		return angle * this.oMath.PI / 180;
	},
	rand: function (under, over){ //over上限(最大),under下限(最小)
		switch(arguments.length){ 
			case 1: return parseInt(Math.random()*under+1); 
			case 2: return parseInt(Math.random()*(over-under+1) + under); 
			default: return 0; 
		}
	},
	includeHitFn: function(obj1, obj2, obj1W, obj1H, obj2W, obj2H){	//检测一个物体到一个物体里面
		
		//obj1,运动物体
		//obj2,静止物体

		var oL1 = obj1.x,
			oR1 = obj1.x + obj1W,
			oT1 = obj1.y,
			oB1 = obj1.y + obj1H,
			oL2 = obj2.x,
			oR2 = obj2.x + obj2W,
			oT2 = obj2.y,
			oB2 = obj2.y + obj2H;

		if(oL1 + 15<oL2 && oR1<oR2 && oT1 < oT2 && oB1>oB2){
			return true;
		}else{
			return false;
		}

	}
};
