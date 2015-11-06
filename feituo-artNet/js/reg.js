$(function(){
	collectFn();
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