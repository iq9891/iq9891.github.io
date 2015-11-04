$(function(){
	var $allWrap = $("#oBg"),
		$wlAreaCon = $("#allWrap"),
		$iBg = $(".ciConBg"),
		iLen = $iBg.length,
		iTop = $allWrap.height(),
		iNow = 0,
		od = 'ontouchstart' in window ? 'tap':'click',
		oMyTime = null,
		bCanMove = false,
		sEnd = 'webkitAnimationEnd',
		aResult = [-1,-1,-1,-1,-1,-1];

	inFn(iNow+1);

	//$('.cs1').on(od, gotoUpFn);
	//$('.cs2').on(od, gotoDownFn);
	//滑动
	$(document).swipeUp(function(){
		gotoUpFn();
	}).swipeDown(function(){
		gotoDownFn();
	});

	function gotoUpFn(e){
		if(!bCanMove|| iNow == iLen-1){return;}
		noSwipeFn();
		$wlAreaCon.anim({ translate3d: '0,'+ -iTop * ++iNow +'px,0' }, 0.5, 'ease-out', function(){
			outFn(iNow);
			inFn(iNow+1);
			$(this).off();
		});
	}
	function gotoDownFn(e){
		if(iNow==5){
			bCanMove = true;
		}
		if(!bCanMove||iNow == 0){return;}
		noSwipeFn();
		$wlAreaCon.anim({ translate3d: '0,'+ -iTop * --iNow +'px,0' }, 0.5, 'ease-out', function(){
			if(iNow == 4){
				$('.goTop').css({'-webkit-transform': 'rotate(0deg)'});
			}
			outFn(iNow+2);
			inFn(iNow+1);
			$(this).off();
		});
	}
	document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
	
	//第一屏
	function inFn(iNow){
		$('.ciCon'+iNow+'a').addClass('inter1');
		$('.ciCon'+iNow+'b').addClass('inter2').on(sEnd, function(){
			if(iNow==1||iNow==2||iNow==5){
				$(this).off();
				canSwipeFn();
			}
		});
		$('.ciCon'+iNow+'c').addClass('inter3').on(sEnd, function(){
			if(iNow==6){
				$(this).off();
				$('.goTop').show().css({'-webkit-transform': 'rotate(180deg)'});
			}
		});
		$('.ciCon'+iNow+'d').addClass('inter4').on(sEnd, function(){
			if(iNow==3||iNow==4){
				$(this).off();
				canSwipeFn();
			}
		});
	};
	function outFn(iNow){
		$('.ciCon'+iNow+'a').removeClass('inter1');
		$('.ciCon'+iNow+'b').removeClass('inter2');
		$('.ciCon'+iNow+'c').removeClass('inter3');
		$('.ciCon'+iNow+'d').removeClass('inter4');
	};


	function canSwipeFn(){
		bCanMove = true;
		$('.goTop').show();
	};
	function noSwipeFn(){
		bCanMove = false;
		$('.goTop').hide();
	};

});