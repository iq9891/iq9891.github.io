$(function(){
	tabFn();
	menuHandleFn();
});
//可以关闭
var bCan = true;
//焦点图
function tabFn(){
	TouchSlide({ 
		slideCell:"#focus",
		titCell:".hd ul", //开启自动分页 autoPage:true ，此时设置 titCell 为导航元素包裹层
		mainCell:".bd ul", 
		effect:"left", 
		//autoPlay:true,//自动播放
		autoPage:true, //自动分页
		switchLoad:"_src" //切换加载，真实图片路径为"_src" 
	});
};

//菜单操作
function menuHandleFn(){
	var $iListLi = $('.iListLi'),
		$iList = $('.iList'),
		$iOff = $('.iOff'),
		$iNavBtn = $('.iNavBtn'),
		od = 'ontouchstart' in window ? 'tap':'click';
	
	//菜单显示
	$iListLi.on('click',function(e){
		var iNow = $(this).index();
		$(this).addClass('iListLiOn').on('webkitAnimationEnd', iListLiAnimEnd);
		function iListLiAnimEnd(){
			if(iNow == 1){
				window.location.href = $(this).attr('_href');
			}else{
				bCan = false;
				showTkFn(iNow);
			}
			$(this).off('iListLiAnimEnd').removeClass('iListLiOn');
		}
		e.stopPropagation();
	});
	
	//菜单关闭
	$iOff.on('click', function(){
		if(!bCan){
			return;
		}
		var oPar = $(this).closest('.iNav'),
			iNow = oPar.attr('iNow');
		oPar.addClass('Anim'+ oPar.attr('iNow') +'off');
		$('.Anim'+iNow+'off').find('.iNavFont0').on('webkitAnimationEnd', hideOver);
		$('.Anim'+iNow+'off').find('.iNavFont5').on('webkitAnimationEnd', hideOver);
		$('.Anim'+iNow+'off').find('.iNavFont9').on('webkitAnimationEnd', hideOver); 
		
		function hideOver(){
			var oNow = $('#iNav'+iNow);
			$(this).off();
			oNow.removeClass('Anim'+iNow+'off').hide();
			oNow.find('.iNavBtn').css({opacity:0});
			oNow.find('.iLine').css({opacity:0});
			oNow.find('.iNavFontBg').css({opacity:0});
			$('#iMask').addClass('hideAnim').on('webkitAnimationEnd', function(){
				$(this).off().css({opacity:0}).hide().removeClass('hideAnim');
			});
		}
	});
	
	//页面跳转
	$iNavBtn.on('click', function(){
		var _this = $(this);
		if(_this.attr('_href')){
			_this.addClass('iNavBtn'+_this.attr('iNow')+'on');
			setTimeout(function(){
				window.location.href = _this.attr('_href');
			},300);
		}
	});

};

//显示
function showTkFn(iNow){
	var oNow = $('#iNav'+iNow);
	$('#iMask').show().addClass('showAnim').on('webkitAnimationEnd', function(){
		$(this).off().css({opacity:1}).removeClass('showAnim');
		oNow.show().addClass('Anim'+ iNow +'on');
		$('.Anim'+iNow+'on').find('.iNavFont4').on('webkitAnimationEnd', showOver);
		$('.Anim'+iNow+'on').find('.iNavFont8').on('webkitAnimationEnd', showOver);
		$('.Anim'+iNow+'on').find('.iNavFont11').on('webkitAnimationEnd', showOver); 
	});

	function showOver(){
		$(this).off();
		oNow.removeClass('Anim'+iNow+'on');
		oNow.find('.iNavBtn').css({opacity:1});
		oNow.find('.iLine').css({opacity:1});
		oNow.find('.iNavFontBg').css({opacity:1});
		bCan = true;
	}
};