$(function(){
	var $mask = $(".mask"),
		$win = $(window);

	$mask.css({height: $win.height()});

	tkFn();

});
//弹框事件
function tkFn(){
	var $qxlBtnBoxR = $(".showShare"),
		$qxlBtnBoxL = $(".qxlBtnBoxL"),
		od = 'ontouchstart' in window ? 'tap':'click';
	$qxlBtnBoxR.on(od, showTkFn);
	$qxlBtnBoxL.on(od, showTk2Fn);
	$(".mask,.tk,.tk2").on(od, hideTkFn);
};
//显示弹框
function showTkFn(){
	$(".mask,.tk").show();
};
//显示弹框2
function showTk2Fn(){
	$(".mask,.tk2").show();
};
//隐藏弹框
function hideTkFn(){
	$(".mask,.tk,.tk2").hide();
};