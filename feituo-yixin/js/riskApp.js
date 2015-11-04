$(function(){
	var $allWrap = $("#oBg"),
		$wlAreaCon = $("#allWrap"),
		$iBg = $(".raBg"),
		iLen = $iBg.length,
		iTop = $allWrap.height(),
		iNow = 0,
		od = 'ontouchstart' in window ? 'tap':'click',
		bCanMove = true,
		oMyTime = null,
		bClick1 = false,
		bClick2 = false,
		bClick3 = false,
		bCanMove = true,
		aTim = null,
		aTimNow = 0,
		re = /^[0-9]*$/,
		$raSub = $('#raSub'),
		$raAnim = $('#raAnim'),
		$ra1Btn = $('#ra1Btn'),
		$ra5Box = $('.ra5Box'),
		$ra6Box = $('.ra6Box'),
		$ra7Box = $('.ra7Box'),
		$rahdSpan = $('.rahdSpan'),
		aResult = [-1,-1,-1,-1,-1,-1];

	//开始
	$ra1Btn.on(od, function(){
		gotoUpFn();
		$('.rahd').show();
	});

	//波浪raAnim
	aTim = setInterval(function(){
		if(aTimNow==3){
			aTimNow = 0;
		}else{
			aTimNow++;
		}
		$raAnim.removeClass('raAnim0 raAnim1 raAnim2').addClass('raAnim'+aTimNow);
	},100);

	//选择
	$ra5Box.on(od, function(){
		if($(this).hasClass('raBoxOn')){
			$(this).removeClass('raBoxOn');
			bClick1 = false;
		}else{
			$ra5Box.removeClass('raBoxOn');
			$(this).addClass('raBoxOn');
			bClick1 = true;
			aResult[iNow-1] = $(this).index();
		}
	});
	//选择
	$ra6Box.on(od, function(){
		if($(this).hasClass('raBoxOn')){
			$(this).removeClass('raBoxOn');
			bClick2 = false;
		}else{
			$ra6Box.removeClass('raBoxOn');
			$(this).addClass('raBoxOn');
			bClick2 = true;
			aResult[iNow-1] = $(this).index();
		}
	});
	//选择
	$ra7Box.on(od, function(){
		if($(this).hasClass('raBoxOn')){
			$(this).removeClass('raBoxOn');
			bClick3 = false;
		}else{
			$ra7Box.removeClass('raBoxOn');
			$(this).addClass('raBoxOn');
			bClick3 = true;
			aResult[iNow-1] = $(this).index();
		}
	});

	//提交
	$raSub.on(od, function(){
		if(iNow==6){
			if(!bClick3){
				showErrorFn(iNow);
				return;
			}
		}
		//console.log(aResult);
	});

	//$('.cs').on(od, function(){
		//if(iNow == 0){return;}
		//gotoUpFn();
	//});
	
	//滑动
	$(document).swipeUp(function(){
		if(iNow == 0){return;}
		gotoUpFn();
	});

	function gotoUpFn(e){
		if(!bCanMove|| iNow == iLen-1){return;}
		if(iNow<4&&iNow>0){
			if($('#raInp'+iNow).val() ==''){
				showErrorFn(iNow);
				return;
			}
			if(!re.test($('#raInp'+iNow).val())){
				showErrorFn(iNow,true);
				return;
			}
		}else if(iNow==4){
			if(!bClick1){
				showErrorFn(iNow);
				return;
			}
		}else if(iNow==5){
			if(!bClick2){
				showErrorFn(iNow);
				return;
			}
		}else if(iNow==6){
			if(!bClick3){
				showErrorFn(iNow);
				return;
			}
		}
		if(iNow>0&&iNow<4){
			aResult[iNow-1] = $('#raInp'+iNow).val();
		}
		noSwipeFn();
		$wlAreaCon.anim({ translate3d: '0,'+ -iTop * ++iNow +'px,0' }, 0.5, 'ease-out', function(){
			canSwipeFn();
			if(iNow>0){
				$rahdSpan.removeClass('rahdSpanOn').eq(iNow-1).addClass('rahdSpanOn');
			}
		});
	}
	document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);


	function canSwipeFn(){
		bCanMove = true;
	};
	function noSwipeFn(){
		bCanMove = false;
	};

	function showErrorFn(iNow,noNum){
		var $raEorror = $('.raEorror');
		if(iNow>3){
			$raEorror.html('请选择当前页面的内容');
		}else{
			$raEorror.html('请先填写当前页面的内容');
		}
		if(noNum){
			$raEorror.html('内容格式只能是数字');
		}
		$raEorror.show();
		clearTimeout(oMyTime);
		oMyTime = setTimeout(function(){
			$raEorror.hide();
		},1000);
	};
});