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
        "padding-bottom": pingKuan * bili(46)
    });

    $(".n18Imgb").css({
        "width": pingKuan * bili(403),
        "height": pingKuan * bili(275),
        "paddingTop": pingKuan * bili(20),
        "marginTop": pingKuan * bili(40)
    });
    $(".n18Imgc").css({
        "width": pingKuan * bili(403),
        "height": pingKuan * bili(255)
    });
    
    $(".n18Anim").css({
        "width": pingKuan * bili(315),
        "paddingTop": pingKuan * bili(55)
    });
    $(".n18S").css({
        "lineHeight": pingKuan * bili(36)+'px'
    });
    $(".n18ImgbConInfo").css({
        "lineHeight": pingKuan * bili(26) + 'px',
        "paddingBottom": pingKuan * bili(10)
    }); 
    $(".n18H2").css({
        "lineHeight": pingKuan * bili(50) + 'px'
    });
    $(".n18ImgbCon").css({
        "width": pingKuan * bili(355),
        "left": pingKuan * bili(24)
    });
    
    if (bOne) {
        bOne = false;
        scrollFn();

        $(".iScrollVerticalScrollbar").css({
            "width": pingKuan * bili(10),
            "right": pingKuan * bili(10)
        });
        
    }

    $(".no18BotB,.no18BotL,.no18BotR").css({
        "height": pingKuan * bili(112)
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

function scrollFn() {
    var myScroll = new IScroll('#n18Imgc', { mouseWheel: true, scrollbars: 'custom' });
    document.getElementById('n18Imgc').addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
}