define(function(require, exports, module) { 
	
    function init(){

		var bCanMove = true,
			iNow = -1,
			$scroll = $(".scroll"),
			$scrollArea = $(".scrollArea"),
			$doc = $(document),
			iTop = $scrollArea.height(),
			iPer = 1067,
			iLen = $scrollArea.length,
			$iMerge = $(".iMerge"),
			$iMerge0 = $(".iMerge0"),
			$iMerge1 = $(".iMerge1"),
			$iMerge2 = $(".iMerge2"),
			$goTop = $(".goTop"),
			$iShare = $(".iShare"),
			$mask = $(".mask"),
			$info = $(".iInfo"),
			$iInfoClose = $(".iInfoClose"),
			$iBtn1 = $(".iBtn1"),
			$iBtn3 = $(".iBtn3"),
			$iSA0Info = $(".iSA0Info"),
			$logo = $(".logo"),
			$iBtn = $(".iBtn"),
			iAllPage = ($iMerge.height() / iPer-2)>>0,
			i5PageHeight = 832,
			sEnd = 'webkitTransitionEnd',
			_win = window,
			od = 'ontouchstart' in _win ? "tap":"click";
		//针对iphone4适配
		if($(_win).height() == i5PageHeight){
			var iCha = 1008 - $(_win).height();
			$iSA0Info.css({top:parseInt($iSA0Info.css("top")) - iCha});
			$iMerge.css({top:parseInt($iMerge.css("top")) - iCha + 140});
			$iBtn.each(function(i,e){
				$(e).css({top:parseInt($(e).css("top")) - iCha + 180});
			})
		}
		$doc.swipeUp(function(e){
			if(iNow == iAllPage+1 || !bCanMove){return;}
			bCanMove = false;
			//console.log(iNow +"+"+ (iAllPage+1));
			if(iNow == iAllPage){
				$goTop.hide();
			}
			if(iNow == -1){
				$scroll.css({ marginTop: -iTop * (++iNow+1) +'px' });
				$doc.on('webkitTransitionEnd', upEndFn);
				showLogoFn();
			}else{
				showLogoFn();
				$iMerge0.anim({ translate3d: '0,'+ -iPer * ++iNow +'px,0' }, 0.8, 'ease');
				$iMerge1.anim({ translate3d: '0,'+ -iPer * iNow +'px,0' }, 1.1, 'ease');
				$iMerge2.anim({ translate3d: '0,'+ -iPer * iNow +'px,0' }, 1.35, 'ease',function(){
					bCanMove = true;
				});
			}
		}).swipeDown(function(e){
			//console.log(iNow +"+"+bCanMove);
			if(iNow == -1 || !bCanMove){return;}
			bCanMove = false;
			if(iNow == iAllPage+1){
				$goTop.show();
			}
			
			if(iNow == 0){
				$scroll.css({ marginTop: -iTop * (--iNow+1) +'px' });
				$doc.on('webkitTransitionEnd', downEndFn);
				hideLogoFn();
			}else{
				showLogoFn();
				$iMerge0.anim({ translate3d: '0,'+ -iPer * --iNow +'px,0' }, 0.8, 'ease');
				$iMerge1.anim({ translate3d: '0,'+ -iPer * iNow +'px,0' }, 1.1, 'ease');
				$iMerge2.anim({ translate3d: '0,'+ -iPer * iNow +'px,0' }, 1.35, 'ease',function(){
					bCanMove = true;
				});
			}
		});
		
		function upEndFn(){
			bCanMove = true;
			$doc.off('webkitTransitionEnd', upEndFn);
		}
		function downEndFn(){
			bCanMove = true;
			$doc.off('webkitTransitionEnd', downEndFn);
		}
		document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
		
		function showLogoFn(){
			$logo.show();
		};
		function hideLogoFn(){
			$logo.hide();
		};

		//点击分享
		$iBtn1.on(od, function(){
			showShareFn();
			showMaskFn();
		});
		$iShare.on(od, function(){
			hideShareFn();
			hideMaskFn();
		});
		function showMaskFn(){
			$mask.show();
			bCanMove = false;
		};
		function hideMaskFn(){
			$mask.hide();
			bCanMove = true;
		};
		function showShareFn(){
			$iShare.show();
		};
		function hideShareFn(){
			$iShare.hide();
		};
		function showInfoFn(){
			$info.show();
		};
		function hideInfoFn(){
			$info.hide();
		};
		
		//点击活动详情
		$iBtn3.on(od, function(){
			showMaskFn();
			showInfoFn();
		});
		$iInfoClose.on(od, function(){
			hideInfoFn();
			hideMaskFn();
		});
    }
  
    exports.init = init;  
      
});