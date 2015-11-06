$(function(){
	chooseFn();
	searchFn();
});

//头部选择
function chooseFn(){
	var $csArea = $(".csAreaR span");
	
	$csArea.click(function(){
		$(this).closest(".csAreaR").find("span").removeClass("csBtnOn")
		$(this).addClass("csBtnOn");
	});
};

//模拟搜索
function searchFn(){
	var $hSearchBtn = $(".hSearchBtn"),
		$hSearchInp = $(".hSearchInp")
		$cH3 = $(".cH3");
	
	$hSearchBtn.click(function(){
		if(!$hSearchInp.val()){
			$hSearchInp.addClass("hSearchInpAnim").on("webkitAnimationEnd", function(){
				$hSearchInp.removeClass("hSearchInpAnim");
			});
		}else{
			$cH3.each(function(i, e){
				if($(e).html() != $hSearchInp.val()){
					$(e).closest("li").hide();
				}
			})
			//console.log($hSearchInp.val());
			
		}
	});
};