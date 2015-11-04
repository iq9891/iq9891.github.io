$(function(){
	tabFn();
	locatFn();
});

function tabFn(){
	TouchSlide({ 
		slideCell:"#focus",
		titCell:".hd ul",
		mainCell:".bd ul", 
		effect:"left", 
		autoPlay:true,
		autoPage:true,
		switchLoad:"_src"
	});
};

function locatFn(){
	var $arcBtnLink = $(".arcBtnLink"),
		$arcBtn = $(".arcBtn"),
		od = 'ontouchstart' in window ? 'tap':'click';

	$arcBtnLink.on(od, function(){
		var $this = $(this);
		$arcBtn.removeClass("arcBtn0 arcBtn1 arcBtn2").addClass("arcBtn" + $this.index());
		setTimeout(function(){
			window.location.href = $this.attr("_href");
		},200);
	});


};