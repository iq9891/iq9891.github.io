var bOne = true;
function styleJs(){
	var pingKuan=$(".m_wrapper").width(),
		bili = function(mun){
			var oScale = mun/480;
			return oScale.toFixed(6);
    };

    allX = -pingKuan * bili(70);
    allY = -pingKuan * bili(94);

    $(".allBg").css({
        "height": pingKuan * bili(780),
        "paddingTop": pingKuan * bili(115),
        "backgroundPosition": allX + "px " + allY + "px"
    });
    
	
	//样式重置完成之后
	$(".load").hide();
	$(".m_wrapper").animate({
		"opacity": 1
	});
	$("body").addClass("bg03036e");
	
};


function loaded(){
	setTimeout(function(){styleJs();},300);
}
function hengshuping(){
    if (window.orientation == 180 || window.orientation == 0) { loaded(); $(".rotating").hide(); }
    if (window.orientation == 90 || window.orientation == -90) { loaded(); $(".rotating").show(); }
}
window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", hengshuping, false);
window.addEventListener('load', loaded, false);

