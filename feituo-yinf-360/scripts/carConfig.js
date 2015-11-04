$(function(){
	tab();
	navFn();
});


function tab(){
	var $ccH3 = $('.ccH3'),
		$ccH3Box = $('.ccH3Box'),
		iNow = 0,
		od = 'ontouchstart' in window ? 'tap':'click';
	
	$ccH3.eq(0).data('bClick',true);

	$ccH3.on(od, function(){
		var $oThis = $(this);
		iNow = $oThis.closest('.ccArea').index()-1;
		if($oThis.data('bClick')){
			$ccH3.removeClass('ccH3On');
			$ccH3Box.hide();
			$ccH3.eq(iNow).data('bClick',null);
		}else{
			$ccH3.removeClass('ccH3On').eq(iNow).addClass('ccH3On');
			$ccH3Box.hide().eq(iNow).show();
			$ccH3.data('bClick',null).eq(iNow).data('bClick',true);
		}
	});

};

function navFn(){
	var $ccTlink = $(".ccTlink"),
		iNow = 0,
		od = 'ontouchstart' in window ? 'tap':'click';
	
	$ccTlink.on(od, function(){
		var $oThis = $(this);
		iNow = $oThis.index();
		console.log(iNow);
		$ccTlink.removeClass('ccTlinkOn').eq(iNow).addClass('ccTlinkOn');

		ajaxFn();

	});
	

};

//ajax
function ajaxFn(){
};