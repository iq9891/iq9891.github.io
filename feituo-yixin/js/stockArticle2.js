$(function(){
	var $sa2AreaLink = $('.sa2Area a'),
		od = 'ontouchstart' in window ? 'tap':'click';


	$sa2AreaLink.on(od, function(){
		var $this = $(this),
			sMyHref = $this.attr('_href');
		
		if(!sMyHref){return;}
		$this.closest('.sa2Area').addClass('sa2AreaOn');
		setTimeout(function(){
			window.location.href = sMyHref;
		},1000);
	});

});