var bClick = true;
$(animFn);
function animFn(){
	
	var iNow = 0,
		iIndex = 0,
		$iBg = $(".iBg"),
		iLen = $iBg.length,
		iTop = $iBg.height(),
		$allWrap = $(".allWrap"),
		$goTop = $('.goTop'),
		$audio1 = $('#audio1'),
		audio1 = $('#audio1').get(0),
		$audio2 = $('#audio2'),
		audio2 = $('#audio2').get(0),
		$audio = $('#audio'),
		audio = $('#audio').get(0),
		bCanMove = false,
		bSeven = false, //第八屏动画开关
		bQIdong = false, //启动动画开关
		bJiasu = false, //第9屏动画开关
		iSevenNum = 0;

	var $aFont1 = $('#aFont1'),
		$aFont2 = $('#aFont2'),
		$bImg3 = $(".bImg3"),
		$bImg4 = $(".bImg4"),
		$bImg5 = $(".bImg5");
	
	//第一个动画
	aInFn();
	//dInFn();
	//eInFn();
	//fInFn();
	//canSwipeFn();

	$(document).swipeUp(gotoUpFn).swipeDown(function(e){
		if(!bCanMove||iNow == 0){return;}
		noSwipeFn();
		$allWrap.css({'-webkit-transform': 'translate3d(0px, '+ -iTop * --iNow +'px, 0px)'}).on('webkitTransitionEnd', function(){
			switch(iNow){
				case 0:
					bOutFn();
					aInFn();
					break;
				case 1:
					cOutFn();
					bInFn();
					break;
				case 2:
					dOutFn();
					cInFn();
					break;
				case 3:
					dInFn();
					eOutFn();
					canSwipeFn();
					break;
				case 5:
					gOutFn();
					bQIdong = true;
					break;
				case 6:
					hOutFn();
					break;
				case 7:
					iOutFn();
					bOne = true;
					break;
				case 8:
					iOutFn();
					bJiasu = true;
					break;
				default:
					canSwipeFn();
					break;
			};
			$(this).off();
		});
	});

	function gotoUpFn(e){
		if(!bCanMove|| iNow == iLen-1){return;}
		noSwipeFn();
		$allWrap.css({'-webkit-transform': 'translate3d(0px, '+ -iTop * ++iNow +'px, 0px)'}).on('webkitTransitionEnd', function(){
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
					eInFn();
					break;
				case 5:
					eOutFn();
					bQIdong = true;
					break;
				case 6:
					fOutFn();
					break;
				case 7:
					gOutFn();
					bOne = true;
					break;
				case 8:
					hOutFn();
					bJiasu = true;
					break;
				case 9:
					iOutFn();
					canSwipeFn();
					break;
				case 10:
					bCanMove = true;
					break;
				default:
					canSwipeFn();
					break;
			
			};
			$(this).off();
		});
	}
	
	musicFn();
	document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

	

	//第一屏进场动画
	function aInFn(){
		$aFont1.addClass('aFontAnim').on('webkitAnimationEnd', function(){
			$aFont1.removeClass('aFontAnim').off();
			$aFont2.addClass('aFontAnim2').on('webkitAnimationEnd', function(){
				canSwipeFn();
				$aFont2.off();
			});
		});
	};

	//第一屏出场
	function aOutFn(){
		$aFont2.removeClass('aFontAnim2')
	};
	//第二屏进场动画
	function bInFn(){
		$bImg3.addClass('topShowAnim').on('webkitAnimationEnd', function(){
			$bImg3.off();
			canSwipeFn();
		});
	};
	//第二屏出场
	function bOutFn(){
		$bImg3.removeClass('topShowAnim');
	};
	//第3屏进场动画
	function cInFn(){
		$bImg4.addClass('topShowAnim').on('webkitAnimationEnd', function(){
			$bImg4.off();
			canSwipeFn();
		});
	};
	//第3屏出场
	function cOutFn(){
		$bImg4.removeClass('topShowAnim');
	};
	//第4屏进场动画
	function dInFn(){
		$bImg5.addClass('topShowAnim').on('webkitAnimationEnd', function(){
			$bImg5.off();
			canSwipeFn();
		});
	};
	//第4屏出场
	function dOutFn(){
		$bImg5.removeClass('topShowAnim');
	};

	//第五屏进场
	function eInFn(){
		$('.eImg').each(function(i,e){
			$(e).addClass('eImg'+(i+1)+'on');
		});
		$('.eFont').addClass('eFont6on').on('webkitAnimationEnd', function(){
			$('.eImg').each(function(i,e){
				$(e).removeClass('eImg'+(i+1)+'on');
			});
			$('.eImg').addClass('eRotateAnim2');
			$('.iBgArea').addClass('eRotateAnim');
			
			canSwipeFn();
		});
	};

	//第五屏出场
	function eOutFn(){
		$('.eFont').removeClass('eFont6on');
		$('.eImg').removeClass('eRotateAnim2');
		$('.iBgArea').removeClass('eRotateAnim');
	};

	//第六屏
	var od = 'ontouchstart' in window ? "tap":"click";
	$('.fBtn').on(od, function(){
		if(!bQIdong){return;}
		bQIdong = false;
		$('.fImg2').animate({opacity: 0}, 50);

		audio.pause();
		audio2.play();
		$audio2.on('ended', function(){
			$audio2.off();
			if(bClick){
				audio.play();
			}
			$('.fFont1').animate({'translate3d': '0,-1500px,0'}, 600);
			setTimeout(function(){
				$('.fImg3').animate({'translate3d': '0,-1500px,0'}, 900);
			},200);
			setTimeout(function(){
				$('.fFont').animate({'translate3d': '0,-1500px,0'},1200);
			},300);
			setTimeout(function(){
				canSwipeFn();
				gotoUpFn();
			},400);
			
		});
	});
	
	//第6场出场
	function fOutFn(){
		bQIdong = false;
		setTimeout(function(){
			$('.fImg2').css({opacity: 1});
			$('.fFont,.fFont1,.fImg3').css({'-webkit-transform': 'translate3d(0px, 0, 0px)'});
		},1000);
	};

	//第七屏
	$('.gImgDrag').on({
		'touchstart':function(e){
			$(this).css({zIndex:3}).find('.gMark').show();
		},
		'touchend':function(e){
			$(this).css({zIndex:0}).animate({top: 308,left: 231},300, function(){
				$(this).hide();
				$('.ga2Img').eq($(this).attr('iMyNow')).css('display','inline-block');
			});
		}
	});
	$('.gImgDragSp').on({
		'touchstart':function(e){
			$('.gImg1').css({zIndex:3}).find('.gMark').show();
		},
		'touchend':function(e){
			$('.gImg1').css({zIndex:0}).animate({top: 308,left: 231},300, function(){
				$('.gImg1,.gImgDragSp').hide();
				$('.ga2Img').eq(0).css('display','inline-block');
			});
			
		}
	});
	
	$('#gSub').on(od, function(){
		$('#gArea').hide();
		$('#gArea2').show();
		canSwipeFn();
	});
	//第7屏出场
	function gOutFn(){
		$('#gArea2,.ga2Img,.gMark').hide();
		$('#gArea,.gImgDrag,.gImgDragSp').show();
		$('.gImg1').css({top: 281,left: 26});
		$('.gImg2').css({top: 497,left: 302});
		$('.gImg3').css({top: 488,left: 21});
		$('.gImg4').css({top: 454,left: 183});
		$('.gImg5').css({top: 419,left: 497});
		noSwipeFn();
	};

	/*第八屏*/
	var bOne = true;
	oWidth = 640;
	oHeight = 905;
	
	//刮刮卡插件调用
	jQuery("#scratchpad").wScratchPad({
		width:oWidth,	
		height:oHeight,
		size:80,		
		image:'images/hImg2.jpg',
		image2:'images/hImg1.jpg',    //覆盖层图片
		scratchMove: function(e, percent){
			
			if (percent > 30 && bOne) {
				bOne = false;
				this.clear();
				$('.hImg3').addClass('hImg3Anim').on('webkitAnimationEnd', function(){
					$(this).off();
					$('.hImg5').show().addClass('eImg1on').on('webkitAnimationEnd', function(){
						$(this).off();
						canSwipeFn();
					});
				});
			}

		},
	});

	//第8屏出场
	function hOutFn(){
		jQuery('#scratchpad').wScratchPad('reset');
		bOne = true;
		$('.hImg3').removeClass('hImg3Anim');
		$('.hImg5').hide().removeClass('eImg1on');
	};

	/*第9屏*/
	$('.iImg2').on(od, function(){
		if(!bJiasu){return;}
		bJiasu = false;
		$(this).hide();
		$('.iImg3').animate({top:457,left:180,opacity:0,scale: 0.1}, 4000, 'ease-out-in', function(){
			$(".iImg6").animate({opacity: 0}, 500, 'ease-in', function(){
				$('.iImg5').animate({top:350}, 500, 'ease-in', function(){
					canSwipeFn();
				});
			});
		});
		setTimeout(function(){
			$(".iImg6").animate({opacity: 1}, 80);
		},50);
		audio.pause();
		audio1.play();
		$audio1.on('ended', function(){
			$audio1.off();
			if(bClick){
				audio.play();
			}
		});
	});
	//第9屏出场
	function iOutFn(){
		$('.iImg2').show();
		$('.iImg6').css({opacity: 0});
		$('.iImg5').show().css({top: 0});
		$('.iImg3').css({top:537,left:125,opacity:1,'-webkit-transform': 'scale(1.8)'});
		bJiasu = false;
	};


	function canSwipeFn(){
		bCanMove = true;
		$goTop.show();
	};
	function noSwipeFn(){
		bCanMove = false;
		$goTop.hide();
	};
	
	//碰撞检测
	function hitFn(obj1, obj2){
		var obj1Width = obj1.width(),
			obj1Height = obj1.height(),
			obj2Width = obj2.width(),
			obj2Height = obj2.height(),
			obj1Off = obj1.position(),
			obj2Off = obj2.position(),
			obj1Left = obj1Off.left,
			obj1Right = obj1Off.left + obj1Width,
			obj1Top = obj1Off.top,
			obj1Bot = obj1Off.top + obj1Height,
			obj2Left = obj2Off.left,
			obj2Right = obj2Off.left + obj2Width,
			obj2Top = obj2Off.top,
			obj2Bot = obj2Off.top + obj2Height;
		
		if(obj1Left>obj2Right){
			return false;
		}else if(obj1Right<obj2Left){
			return false;
		}else if(obj1Top>obj2Bot){
			return false;
		}else if(obj1Bot<obj2Top){
			return false;
		}
		return true;
	};

};
//音乐方法
function musicFn(){
	var $iMusic = $(".iMusic"),
		audio = $("#audio").get(0),
		od = 'ontouchstart' in window ? "touchstart":"click";
	$iMusic.on(od, playFn);
	function playFn(){
		if(bClick){
			$iMusic.addClass("iMusicOn");
			audio.pause();
		}else{
			$iMusic.removeClass("iMusicOn");
			audio.play();
		}
		bClick = !bClick;
	}
}

