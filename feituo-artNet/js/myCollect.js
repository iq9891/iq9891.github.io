$(function(){
	tabFn();
	deleteFn();
});

//切换
function tabFn(){
	var $mchNbtn = $(".mchNbtn"),
		$mcAreaTab = $(".mcAreaTab");
	
	$mchNbtn.click(function(){
		//$(this).addClass("on").siblings().removeClass("on");
		$(this).css({
			backgroundColor: "#f48401",
			color: "#fff"
		}).siblings().css({
			backgroundColor: "#fff",
			color: "#f48401"
		});
		$mcAreaTab.eq($(this).index()).show().siblings().hide();
	});
	
};

//收藏删除
function deleteFn(){
	var $alBtn2 = $(".mcBtn");
	$alBtn2.live("click",function(){
		if(confirm("一定要删吗？")){
			$(this).closest(".mcBox").remove();
		}
	});
};