$(function(){
	tab();
});

/*底部切换*/
function tab(){

	var $wiBotNavLink = $('.wiBotNavLink'),
		$wiBotTabBox = $('.wiBotTabBox'),
		od = 'ontouchstart' in window ? 'tap':'click';

	$wiBotNavLink.on(od, function(){
		var _this = $(this).index();

		$wiBotNavLink.removeClass('wiBotNavLinkOn').eq(_this).addClass('wiBotNavLinkOn');
		$wiBotTabBox.hide().eq(_this).show();

	});

};