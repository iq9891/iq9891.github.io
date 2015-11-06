$(function(){
	var $shareBtn = $('#shareBtn'),
		$show = $('.mask,.shareTk'),
		od = 'ontouchstart' in window ? 'tap':'click';
	$shareBtn.on(od, function(){
		$show.show();
	});
	$show.on(od, function(){
		$show.hide();
	});
});