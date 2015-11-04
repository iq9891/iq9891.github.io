$(function(){
	var $mask = $('#mask'),
		$rarShareTk = $('#rarShareTk'),
		$rarShareBtn = $('#rarShare'),
		od = 'ontouchstart' in window ? 'tap':'click';

	$mask.css({height:$(window).height()});
	
	$rarShareBtn.on(od, function(){
		$mask.show();
		$rarShareTk.show();
	});
	$('#mask,#rarShareTk').on(od, function(){
		$mask.hide();
		$rarShareTk.hide();
	});

});