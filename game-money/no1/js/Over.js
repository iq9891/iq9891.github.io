/**
 * Created with EditPlus.
 * User: leemagnum
 * Date: 14-8-4
 * Time: 下午14.20
 * 游戏结束对象.
 */
 function Over(){

    var _this = this;
	
	base(_this, LSprite, []);

	_this.share();

 };

 
var o = {
	share: function(){

		var _this = this;
		
		_this.share = new LSprite();
		_this.share.addChild(new LBitmap(new LBitmapData(imglist["share"]))); 
		_this.addChild(_this.share);
		_this.share.alpha = 0;
		LTweenLite.to(_this.share,2,{
			alpha:1,
			ease:LEasing.Strong.easeInOut,
			onComplete: function(){

				_this.share.addEventListener(LMouseEvent.MOUSE_UP, $.proxy(_this.shareFn, _this));

			}
		})
		
	},
	shareFn: function(){

		var _this = this;
		
		_this.share.remove();

		//游戏重置
		_this.reSetFn();
		
		_this.bgFn();

	},
	bgFn: function(){

		var _this = this;
		
		
		_this.graphics.drawRect(0, "", [0, 0, LGlobal.width, LGlobal.height], true, oData.mainBg);

		//添加文字
		_this.addFontFn();
	},
	addFontFn: function(){

		var _this = this;
		
		
		_this.name = new LSprite();
		_this.name.addChild(new LBitmap(new LBitmapData(imglist["tit"]))); 
		_this.name.x = Tool.sc({w: 245}).x;;
		_this.name.y = 128;
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
		_this.score.text = "您戳到" + moneyLayer.iScore + "元";
		_this.scoreLayer.addChild(_this.score);

		_this.restartLayer = new LSprite();
		_this.restartLayer.addChild(new LBitmap(new LBitmapData(imglist["restart"])));
		_this.restartLayer.x = Tool.sc({w: 201}).x;
		_this.restartLayer.y = 420;
		_this.addChild(_this.restartLayer);
		_this.restartLayer.addEventListener(LMouseEvent.MOUSE_UP, $.proxy(_this.restartFn, _this));


	},
	reSetFn: function(){

		var _this = this;
		
		//console.log(1);
		
		//删除手动的层
		moneyLayer.remove();
		moneyLayer.die();
		//console.log(moneyLayer);

		//开始倒计时
		oData.bStartTime = false;
		//能点
		oData.bIsStart = true;


	},
	restartFn: function(){

		var _this = this;
		
		//console.log(1);
		
		//删除游戏结束画面
		_this.remove();
		_this.die();
		
		//重新开始
		moneyLayer =  new Main();
		gameLayer.addChild(moneyLayer);

	}
};

for(var k in o)Over.prototype[k] = o[k];