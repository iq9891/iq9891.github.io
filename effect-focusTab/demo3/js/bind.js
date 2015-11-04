var pingKuan,bOne = true;
var bili = function (mun) {
    var oScale = mun / 480;
    return oScale.toFixed(8);
};
function quanBujs() {
    pingKuan = $("#demo").width();
    $("#demo").css({
        "height": pingKuan * bili(756)
    });
    $(".logo").css({
        "width": pingKuan * bili(156),
        "height": pingKuan * bili(120),
        "padding-top": pingKuan * bili(32),
        "padding-bottom": pingKuan * bili(120)
    });
  
    $(".bBox").css({
        "width": pingKuan * bili(370),
        "height": pingKuan * bili(40),
        "marginBottom": pingKuan * bili(30)
    });
    $(".bInp").css({
        "width": pingKuan * bili(300),
        "paddingLeft": pingKuan * bili(56),
        "paddingRight": pingKuan * bili(14),
        "lineHeight": pingKuan * bili(40) + 'px'
    });
	
    $(".bBtn").css({
        "width": pingKuan * bili(88),
        "height": pingKuan * bili(166),
        "right": pingKuan * bili(44)
    });
    $(".bBtnFont").css({
        "lineHeight": pingKuan * bili(48)+'px'
    });
    $(".load").hide();
    
};
window.onload = function () {
    setTimeout(function () {
        quanBujs();
        $("#demo").css("opacity", 1);
    }, 100);
};
//∫· ˙∆¡		
function hengshuping() {
    if (window.orientation == 180 || window.orientation == 0) { setTimeout(function () { quanBujs(); }, 100) };
    if (window.orientation == 90 || window.orientation == -90) { setTimeout(function () { quanBujs(); }, 100) };
};
window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", hengshuping, false);
window.addEventListener('load', hengshuping, false);
