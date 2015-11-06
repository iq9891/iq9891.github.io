$(function(){
	reviseFn();
});

//修改密码
function reviseFn(){
	var $rBtn1 = $(".rBtn1"),
		$rBtn2 = $(".rBtn2"),
		$rBtn3 = $(".rBtn3");

	$rBtn1.click(function(){
		$(this).hide();
		$rBtn2.css({display: "block"});
		$(".miaRePassWord").css({opacity:1});
	});
	$rBtn2.click(function(){
		$(this).hide();
		$rBtn3.css({display: "block"});
		$(".miaRPWtop").hide();
		$(".miaRPWbot").show();
		$(".raBoxR").val("");
	});
	$rBtn3.click(function(){
		$(this).hide();
		$(".miaRePassWord").css({opacity:0});
		$(".miaRPWtop").show();
		$(".miaRPWbot").hide();
		$rBtn1.css({display: "block"});
	});
};