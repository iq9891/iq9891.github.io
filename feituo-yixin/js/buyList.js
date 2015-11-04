$(function(){

	var oRollData = {
			opacity:[0.4,0.8,1,0.8,0.4,0,0],
			scale:	[0.6,0.6,1,0.6,0.6,0.3,0.3],
			rotate:	[-24,-13,0,13,24,24,24],
			x:		[-215,-72,108,425,545,1435,1435],
			y:		[128,100,103,20,-20,-20,-20],
			zIndex:		[1,2,3,2,1,1,1]
		},
		$blAera = $('.blAera'),
		$blImgBox = $('.blImgBox'),
		$blBotArea = $('.blBotArea'),
		iNow = 2,
		od = 'ontouchstart' in window ? 'tap':'click';

	$(document).swipeLeft(function(){
		gotoLeftFn();
	}).swipeRight(function(){
		gotoRightFn();
	});
	document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

	//$('.cs1').on('click',gotoLeftFn);
	//$('.cs2').on('click',gotoRightFn);
	
	function gotoLeftFn(){

		if(iNow<1){
			iNow=$blAera.length-1;
		}else{
			iNow--;
		}
		
		$blImgBox.removeClass('blImgBoxOn').eq(iNow).addClass('blImgBoxOn');
		$blBotArea.hide().eq(iNow).show();
		
		oRollData.opacity.push(oRollData.opacity[0])
		oRollData.opacity.shift();
		oRollData.scale.push(oRollData.scale[0]);
		oRollData.scale.shift();
		oRollData.rotate.push(oRollData.rotate[0]);
		oRollData.rotate.shift();
		oRollData.x.push(oRollData.x[0]);
		oRollData.x.shift();
		oRollData.y.push(oRollData.y[0]);
		oRollData.y.shift();
		oRollData.zIndex.push(oRollData.zIndex[0]);
		oRollData.zIndex.shift();

		$blAera.each(function(i,e){
			$blAera.eq(i).css({
				opacity:oRollData.opacity[i],
				'-webkit-transform': 'rotate('+ oRollData.rotate[i] +'deg) scale('+ oRollData.scale[i] +') translate3d('+oRollData.x[i]+'px, '+oRollData.y[i]+'px, 0px)',
				zIndex:oRollData.zIndex[i]
			});
		})

	};
	function gotoRightFn(){
		if(iNow>$blAera.length-2){
			iNow=0;
		}else{
			iNow++;
		}
		
		$blImgBox.removeClass('blImgBoxOn').eq(iNow).addClass('blImgBoxOn');
		$blBotArea.hide().eq(iNow).show();

		oRollData.opacity.unshift(oRollData.opacity[oRollData.opacity.length - 1])
		oRollData.opacity.pop();
		oRollData.scale.unshift(oRollData.scale[oRollData.scale.length - 1])
		oRollData.scale.pop();
		oRollData.rotate.unshift(oRollData.rotate[oRollData.rotate.length - 1])
		oRollData.rotate.pop();
		oRollData.x.unshift(oRollData.x[oRollData.x.length - 1])
		oRollData.x.pop();
		oRollData.y.unshift(oRollData.y[oRollData.y.length - 1])
		oRollData.y.pop();
		oRollData.zIndex.unshift(oRollData.zIndex[oRollData.zIndex.length - 1])
		oRollData.zIndex.pop();
		
		$blAera.each(function(i,e){
			$blAera.eq(i).css({
				opacity:oRollData.opacity[i],
				'-webkit-transform': 'rotate('+ oRollData.rotate[i] +'deg) scale('+ oRollData.scale[i] +') translate3d('+oRollData.x[i]+'px, '+oRollData.y[i]+'px, 0px)',
				zIndex:oRollData.zIndex[i]
			});
		})

	};

	$blAera.on(od, function(){
		window.location.href = $(this).attr('_href');
	});
	
});
