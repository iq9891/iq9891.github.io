$(function(){
	locationAddFn();
});

//跳转添加地址
function locationAddFn(){
	
	var $raBoxR = $(".raBoxR"),
		$inp0 = $raBoxR.eq(0),
		$inp1 = $raBoxR.eq(1),
		$inp2 = $raBoxR.eq(2),
		$rBtn = $(".rBtn");
	
	$rBtn.click(function(){
		if(!$inp0.val()){
			$inp0.closest(".raBox").addClass("getInpAnim").on("webkitAnimationEnd", function(){
				$inp0.closest(".raBox").removeClass("getInpAnim");
			});
		}else if(!$inp1.val()){
			$inp1.closest(".raBox").addClass("getInpAnim").on("webkitAnimationEnd", function(){
				$inp1.closest(".raBox").removeClass("getInpAnim");
			});
		}else if(!$inp2.val()){
			$inp2.closest(".raBox").addClass("getInpAnim").on("webkitAnimationEnd", function(){
				$inp2.closest(".raBox").removeClass("getInpAnim");
			});
		}else{
			window.location.href = 'MyShopCarAddress.html?user='+$inp0.val()+'&tel='+$inp2.val()+'&w='+$inp1.val()+'';
		}
	});
	
};