$(function(){
	tkFn();
});

//弹框
function tkFn(){
	var $moTk = $(".moTk"),
		$mask = $(".mask"),
		$payBtn = $(".payBtn"),
		$rBtn = $(".rBtn");

	$mask.css({height:$(document).height()});
	
	$payBtn.click(showTk);

	function showTk(){
		$moTk.show();
		$mask.show();
	}

	$rBtn.click(hideTk);
	$mask.click(hideTk);

	function hideTk(){
		$moTk.hide();
		$mask.hide();
	};

};