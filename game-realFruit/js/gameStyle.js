var oWidth = 0, oHeight = 0;
function styleJs(){
	var pingKuan=$(".m_wrapper").width(),//m_wrapper是最外层div的类名
		bili = function(mun){
			var oScale = mun/480;	//480是psd宽度
			return oScale.toFixed(6);
		},iW = 0,iH = 0,
		tanchu = true;

	$(".mask").css({
		"height":pingKuan * bili(780)
	});
	$(".tk1").css({
		"width":pingKuan * bili(405),
		"height":pingKuan * bili(415),
		"left":pingKuan * bili(37),
		"top":pingKuan * bili(61),
		"paddingBottom":pingKuan * bili(101)
	});
	$(".tkBtn").css({
		"width":pingKuan * bili(210),
		"marginTop":pingKuan * bili(37)
	});
	$(".gFont6").css({
		"marginTop":pingKuan * bili(214)
	});

	$(".tkBtn2").css({
		"width":pingKuan * bili(360),
		"height":pingKuan * bili(64),
		"marginTop":pingKuan * bili(37)
	});
	$(".tkBtn2 a").css({
		"width":pingKuan * bili(173),
		"height":pingKuan * bili(64)
	});

		

		

	//刮刮卡必须设置的变量样式
	oWidth=pingKuan * bili(360);	//刮刮卡宽度
	oHeight=pingKuan * bili(105);	//刮刮卡高度

	//刮刮卡容器的样式
	$(".div3").css({
		"height": pingKuan * bili(105),
		"marginTop": pingKuan * bili(25)
	});
	$("#wScratchPad3").css({
		"width":pingKuan * bili(360),
		"height":pingKuan * bili(105),
	});

	//刮刮卡插件调用
	//0没中
	//1-4奖品
	$("#wScratchPad3").wScratchPad({
		cursor:'',
		width: oWidth,
		height: oHeight,
		size:20,		
		image:'images/gFont1.png',	//刮完覆盖层以后显示的中奖图片
		image2:'images/lottyArea.png',    //覆盖层图片
		scratchMove: function(e, percent){
			if(percent > 60){
				//清除剩余
				this.clear();
				if(tanchu){
					tanchu=false;
					//alert("挂完了");
					//未中奖显示
					noAwardFn();
					//中奖显示
					getAwardFn();
				}
			}
		},
	});
	
	//显示分享
	showShareFn();
	//样式重置完成之后
	$(".load").hide();
	$(".m_wrapper").css({
		"opacity": 1
	});
	
};


function loaded(){
	setTimeout(function(){styleJs();},300);
}
function hengshuping(){
	if(window.orientation==180||window.orientation==0){loaded();};
	if(window.orientation==90||window.orientation==-90){loaded();}
}
window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", hengshuping, false);
window.addEventListener('load', loaded, false);

//分享
function showShareFn(){
	var $tk2 = $(".tk2"),
		$showShare = $(".showShare"),
		od = 'ontouchstart' in window ? "touchstart":"click";;

	
	$showShare.bind(od, function(){
		$(".tk1").hide();
		$tk2.show();
	});

	$tk2.bind(od, function(){
		$tk2.hide();
		$(".tk1").show();
	});

};

//中奖
function getAwardFn(){
	$(".tkBtn1").show();
};
//未中奖
function noAwardFn(){
	$(".tkBtn2").show();
	var od = 'ontouchstart' in window ? "touchstart":"click";
	$(".reBtnTk1").bind(od, function(){
		reStartFn();
		$(".tk1,.mask").hide();
	});
};
