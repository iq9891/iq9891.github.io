$(function(){
	var bImg0 = [],bImg1 = [];

	for(var bIa=0;bIa<=34;bIa++){
		bImg0[bIa]=new Image();
		bImg0[bIa].src= 'images/bImg3a'+bIa+'.png';
	}
	for(var bIb=0;bIb<=41;bIb++){
		bImg1[bIb]=new Image();
		bImg1[bIb].src= 'images/bImg3b'+bIb+'.png';
	}

	var $allWrap = $("#oBg"),
		$wlAreaCon = $("#allWrap"),
		$iBg = $(".ciConBg"),
		$slideConImg = $('.slideConImg'),
		$bImg3Anim = $('.bImg3Anim'),
		iLen = $iBg.length,
		iTop = $allWrap.height(),
		iNow = 0,
		od = 'ontouchstart' in window ? 'tap':'click',
		oMyTime = null,
		bCanMove = false,
		bBEnd = false,
		bIndex = 0,
		iPerperNow = 0,
		bNum = 0,
		bTime = null,
		bCnoUp = false,
		bCnoDown = false,
		bCpos = [	//left，top，opacity,zIndex
			[83,272,0.6,1,'cBox0on'],
			[62,295,1,2,'cBox1on']
		],
		sEnd = 'webkitAnimationEnd',
		myTab = TouchSlide({ slideCell:"#slideBox", mainCell:".bd ul", effect:"leftLoop",startFun:function(i,c){
			$bImg3Anim.hide();
		},endFun:function(i,c){
			if(!bBEnd){return;}
			$bImg3Anim.eq(i).show();
			$slideConImg.hide().eq(i).show();
			bNum = 0;
			roadAnimFn(i);
			bIndex = i;
			$bImg3Anim.eq(0).attr({src:bImg0[0].src});
			$bImg3Anim.eq(1).attr({src:bImg1[0].src});
		}});

	//单选
	radioFn('sexBox');

	//注册
	regFn();
	
	//骆驼动画
	animTopFn();
	
	document.onreadystatechange = function () { 
		if(document.readyState == 'complete'){aInFn();} 
	}

	//滑动
	$(document).swipeUp(function(){
		gotoUpFn();
	}).swipeDown(function(){
		gotoDownFn();
	});

	function gotoUpFn(e){
		if(!bCanMove){return;}
		if(bCnoUp){
			if(iPerperNow==0){
				bCnoDown = true;
			}
			iPerperNow++;
			if(iPerperNow==3){
				bCnoUp = false;
				bCanMove = true;
			}
			cChangeFn(true);

		}else{
			if(iNow == iLen-1){return;}
			noSwipeFn();
			$wlAreaCon.anim({ translate3d: '0,'+ -iTop * ++iNow +'px,0' }, 0.5, 'ease-out', function(){
				switch(iNow){
					case 1:
						aOutFn();
						bInFn();
						break;
					case 2:
						bOutFn();
						cInFn();
						break;
					case 3:
						cOutFn();
						dInFn();
						break;
					case 4:
						dOutFn();
						break;
				}
				$(this).off();
			});
		}
	}
	function gotoDownFn(e){
			if(iNow==4){bCanMove = true;}
		if(!bCanMove){return;}
		if(bCnoDown){
			if(iPerperNow==3){
				bCnoUp = true;
			}
			iPerperNow--;
			if(iPerperNow==0){
				bCnoDown = false;
				bCanMove = true;
			}
			cChangeFn();

		}else{
			if(iNow == 0){return;}
			noSwipeFn();
			$wlAreaCon.anim({ translate3d: '0,'+ -iTop * --iNow +'px,0' }, 0.5, 'ease-out', function(){
				switch(iNow){
					case 0:
						bOutFn();
						aInFn();
						break;
					case 1:
						cOutFn();
						bInFn(true);
						break;
					case 2:
						dOutFn();
						cInFn(true);
						break;
					case 3:
						dInFn(true);
						break;
				}
				$(this).off();
			});
		}
	}
	document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
	
	//第一屏
	function aInFn(){
		$('.aImg0').addClass('aImg0On').on(sEnd, function(){
			$(this).off();
			$('.aImg1').addClass('aImg1On').on(sEnd, function(){
				$(this).off();
				canSwipeFn();
			});
		});
	};
	function aOutFn(){
		$('.aImg0').removeClass('aImg0On');
		$('.aImg1').removeClass('aImg1On');
	};

	function bInFn(bDown){
		bBEnd = true;
		$bImg3Anim.eq(bIndex).show();
		roadAnimFn(bIndex);
		canSwipeFn();
		if(bDown){
			bCnoUp = false;
		}
	};
	
	function bOutFn(){
		bBEnd = false;
		$bImg3Anim.hide();
		clearInterval(bTime);
		bNum = 0;
		$bImg3Anim.eq(0).attr({src:bImg0[0].src});
		$bImg3Anim.eq(1).attr({src:bImg1[0].src});
	};

	//第三屏
	function cInFn(bDown){
		var iCFontNum = bDown?3:0;
		$('.cFont'+iCFontNum).addClass('dFont0on').on(sEnd, function(){
			$(this).off();
			if(!bDown){
				bCnoUp = true;
			}
			if(bDown){
				bCnoDown = true;
			}
			canSwipeFn();
		});
	};
	
	//之间的切换
	function cChangeFn(bUp){
		$('.cBox').each(function(i,e){
			$(e).addClass(bCpos[i][4]);
		});
		if(bUp){
			bCpos.push(bCpos[0]);
			bCpos.shift();
		}else{
			bCpos.unshift(bCpos[bCpos.length - 1]);
			bCpos.pop();
		}
		setTimeout(function(){
			$('.cBox').each(function(i,e){
				$(e).css({
					opacity:bCpos[i][2],
					zIndex:bCpos[i][3]
				});
			})
			$('.cBox').eq(0).on(sEnd, function(){
				$(this).off();
				$('.cBox').each(function(i,e){
					$(e).css({
						left:bCpos[i][0],
						top:bCpos[i][1],
					}).removeClass('cBox0on cBox1on');
				})
				$('.cFont').removeClass('dFont0on');
				$('.cFont'+iPerperNow).addClass('dFont0on');
			});
		},500);
	};

	//第三屏
	function cOutFn(){
		$('.cFont').removeClass('dFont0on');
	};

	//第四屏
	function dInFn(bDown){
		$('.dFont0').addClass('dFont0on').on(sEnd, function(){
			$(this).off();
			$('.dFont1').addClass('dFont1on').on(sEnd, function(){
				$(this).off();
				$('.dFont2').addClass('dFont2on').on(sEnd, function(){
					$(this).off();
					$('.dFont3').addClass('dFont3on').on(sEnd, function(){
						$(this).off();
						$('.dFont4').addClass('dFont4on').on(sEnd, function(){
							$(this).off();
							canSwipeFn();
							if(!bDown){
								bCnoDown = false;
							}
						});
					});
				});
			});
		});
	};
	//第四屏出场
	function dOutFn(){
		$('.dFont0').removeClass('dFont0on');
		$('.dFont1').removeClass('dFont1on');
		$('.dFont2').removeClass('dFont2on');
		$('.dFont3').removeClass('dFont3on');
		$('.dFont4').removeClass('dFont4on');
	};


	function canSwipeFn(){
		bCanMove = true;
		$('.goTop').show();
	};
	function noSwipeFn(){
		bCanMove = false;
		$('.goTop').hide();
	};

	function animTopFn(){
		var $goTopImg = $('.goTopImg'),
			iTopNum = $goTopImg.length - 1,
			oTopTime = null;
		
		oTopTime = setInterval(function(){
			$goTopImg.eq(iTopNum).css({opacity:1});
			if(iTopNum == -1){
				iTopNum = $goTopImg.length - 1;
				$goTopImg.css({opacity:0});
			}else{
				iTopNum--;
			}
		}, 300);
	};
	
	//丝绸之路动画
	function roadAnimFn(iNow){
		var iBLen = iNow == 0?34:41,
			$bRoad = $bImg3Anim.eq(iNow);
		
		clearInterval(bTime);
		bTime = setInterval(function(){
			if(bNum == iBLen){
				clearInterval(bTime);
				bNum = 0;
				myTab.next();
			}else{
				bNum++;
				$bRoad.attr({src:iNow == 0?bImg0[bNum].src:bImg1[bNum].src});
			}
		},100);
		$bImg3Anim.eq(iNow)
	};
});

//单选
function radioFn(id){
	var $ifBoxSex = $('#' + id).find('.ifBoxSex'),
		$inpt = $('#' + id).find('.iInpSex'),
		siInpSex = '.iInpSex',
		od = 'ontouchstart' in window ? 'tap':'click';
	
	$ifBoxSex.on(od, function(){
		$ifBoxSex.find(siInpSex).removeClass('on').removeAttr('checked');
		$(this).find(siInpSex).addClass('on').attr('checked','checked');
	});
	$inpt.on(od, function(e){
		$inpt.removeClass('on').removeAttr('checked');
		$(this).addClass('on').attr('checked','checked');
		e.stopPropagation();
	});
};

function regFn(){
	var $hSub = $('#hSub'),
		$hArea = $('.hArea'),
		od = 'ontouchstart' in window ? 'tap':'click';

	$hSub.on(od, function(){
		$hArea.eq(0).hide();
		$hArea.eq(1).show();
	});

};