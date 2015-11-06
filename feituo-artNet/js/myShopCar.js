$(function(){
	deleteFn();
	chooseFn();
});

//删除购物车
function deleteFn(){
	var $alBtn2 = $(".mscBtn");
	$alBtn2.live("click",function(){
		if(confirm("一定要删吗？")){
			$(this).closest(".mscBox").remove();
		}
	});
};

//选择
function chooseFn(){
	var $mscCheck = $(".mscCheck"),
		$inner = $(".mscFootM span").eq(1),
		$mscFootL = $(".mscFootL"),
		iAllNum = 0;
	
	$mscCheck.click(function(){
		var _this = $(this),
			iHtml = $inner.html().substring(1)-0>>0//,
			iNewHtml = _this.closest(".mscBox").find(".menoyArea").html().substring(1)-0>>0,
			iNum = iHtml+iNewHtml;
			
		_this.addClass("on");
		$inner.html("￥"+iNum+".00");
	});

	$mscFootL.toggle(function(){
		$(this).css({backgroundImage:"url(images/mscCheckOn.png)"});
		$mscCheck.css({backgroundImage:"url(images/mscCheckOn.png)"});
		
		$mscCheck.each(function(i,e){
			iAllNum += $(e).closest(".mscBox").find(".menoyArea").html().substring(1)-0>>0;
		});
		
		$inner.html("￥"+iAllNum+".00");
		
	},function(){
		$(this).css({backgroundImage:"url(images/mscCheck.png)"});
		$mscCheck.css({backgroundImage:"url(images/mscCheck.png)"});
		$inner.html("￥0.00");
	});

};