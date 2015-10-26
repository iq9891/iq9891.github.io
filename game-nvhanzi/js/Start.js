/*
 * Created with EditPlus.
 * User: leemagnum
 * Date: 14-9-15
 * Time: 10:30
 * 开始对象.
*/
function Start(){

	var _this = this;

	base(_this,LSprite,[]);
	
	_this.init();

};


var s = {
	init: function(){

		var _this = this;

		_this.bgLayer = new LSprite();
		_this.bgLayer.addChild(new LBitmap(new LBitmapData(imglist["bg"])));
		_this.addChild(_this.bgLayer);

		//添加开始按钮
		_this.startFn();

		//添加排行榜按钮
		_this.listFn();
		

	},
	startFn: function(){

		var _this = this;

		_this.startLayer = new LSprite();
		_this.startLayerBit = new LBitmap(new LBitmapData(imglist["merge"]));
		_this.startLayerBit.bitmapData.setCoordinate(0, 174);
		_this.startLayerBit.bitmapData.width = 196;
		_this.startLayerBit.bitmapData.height = 82;
		_this.startLayer.x = 142;
		_this.startLayer.y = 448;
		_this.startLayer.addChild(_this.startLayerBit);
		_this.addChild(_this.startLayer);

		
		_this.startFontLayer = new LSprite();
		_this.startFontBit = new LBitmap(new LBitmapData(imglist["merge"]));
		_this.startFontBit.bitmapData.setCoordinate(0, 255);
		_this.startFontBit.bitmapData.width = 196;
		_this.startFontBit.bitmapData.height = 82;
		_this.startFontLayer.addChild(_this.startFontBit);
		_this.startLayer.addChild(_this.startFontLayer);


		//开始游戏
		_this.startLayer.addEventListener(LMouseEvent.MOUSE_DOWN, $.proxy(_this.startGame, _this)); 

	},
	listFn: function(){

		var _this = this;
		
		_this.listLayer = new LSprite();
		_this.listLayerBit = new LBitmap(new LBitmapData(imglist["merge"]));
		_this.listLayerBit.bitmapData.setCoordinate(0, 174);
		_this.listLayerBit.bitmapData.width = 196;
		_this.listLayerBit.bitmapData.height = 82;
		_this.listLayer.x = 142;
		_this.listLayer.y = 538;
		_this.listLayer.addChild(_this.listLayerBit);
		_this.addChild(_this.listLayer);

		
		_this.listFontLayer = new LSprite();
		_this.listFontBit = new LBitmap(new LBitmapData(imglist["merge"]));
		_this.listFontBit.bitmapData.setCoordinate(0, 338);
		_this.listFontBit.bitmapData.width = 196;
		_this.listFontBit.bitmapData.height = 82;
		_this.listFontLayer.addChild(_this.listFontBit);
		_this.listLayer.addChild(_this.listFontLayer);

		_this.listLayer.addEventListener(LMouseEvent.MOUSE_DOWN, $.proxy(_this.listTk, _this)); 
		

	},
	startGame: function(){

		var _this = this;
		
		_this.remove();
		
		//开始游戏
		startGame();
	},
	listTk: showList
};

for(var k in s)Start.prototype[k] = s[k];


function showList(){
	$(".list,.mask,.listLoad").show();

	$(".listBtn").bind(oDown, function(){
		//变量重置
		reSetFn();
		startLayer && startLayer.remove();
		//开始游戏
		startGame();
	});
	$(".listClose").bind(oDown, function(){
		hideList();
		gameLayer && gameLayer.remove();
		startLayer = new Start();
		addChild(startLayer);
	});
	
	setTimeout(function(){
		//各种显示
		$(".listLoad").hide();
		$(".listLoaded").show();
	}, 2000);
};
function hideList(){
	$(".list,.mask,.listLoaded").hide();
};

function showInfo(){
	$(".info,.mask").show();
};
function hideInfo(){
	$(".info,.mask").hide();
};
function showOver(){
	$(".over,.mask,.overLoad").show();
	setTimeout(function(){
		//添加结束分数
		console.log("iScore:"+iScore);
		addOverNumFn(iScore,".oScore");
		addOverNumFn(0,".oList");
		//各种显示
		$(".overLoad").hide();
		$(".overLoaded").show();
	},2000);

	//重新开始
	$(".oReStart").bind(oDown, startGame);
	//重新开始游戏排行榜
	$(".oListBtn").bind(oDown, function(){
		hideOver();
		showList();
	});
};
function hideOver(){
	$(".over,.mask,.overLoaded").hide();
};

//开始倒计时数字
function startDiffFn(iNow){

	var bili = function(mun){
			var oScale = mun/480;
			return oScale.toFixed(6);
		};

	$(".iImgFont").css({
		"backgroundPosition": "0 " + -$("#legend canvas").width() * bili(40) * iNow + "px"
	});

};

//over分数
function addOverNumFn(iNum,oPar){
	
	var i = 0,
		sNum = (iNum + ''),
		l = sNum.length,
		$par = $(oPar);
	
	$par.empty();
	if(iNum == 0){
		$par.append('<div class="m_fl oArea"><img src="images/num0.png" width="100%" /></div>')
	}else{
		for(; i < l; i++){
			$par.append('<div class="m_fl oArea"><img src="images/num'+ sNum.charAt(i) +'.png" width="100%" /></div>')
		}
	}
	styleJs();
};

//重新定义变量
function reSetFn(){
	//各种隐藏
	hideOver();
	hideList();

	startDiffFn(0);

	bCanAddStar = false;
	iStartTime = 0;
	iStartDiffNum = 3;
	iStartDiffBtn = false;
	iGameTime = 0;
	iGameDiffNum = 7;
	iGameDiffBtn = false,
	bIsShake = false;
	iScore = 0
};

function startGame(){
	if(gameLayer){gameLayer.remove();}

	//重新定义变量
	reSetFn();

	//开始321倒计时
	iStartDiffBtn = true;

	//显示游戏开始倒计时
	showInfo();
	iStartTime = new Date().getTime();

	gameLayer = new Game();
	addChild(gameLayer);
};


//$(function(){
	//$(".cs").bind("click", function(){
		//if(bIsShake){
			//var iMoveNum = Tool.rand(0, 20);
			//gameLayer.addNumFn(iMoveNum);
			//gameLayer.animFn(iMoveNum);
			//gameLayer.changeScoreFn(++iScore);
		//}
	//});
//});