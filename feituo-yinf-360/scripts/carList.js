$(function(){
	tab();
});

function tab(){
	var $cListH2 = $('.cListH2'),
		$clist = $('.clist'),
		$cListH2Img = $('.cListH2Img'),
		$cListBox = $('.cListBox'),
		iNow = 0,
		od = 'ontouchstart' in window ? 'touchend':'click';
	
	$cListH2.eq(0).data('bClick',true);

	$cListH2.on('click', function(){
		var $oThis = $(this);
		iNow = $oThis.closest('.cListBox').index()-1;
		if($oThis.data('bClick')){
			$cListH2Img.removeClass('cListH2ImgOn');
			$clist.hide();
			$cListH2.eq(iNow).data('bClick',null);
		}else{
			$cListH2Img.removeClass('cListH2ImgOn').eq(iNow).addClass('cListH2ImgOn');
			$clist.hide().eq(iNow).show();
			$cListH2.data('bClick',null).eq(iNow).data('bClick',true);
		}
	});

};