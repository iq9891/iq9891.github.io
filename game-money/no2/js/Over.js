/**
 * Created with EditPlus.
 * User: leemagnum
 * Date: 14-8-4
 * Time: 上午 11.00
 * 游戏结束对象.
 */
 function Over(){

    var _this = this;
	
	base(_this, LSprite, []);

	//游戏重置
	_this.reSetFn();

	_this.init();

 };

 
var o = {
	init: function(json){

		var _this = this;
		
		
		_this.graphics.drawRect(0, "", [0, 0, LGlobal.width, LGlobal.height], true, oData.mainBg);

		//添加文字
		_this.addFontFn();

	},
	addFontFn: function(){

		var _this = this;
		
		
		_this.name = new LTextField();
		_this.name.color = "#ffffff";
		_this.name.font = "HG行書体";
		_this.name.size = 50;
		_this.name.x  = 180;
		_this.name.y = 180;
		_this.name.text = "飞钱";
		_this.addChild(_this.name);
		
		_this.scoreLayer = new LSprite();
		_this.scoreLayer.x = LGlobal.width / 2;
		_this.scoreLayer.y = 270;
		_this.addChild(_this.scoreLayer);

		_this.score = new LTextField();
		_this.score.color = "#ffffff";
		_this.score.font = "HG行書体";
		_this.score.size = 30;
		_this.score.textAlign  = "center";
		_this.score.y = 40;
		_this.score.text = "飞了" + (moneyLayer.iScore - oData.aScore[oData.iR]);
		_this.scoreLayer.addChild(_this.score);

		_this.restartLayer = new LSprite();
		_this.restartLayer.addChild(new LBitmap(new LBitmapData(imglist["restart"])));
		_this.restartLayer.x = Tool.sc({w: 120}).x;
		_this.restartLayer.y = 420;
		_this.addChild(_this.restartLayer);
		_this.restartLayer.addEventListener(LMouseEvent.MOUSE_UP, $.proxy(_this.restartFn, _this));


	},
	reSetFn: function(){

		var _this = this;
		
		console.log(1);
		
		//删除自动飞钱的图片
		flyLayer.removeAllChild();
		
		//删除手动飞钱的层
		moneyLayer.remove();
		moneyLayer.die();
		//console.log(moneyLayer);

		//开始倒计时
		oData.bStartTime = false;

		//游戏开始可以点
		oData.bIsStart = true;

	},
	restartFn: function(){

		var _this = this;
		
		//console.log(1);
		
		//删除游戏结束画面
		_this.remove();
		
		//重新开始
		moneyLayer =  new Main();
		gameLayer.addChild(moneyLayer);

	}
};

for(var k in o)Over.prototype[k] = o[k];