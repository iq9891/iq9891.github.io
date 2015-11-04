$(function(){
	var $mask = $('#mask'),
		$oSuccess = $('#oSuccess'),
		$oSub = $('#oSub'),
		bOpen = true,
		od = 'ontouchstart' in window ? 'tap':'click';

	$mask.css({height:$(window).height()});
	
	$oSub.on(od, function(){
		if(!bOpen){return;}
		bOpen = false;
		$mask.show();
		$oSuccess.show();
		setTimeout(hideTkFn,2000);
	});

	function hideTkFn(){
		bOpen = true;
		$mask.hide();
		$oSuccess.hide();
	};

});