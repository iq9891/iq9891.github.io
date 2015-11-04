$(function(){
	var sEnd = 'webkitAnimationEnd',
		od = 'ontouchstart' in window ? 'tap':'click',
		$mask = $('#mask'),
		$oSuccess = $('#siTk'),
		bCanClick = false,
		iNum = 1;

	//进场动画
	animInterFn(1);

	function animInterFn(iNow){
		if(iNow==4){
			bCanClick = true;
			return;
		}
		
		$('#siBox'+iNow).addClass('showAnim').on(sEnd, function(){
			$('#siBox'+iNow+'Yuan').addClass('siBox'+iNow+'YuanAnim');
			$('#siBox'+iNow+'Line1').addClass('siBox'+iNow+'Line1Anim');
			$('#siBox'+iNow+'Line2').addClass('siBox'+iNow+'Line2Anim').on(sEnd, function(){
				$('#siBox'+iNow+'H2').addClass('showAnim');
				$('#siBox'+iNow+'H3').addClass('showAnim').on(sEnd, function(){
					animInterFn(iNow+1);
				});
			});
		});
	}

	$('.siBox').on(od, function(){
		var $this = $(this),
			iNow = $this.index(),
			sMyHref = $this.attr('_href');
		if(!bCanClick){return;}
		if(iNow == 0){
			$mask.show();
			$oSuccess.show();
		}
		if(!sMyHref){return;}
		window.location.href = sMyHref;
	});

});