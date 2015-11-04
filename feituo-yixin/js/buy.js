var myScroll1,myScroll2,myScroll3;

$(function(){
	var $mask = $('#mask'),
		$mask1 = $('#mask1'),
		$oSuccess = $('#oSuccess'),
		$bSubTk = $('#bSubTk'),
		$bBtn = $('#bBtn'),
		$oSub = $('#oSub'),
		bOpen = true,
		od = 'ontouchstart' in window ? 'tap':'click';

	$mask.css({height:$(window).height()});
	$mask1.css({height:$(window).height()});
	
	$bBtn.on(od, function(){
		$mask.show();
		$bSubTk.show();
	});
	$oSub.on(od, function(){
		if(!bOpen){return;}
		bOpen = false;
		$oSuccess.show();
		$mask1.show();
		setTimeout(hideTkFn,2000);
	});

	function hideTkFn(){
		bOpen = true;
		$mask1.hide();
		$oSuccess.hide();
	};
	
	gundong();
	tab();
});

function gundong(){
	myScroll1 = new IScroll('#bTabArea1', { mouseWheel: true, click: true });
	myScroll2 = new IScroll('#bTabArea2', { mouseWheel: true, click: true });
	myScroll3 = new IScroll('#bTabArea3', { mouseWheel: true, click: true });
	
	document.getElementById('bTab').addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

};

function tab(){
	var od = 'ontouchstart' in window ? 'tap':'click',
		$bNavArea = $('.bNavArea'),
		$bTabArea = $('.bTabArea');

	$bNavArea.on(od, function(){
		var iNow = $(this).index();
		$bNavArea.removeClass('bNavAreaOn').eq(iNow).addClass('bNavAreaOn');
		$bTabArea.hide().eq(iNow).show();
		if(iNow==0){
			myScroll1.refresh();
		}else if(iNow==1){
			myScroll2.refresh();
		}else if(iNow==2){
			myScroll3.refresh();
		}
	});

};