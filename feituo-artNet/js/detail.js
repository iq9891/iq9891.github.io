$(function(){
	collectFn();
	tabFn();
	detail2AddFn()
});

//点收藏
function collectFn(){
	var $dCollectNo = $(".dCollectNo"),
		$dCollect = $(".dCollect");
	
	$dCollectNo.click(function(){
		$(this).hide();
		$dCollect.show();
	});
	
	$dCollect.click(function(){
		$(this).hide();
		$dCollectNo.show();
	});
	
};

//选项卡
function tabFn(){
	var $daiTopBtn = $(".daiTopBtn"),
		$daiBotArea = $(".daiBotArea");
	
	$daiTopBtn.click(function(){
		$(this).addClass("daiTopBtnOn").siblings().removeClass("daiTopBtnOn");
		$daiBotArea.eq($(this).index()).show().siblings().hide();
	});

};

function detail2AddFn(){
	var $fBtnLinkR2 = $(".fBtnLinkR2");

	$fBtnLinkR2.click(function(){
		$(".fBtnLinkM").addClass("fBtnLinkMon");
	});

};