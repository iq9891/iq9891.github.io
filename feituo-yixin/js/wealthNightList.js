var myScroll = new IScroll('#elBox', { mouseWheel: true, click: true }),
	$elHeaderBtn = $('.elHeaderBtn'),
	$elHeaderInfo = $('.elHeaderInfo'),
	$elBoxArea = $('.elBoxArea'),
	$li = $('.wnlArea li'),
	$elBox = $('.wnlBox'),
	$elHeader = $('.elHeader'),
	od = 'ontouchstart' in window ? 'tap':'click',
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
	myScroll.refresh();
	bOne = !bOne;

	
});

$li.on('click', function(){
	window.location.href = $(this).attr('_href');
});