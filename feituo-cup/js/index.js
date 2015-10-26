window.addEventListener('load', loadFn, false);
//预加载
function loadFn(){
	var iLoadNow = 0,
		i = 0,
		iLoadSacle = 0,
		aLoadImg = [
			'./images/yTop.png',
			'./images/aFont.png',
			'./images/aImg0.jpg',
			'./images/aImg1.jpg',
			'./images/aImg2.jpg',
			'./images/aMove.png',
			'./images/dBg.jpg',
			'./images/dCup.png',
			'./images/dRe0.png',
			'./images/dRe1.png',
			'./images/dRe2.png',
			'./images/dRound.png',
			'./images/eBg.jpg',
			'./images/eBtn.png',
			'./images/eImg0.jpg',
			'./images/eImg1.jpg',
			'./images/eImgC0.png',
			'./images/eImgC1.png',
			'./images/eImgC2.png',
			'./images/eImgC3.png',
			'./images/eImgC4.png',
			'./images/eImgC5.png',
			'./images/eImgC6.png',
			'./images/eImgC7.png',
			'./images/eImgC8.png',
			'./images/eImgC9.png',
			'./images/eImgC10.png',
			'./images/eImgC11.png',
			'./images/eImgC12.png',
			'./images/eImgC13.png',
			'./images/eImgC14.png',
			'./images/fCupTop.jpg',
			'./images/fImg.png',
			'./images/fImg1.png',
			'./images/fImg2.png',
			'./images/fImg3.jpg',
			'./images/gBg.jpg',
			'./images/gFont.png',
			'./images/gIce0.png',
			'./images/gIce1.png',
			'./images/gImg0.png',
			'./images/gImg1.png',
			'./images/hBeforeTip.png',
			'./images/hImg0.jpg',
			'./images/hImg1.jpg',
			'./images/hStar.png',
			'./images/iCode.jpg',
			'./images/iImg.png',
			'./images/iNum.png',
			'./images/loadCup.png',
			'./images/yMusic.png'
		],
		bLoaded =false,
		$loadWater = $('#loadWater'),
		$loadProgress = $('#loadProgress'),
		iLoadImgLen = aLoadImg.length;

		
    //防止load失败1分半
    setTimeout(function () {if (!bLoaded) { afterLoad();} }, 90000);
		
	for(i=0, l = iLoadImgLen; i < l; i++){
		(function(i){
			var yImg = new Image();
			yImg.onload = function(){
				iLoadNow++;
				progressFn(parseInt(iLoadNow / iLoadImgLen * 
				100));
				//完成以后
				if(iLoadNow == iLoadImgLen){
					bLoaded = true;
					afterLoad();
				}
			};
			yImg.src = aLoadImg[i];
		})(i)
	}

	//加载进度
	function progressFn(cent){
		$loadProgress.html(cent + "%");
		$loadWater.css({'top': 377 - cent*4.07});
	}
	function afterLoad(){
		$("#loadBox").hide();
		$("#oBg,.goTop").show();
		allFn();
	}
};
//$(allFn);
function allFn(){
	var $allWrap = $("#oBg"),
		$wlAreaCon = $("#allWrap"),
		$iBg = $(".ciConBg"),
		$slideConImg = $('.slideConImg'),
		iLen = $iBg.length,
		iTop = $allWrap.height(),
		iNow = 0,
		bCanMove = false,
		bClick = true,//音乐开关
		bCnoUp = false,//上
		bCnoDown = false,//下
		iPerperNow = 0,
		bDis = false,	//第4针可以点击
		bFis = false,	//第6针可以点击
		iFNum = 0,	//第6针计数
		aFHandPos = [276,417,558],//第6针手的位置
		aDpos = [0,1,2],
		oITim = null,//9定时器
		od = 'ontouchstart' in window ? 'tap':'click',
		sEnd = 'webkitAnimationEnd',
		sEnd2 = 'webkitTransitionEnd';
	
	//添加第四针温度随机提示
	var iReload = localStorage.getItem('pageLoadCount');
	if(iReload){
		aDpos.splice(iReload,1);
		var iDnow = aDpos[Math.floor(Math.random()*2)];
	}else{
		var iDnow = aDpos[Math.floor(Math.random()*3)];
	}
	localStorage.setItem('pageLoadCount',iDnow);
	$('.dRe').addClass('dRe'+iDnow);

	//音乐
	musicFn();

	aInFn();

	//滑动
	$(document).swipeUp(function(){
		gotoUpFn();
	}).swipeDown(function(){
		gotoDownFn();
	});

	function gotoUpFn(e){
		if(!bCanMove){return;}
		noSwipeFn();
		if(bCnoUp){
			if(iPerperNow==0){
				bCnoDown = true;
				aOutFn();
			}else if(iPerperNow==1){
				bcOutFn(iPerperNow, -1);
			}
			iPerperNow++;
			if(iPerperNow==2){
				bCnoUp = false;
			}
		}else{
			if(iNow == iLen-1){return;}
			$wlAreaCon.css({'-webkit-transform':'translate3d(0,'+ -iTop * ++iNow +'px,0)'}).on(sEnd2,function(){
				switch(iNow){
					case 1:
						bcOutFn(2,-2);
						dInFn();
						bCnoDown = false;
						break;
					case 2:
						dOutFn();
						eInFn();
						break;
					case 3:
						eOutFn();
						fInFn();
						break;
					case 4:
						fOutFn();
						gInFn();
						break;
					case 5:
						gOutFn();
						hInFn();
						break;
					case 6:
						hOutFn();
						break;
				}
				$(this).off();
			});
		}
	}
	function gotoDownFn(e){
		if(iNow==6){bCanMove = true;}
		if(!bCanMove||iPerperNow==0){return;}
		noSwipeFn();
		if(bCnoDown){
			if(iPerperNow==1){
				bcOutFn(iPerperNow,0);
				bCnoUp = true;
				bCnoDown = false;
			}else if(iPerperNow==2){
				bcOutFn(iPerperNow,1);
				bCnoUp = true;
			}
			iPerperNow--;
			if(iPerperNow==0){
				bCnoDown = false;
			}
		}else{
			if(iNow == 0){return;}
			$wlAreaCon.css({'-webkit-transform':'translate3d(0,'+ -iTop * --iNow +'px,0)'}).on(sEnd2,function(){
				switch(iNow){
					case 0:
						bcInFn(2);
						bCnoDown = true;
						dOutFn();
						canSwipeFn();
						break;
					case 1:
						eOutFn();
						dInFn();
						break;
					case 2:
						fOutFn();
						eInFn();
						break;
					case 3:
						gOutFn();
						fInFn();
						break;
					case 4:
						hOutFn();
						gInFn();
						break;
					case 5:
						hInFn();
						break;
				}
				$(this).off();
			});
		}
	}
	document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
	
	//第一屏
	function aInFn(){
		$('.aHand').addClass('aHandAnim');
		$('.aCup').addClass('aCupAnim').on(sEnd, function(){
			$(this).off();
			$('.aRoundBox').addClass('aRoundBoxAnim');
			$('.aImg0').addClass('aImgIn').on(sEnd, function(){
				$(this).off().css({top:230,opacity:1}).removeClass('aImgIn');
			});
			$('.aFontBox0').addClass('aFontBoxIn');
			$('.aH40').on(sEnd, function(){
				$(this).off();
				$('.aFontBox0 .aFontBoxH').css({'-webkit-transform': 'translate3D(0,0,0)'});
				$('.aFontBox0').removeClass('aFontBoxIn');
				$('.aSmallCup').addClass('show').on(sEnd, function(){
					$(this).off();
					canSwipeFn();
					bCnoUp = true;
				});	
			});
		});
	};
	function aOutFn(){
		$('.aImg0').addClass('aImgOut').on(sEnd, function(){
			$(this).off().css({top:210,opacity:0}).removeClass('aImgOut');
		});
		$('.aFontBox0').addClass('aFontBoxOut').on(sEnd, function(){
			$(this).off();
			$('.aFontBox0 .aFontBoxH').css({'-webkit-transform': 'translate3D(-400px,0,0)'});
			$('.aFontBox0').removeClass('aFontBoxOut');
			bcInFn(1);
		});
	};
	function bcInFn(iNow){
		$('.aImg'+iNow).addClass('aImgIn').on(sEnd, function(){
			$(this).off().css({top:230,opacity:1}).removeClass('aImgIn');
		});
		$('.aFontBox'+iNow).addClass('aFontBoxIn');
		$('.aH4'+iNow).on(sEnd, function(){
			$(this).off();
			$('.aFontBox'+iNow+' .aFontBoxH').css({'-webkit-transform': 'translate3D(0,0,0)'});
			$('.aFontBox'+iNow).removeClass('aFontBoxIn').on(sEnd, function(){
				$(this).off();
				canSwipeFn();
			});	
		});
	};
	
	function bcOutFn(iNow,bDownNum){
		$('.aImg'+iNow).addClass('aImgOut').on(sEnd, function(){
			$(this).off().css({top:210,opacity:0}).removeClass('aImgOut');
		});
		$('.aFontBox'+iNow).addClass('aFontBoxOut').on(sEnd, function(){
			$(this).off();
			$('.aFontBox'+iNow+' .aFontBoxH').css({'-webkit-transform': 'translate3D(-400px,0,0)'});
			$('.aFontBox'+iNow).removeClass('aFontBoxOut');
			if(bDownNum!=-1){
				bcInFn(bDownNum);
			}else if(bDownNum==-2){
			}else{
				bcInFn(2);
			}
		});
	};
	
	//第四屏
	function dInFn(){
		$('.dH2').addClass('dH2In').on(sEnd, function(){
			$(this).off();
			$('.dCup').addClass('dCupIn').on(sEnd, function(){
				$(this).off();
				$('.dRoundBox').addClass('dRoundBoxIng');
				$('.dTip,.dRoundBox').show();
				bDis = true;
			});
		});
	};
	function dOutFn(){
		$('.dH2').removeClass('dH2In')
		$('.dCup').removeClass('dCupIn')
		$('.dRoundBox').removeClass('dRoundBoxIng');
		$('.dTip,.dRoundBox').hide();
		$('.dRe').hide();
		bDis = false;
	};
	
	//5
	function eInFn(){
		$('.eImgC').addClass('eImgCIn');
		$('.eImgC14').on(sEnd, function(){
			$(this).off();
			$('.eImgCb').css({opacity:1});
			canSwipeFn();
		});
	}
	function eOutFn(){
		$('.eImgC').removeClass('eImgCIn');
		$('.eImgCb').css({opacity:0});
		$('.eImgC1,.eImgC13,.eImgC14').css({'backgroundPosition':'0 0',zIndex:0});
		$('.eImgB').removeClass('eImgB0 eImgB1 eImgB2 eImgB3');
	};

	//6
	function fInFn(){
		$('.fH2').addClass('fH2In').on(sEnd, function(){
			$(this).off();
			$('.fArea').addClass('show');
			bFis = true;
			canSwipeFn();
		});
	};
	function fOutFn(){
		$('.fH2').removeClass('fH2In')
		$('.fArea').removeClass('show');
		$('.fCupCon').removeClass('fCupCon0 fCupCon1 fCupCon3');
		$('.fBtn').show();
		$('.fHand').css({top:135}).show().attr('_self',0);
		$('.fCupTop').removeClass('show');
		$('.fArea').css({marginLeft:0});
		$('.fEnd').css({height:0});
		bFis = false;
		iFNum = 0;
	};
	//7
	function gInFn(){
		$('.gH2').addClass('gH2In').on(sEnd, function(){
			$(this).off();
			$('.gIceberg2').addClass('gIceberg2In');
			$('.gCup').addClass('gCupIn').on(sEnd, function(){
				$(this).off();
				$('.gIce0').addClass('gIceIn').on(sEnd, function(){
					$(this).off();
					$('.gIce1').addClass('gIceIn').on(sEnd, function(){
						$(this).off();
						$('.gCool').addClass('gCoolIn').on(sEnd, function(){
							$(this).off();
							canSwipeFn();
						});
					})
					
				})
			})
		});
	}
	function gOutFn(){
		$('.gH2').removeClass('gH2In');
		$('.gCup').removeClass('gCupIn');
		$('.gCool').removeClass('gCoolIn');
		$('.gIceberg2').removeClass('gIceberg2In');
		$('.gIce0,.gIce1').removeClass('gIceIn');
	};
	//8
	function hInFn(){
		$('.hH2').addClass('hH2In').on(sEnd, function(){
			$(this).off(); 
			$('.hBeforeTip').addClass('show').on(sEnd, function(){
				$(this).off().css({opacity:1}).removeClass('show');
			});
		});
	};
	function hOutFn(){
		$('.hH2').removeClass('hH2In');
		$('.hStarBox').hide();
		jQuery('#hScratchpad').wScratchPad('reset');
		$('.hAfterTip').removeClass('show');
		$('.hBeforeTip').css({opacity:0});
	};

	//第四针事件
	$('.dRoundBox').on(od, function(){
		if(bDis){$('.dTip,.dRoundBox').hide();$('.dRe').show();canSwipeFn();}		
	});
	
	//第五针事件
	$('.eBtn').on(od, function(){
		var _eSelf = $(this).attr('_Self'),
			_eShow = $(this).attr('_Show');
		$('.eImgA').removeClass('eImgA0 eImgA1 eImgA2 eImgA3');
		$('.eImgB').removeClass('eImgB0 eImgB1 eImgB2 eImgB3');
		$('.eImgB').addClass('eImgB'+_eSelf);
		$('.eImgC1,.eImgC13,.eImgC14').css({'backgroundPosition':'0 0',zIndex:0});
		$('.eImgC'+_eShow).css({'backgroundPosition':'-640px 0'});
		if(_eShow == 1){
			$('.eImgC'+_eShow).css({zIndex:2});
		}
	});
	
	//6事件
	$('.fBtn,.fHand').on(od, function(){
		if(!bFis){return;}
		var _fSelf = $(this).attr('_self');
		if(_fSelf == iFNum){
			$('.fCupCon').removeClass('fCupCon0 fCupCon1 fCupCon2').addClass('fCupCon'+_fSelf);
			$('.fBtn').eq(_fSelf).hide();
			$('.fHand').css({top:aFHandPos[iFNum]});
			iFNum++;
			$('.fHand').attr('_self',iFNum);
			if(iFNum == 4){
				$('.fHand').hide();
				$('.fCupTop').addClass('show').on(sEnd, function(){
					$(this).off();
					$('.fArea').css({marginLeft:301}).on(sEnd2, function(){
						$(this).off();
						$('.fEnd').css({height:119}).on(sEnd2, function(){
							$(this).off();
							$('.fEnd').css({height:238}).on(sEnd2, function(){
								$(this).off();
								$('.fEnd').css({height:357}).on(sEnd2, function(){
									$(this).off();
									$('.fEnd').css({height:476}).on(sEnd2, function(){
										$(this).off();
										$('.fEnd').css({height:577}).on(sEnd2);
									});
								});
							});
						});
					});
				});
			}
		}
	});

	//8
	oWidth=410;
    oHeight=630;
	jQuery("#hScratchpad").wScratchPad({
			width:oWidth,	
		    height:oHeight,
			size:50,		
            image:'images/hImg1.jpg',
			image2:'images/hImg0.jpg',
            scratchMove: function(e, percent){
               if(percent>=15){
					this.clear();
					$('.hStarBox').show();
					$('.hAfterTip').addClass('show');
					$('.hBeforeTip').css({opacity:0});
					canSwipeFn();
				}
            },
        });
	

	//9
	$('.iCode').on(od, function(){
		$('.iCode').hide();
		$('.mask,.bigCode').show();
	});
	$('.mask').on(od, function(){
		$('.iCode').show();
		$('.mask,.bigCode').hide();
	});

	function canSwipeFn(){
		bCanMove = true;
		$('.goTop').show();
	};
	function noSwipeFn(){
		bCanMove = false;
		$('.goTop').hide();
	};

	function TimeTo(dd){
		var t = new Date(dd),
			n = new Date().getTime(),
			c = t - n;
		if(c<=0){
			clearInterval(oITim);
			$('#hour0,#hour1,#min0,#min1,#sec0,#sec1').css({backgroundPosition:'0 0'});
			return;
		}
		var ds = 60*60*24*1000,
			d = parseInt(c/ds),
			h = parseInt((c-d*ds)/(3600*1000)),
			m = parseInt((c - d*ds - h*3600*1000)/(60*1000)),
			s = parseInt((c-d*ds-h*3600*1000-m*60*1000)/1000);
			if(d>=1){
				h = h+ d*24;
			}
			h = h + '';
			m = m + '';
			s = s + '';
			$('#hour0').css({backgroundPosition:'0 -'+h.charAt(0)*140+'px'});
			$('#hour1').css({backgroundPosition:'0 -'+h.charAt(1)*140+'px'});
			$('#min0').css({backgroundPosition:'0 -'+m.charAt(0)*140+'px'});
			$('#min1').css({backgroundPosition:'0 -'+m.charAt(1)*140+'px'});
			$('#sec0').css({backgroundPosition:'0 -'+s.charAt(0)*140+'px'});
			$('#sec1').css({backgroundPosition:'0 -'+s.charAt(1)*140+'px'});
	}
	oITim = setInterval(function(){
		TimeTo('2015/6/28 00:00:00');
    },1000);
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
};

