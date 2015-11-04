
var pingKuan;
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
        "width": pingKuan * bili(156) + "px",
        "height": pingKuan * bili(120) + "px",
        "padding-top": pingKuan * bili(32) + "px",
        "padding-bottom": pingKuan * bili(46) + "px"
    });
    $(".kefu").css({
        "width": pingKuan * bili(390) + "px",
        "height": pingKuan * bili(135) + "px",
        "margin-bottom": pingKuan * bili(30) + "px"
    });
    $(".kefuLeft").css({
        "width": pingKuan * bili(135) + "px",
        "height": pingKuan * bili(135) + "px"
    });
    $(".kefuLeft img").css({
        "width": pingKuan * bili(95) + "px",
        "height": pingKuan * bili(95) + "px",
        "margin-top": pingKuan * bili(20) + "px"
    });
    $(".kefuRight").css({
        "width": pingKuan * bili(255) + "px",
        "height": pingKuan * bili(135) + "px"
    });
    $(".kefuRight p").css({
        "padding-top": pingKuan * bili(30) + "px",
        "line-height": pingKuan * bili(36) + "px"
    });
    $(".kefuBtn").css({
        "width": pingKuan * bili(110) + "px",
        "height": pingKuan * bili(35) + "px",
        "line-height": pingKuan * bili(35) + "px",
        "right": pingKuan * bili(33) + "px",
        "top": pingKuan * bili(70) + "px"
    });
    $(".kefuMess").css({
        "margin-bottom": pingKuan * bili(30) + "px"
    });
    $(".kefuMess p").css({
        "height": pingKuan * bili(44) + "px",
        "padding-bottom": pingKuan * bili(20) + "px"
    });
    $(".kefuMess p span").css({
        "width": pingKuan * bili(131) + "px",
        "height": pingKuan * bili(44) + "px",
        "line-height": pingKuan * bili(44) + "px",
        "padding-right": pingKuan * bili(20) + "px"
    });
    $(".kefuMess p input").css({
        "width": pingKuan * bili(280) + "px",
        "height": pingKuan * bili(42) + "px",
        "line-height": pingKuan * bili(42) + "px",
        "border-radius": pingKuan * bili(10) + "px",
        "padding-left": pingKuan * bili(5) + "px"
    });
    $(".btn").css({
        "width": pingKuan * bili(90) + "px",
        "height": pingKuan * bili(130) + "px",
        "margin-left": pingKuan * bili(346) + "px",
        "padding-bottom": pingKuan * bili(48) + "px"
    });
    $(".btn span").css({
        "width": pingKuan * bili(90) + "px",
        "margin-top": pingKuan * bili(10) + "px"
    });
    $(".load").hide();
};
window.onload = function () {
    setTimeout(function () {
        quanBujs();
        $("#demo").css("opacity", 1);
    }, 100);
};
//横竖屏		
function hengshuping() {
    if (window.orientation == 180 || window.orientation == 0) { setTimeout(function () { quanBujs(); }, 100) };
    if (window.orientation == 90 || window.orientation == -90) { setTimeout(function () { quanBujs(); }, 100) };
};
window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", hengshuping, false);
window.addEventListener('load', hengshuping, false);
