var aLoadImg = [
	//'http://wx.fractalist.cn/h5/InfiDemo/InfiDemo1/images/tip.png'
	'images/aImg.jpg',
	'images/aImg1.png',
	'images/bImg.jpg',
	'images/bImg1.png',
	'images/bImg2.png',
	'images/bImg3.png',
	'images/cImg.jpg',
	'images/cImg1.png',
	'images/cImg2.png',
	'images/dHandle0.png',
	'images/dImg.jpg',
	'images/dImg1.png',
	'images/eImg.jpg',
	'images/eImg1.png?a=6',
	'images/eImg2.png?a=6',
	'images/eImg11.png?a=6',
	'images/eImg22.png?a=6',
	'images/fImg.jpg',
	'images/gImg.jpg',
	'images/gImg1.png',
	'images/loadBg.jpg',
	'images/loadLogo.png',
	'images/yTop.png',
	'images/yTop2.png'
];
window.onload = function(){
	loadFn();
};

//进度条加载
function loadFn(){
	var points = document.getElementById('points'),
		rount = document.getElementById('rount'),
		rount2 = document.getElementById('rount2'),
		dian = document.getElementById('dian'),
		loadNum = document.getElementById('loadNum'),
		$dian = $('.dian'),
		bLoaded = false;
		r = 98,
		iNow = 0;
	setTimeout(function () {
        if (!bLoaded) {
            afterLoad();
        }
    }, 20000);
	for(i=0, l = aLoadImg.length; i < l; i++){
		(function(i){
			var yImg = new Image();
			
			yImg.onload = function(){
				
				iNow++;
				progressFn(parseInt(iNow / aLoadImg.length * 
				100));
				
				//完成以后
				if(iNow == aLoadImg.length){
					bLoaded = true;
					setTimeout(afterLoad,500);
				}
				
			};

			yImg.src = aLoadImg[i];
		})(i)
	}

	//加载进度
	function progressFn(n){
		var iDeg = n*3.6,
			iLeft = $dian.position().left;
		if(n<=50){
			rount.style.webkitTransform="rotate(" + 3.6*n + "deg)";
			rount2.style.display="none";
		}else{
			rount.style.webkitTransform="rotate(180deg)";
			rount2.style.display="block";
			rount2.style.webkitTransform="rotate(" + 3.6*(n-50) + "deg)";
		}
		loadNum.innerHTML = n + "%";
		$('.dian').animate({
			left:Math.sin(iDeg*Math.PI/180) * r + 94,
			top:r - Math.cos(iDeg*Math.PI/180) * r - 3
		},50);
		//dian.style.left= Math.sin(iDeg*Math.PI/180) * r + 94+'px';
		//dian.style.top= r - Math.cos(iDeg*Math.PI/180) * r + -3+'px';
	}
	
	function afterLoad(){
		$(".load").addClass('hideAnim').on('webkitAnimationEnd', function(){
			$(".load").hide();
			animFn();
		});
	};
}

//$(animFn);
function animFn(){
	
	var iNow = 0,
		iIndex = 0,
		$iBg = $(".iBg"),
		iLen = $iBg.length,
		iTop = $iBg.height(),
		$allWrap = $(".allWrap"),
		$goTop = $('.goTop'),
		sEnd = 'webkitAnimationEnd',
		bCanMove = false;
	
	//第一个动画
	aInFn();
	
	//$('.cs1').on('click', gotoUpFn);
	//$('.cs2').on('click', gotoDownFn);
	$(document).swipeUp(gotoUpFn).swipeDown(gotoDownFn);

	function gotoUpFn(e){
		if(!bCanMove|| iNow == iLen-1){return;}
		noSwipeFn();
		
		$allWrap.anim({ translate3d: '0,'+ -iTop * ++iNow +'px,0' }, 0.5, 'ease-out', function(){
			setTimeout(function(){
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
						canSwipeFn();
						break;
					case 6:
						break;
					default:
						canSwipeFn();
						break;
				
				};
			},500);
		});
		
	}

	function gotoDownFn(e){
		if(iNow==6){canSwipeFn();}
		if(!bCanMove||iNow == 0){return;}
		noSwipeFn();
		
		$allWrap.anim({ translate3d: '0,'+ -iTop * --iNow +'px,0' }, 0.5, 'ease-out', function(){
			setTimeout(function(){
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
						eOutFn();
						dInFn();
						break;
					case 4:
						console.log(1);
						eInFn();
						break;
					default:
						canSwipeFn();
						break;
				};
				
			},500);
		});
	
	}
	
	document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

	//第一屏进场动画
	function aInFn(){
		$('.aImg1').addClass('aImg1Anim').on(sEnd, function(){
			canSwipeFn();
		});
	};

	//第一屏出场
	function aOutFn(){
		$('.aImg1').removeClass('aImg1Anim');
	};
	//第2屏进场动画
	function bInFn(){
		$('.bFont2').addClass('bFont2Anim').on(sEnd, function(){
			$('.bMoney').addClass('bMoneyAnim').on(sEnd, function(){
				$('.bFont').addClass('bFontAnim').on(sEnd, function(){
					$('.bArrow').addClass('bArrowAnim').on(sEnd, function(){
						canSwipeFn();
					});
				});
			});
		});
	};

	//第2屏出场
	function bOutFn(){
		$('.bFont2').removeClass('bFont2Anim');
		$('.bMoney').removeClass('bMoneyAnim');
		$('.bFont').removeClass('bFontAnim');
		$('.bArrow').removeClass('bArrowAnim');
	};
	//第3屏进场动画
	function cInFn(){
		$('.cImg1').addClass('bFont2Anim').on(sEnd, function(){
			$('.cImg2').addClass('cImg2Anim');
			$('.cImg3').addClass('cImg3Anim');
			$('.cImg4').addClass('cImg4Anim');
			canSwipeFn();
		});
	};

	//第3屏出场
	function cOutFn(){
		$('.cImg1').removeClass('bFont2Anim');
		$('.cImg2').removeClass('cImg2Anim');
		$('.cImg3').removeClass('cImg3Anim');
		$('.cImg4').removeClass('cImg4Anim');
	};
	//第4屏进场动画
	function dInFn(){
		$('.dImg1').addClass('dImg1Anim').on(sEnd, function(){
			$('.dImg2').addClass('dImg2Anim');
			canSwipeFn();
		});
	};

	//第4屏出场
	function dOutFn(){
		$('.dImg1').removeClass('dImg1Anim');
		$('.dImg2').removeClass('dImg2Anim');
	};
	//第5屏进场动画
	function eInFn(){
		//$('.eImg2').addClass('eImg2Anim');
		canSwipeFn();
	};

	//第5屏出场
	function eOutFn(){
		$('.eImg2').removeClass('eImg2Anim');
	};

	function canSwipeFn(){
		bCanMove = true;
		if(iNow>0){
			$goTop.addClass('goTopOn');
		}else{
			$goTop.removeClass('goTopOn');
		}
		$goTop.show();
	};
	function noSwipeFn(){
		bCanMove = false;
		$goTop.hide();
	};
	

};
