var $elHeaderBtn = $('.elHeaderBtn'),
	$elHeaderInfo = $('.elHeaderInfo'),
	$elBoxArea = $('.elBoxArea'),
	$elBox = $('.elBox'),
	$elHeader = $('.elHeader'),
	$allWrap = $("#wlArea"),
	$wlAreaCon = $("#wlAreaCon"),
	$wlAreaConArea = $(".wlAreaConArea"),
	$iBg = $(".wlAreaConArea"),
	iLen = $iBg.length,
	iTop = $allWrap.height(),
	iNow = 0,
	$eaH2divTop = $('#eaH2divTop'),
	$eaH2divBot = $('#eaH2divBot'),
	od = 'ontouchstart' in window ? 'tap':'click',
	bCanMove = true,
	bOne = true;

$elHeaderBtn.on('click', function(){
	var _this = $(this);
	
	if(bOne){
		$elHeaderInfo.eq(0).hide();
		$elHeaderInfo.eq(1).show();
		_this.addClass('elHeaderBtnOn');
	}else{
		$elHeaderInfo.eq(1).hide();
		$elHeaderInfo.eq(0).show();
		_this.removeClass('elHeaderBtnOn');
	}
	$elBoxArea.css({height:$(window).height() - $elHeader.height()-91});
	$elBox.css({height:$(window).height() - $elHeader.height()-131});
	bOne = !bOne;

	
});

$(document).swipeUp(gotoUpFn).swipeDown(function(e){
	if(!bCanMove||iNow == 0){return;}
	noSwipeFn();
	$wlAreaCon.anim({ translate3d: '0,'+ -iTop * --iNow +'px,0' }, 0.5, 'ease-out', function(){
		$eaH2divTop.html($wlAreaConArea.eq(iNow).attr('mouth'));
		$eaH2divBot.html($wlAreaConArea.eq(iNow).attr('day'));
		canSwipeFn()
	});
});

function gotoUpFn(e){
	if(!bCanMove|| iNow == iLen-1){return;}
	noSwipeFn();
	$wlAreaCon.anim({ translate3d: '0,'+ -iTop * ++iNow +'px,0' }, 0.5, 'ease-out', function(){
		$eaH2divTop.html($wlAreaConArea.eq(iNow).attr('mouth'));
		$eaH2divBot.html($wlAreaConArea.eq(iNow).attr('day'));
		canSwipeFn()
	});
}
document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);


function canSwipeFn(){
	bCanMove = true;
	//$goTop.show();
};
function noSwipeFn(){
	bCanMove = false;
	//$goTop.hide();
};

$wlAreaConArea.on(od, function(){
	window.location.href = $(this).attr('_href');
});