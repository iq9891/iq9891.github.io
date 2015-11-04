var pingKuan, bOne = true;
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
        "padding-bottom": pingKuan * bili(60)
    });

    $(".sBox").css({
        "width": pingKuan * bili(408),
        "height": pingKuan * bili(45),
        "marginBottom": pingKuan * bili(20)
    });
    $(".sBoxL").css({
        "width": pingKuan * bili(100),
        "height": pingKuan * bili(45),
        "lineHeight": pingKuan * bili(44) + 'px',
        "paddingRight": pingKuan * bili(22)
    });
    $(".sBoxR").css({
        "width": pingKuan * bili(240),
        "height": pingKuan * bili(44),
        "paddingRight": pingKuan * bili(10),
        "paddingLeft": pingKuan * bili(10)
    });
    $(".sInp").css({
        "lineHeight": pingKuan * bili(44) + 'px'
    });

    $(".sBox2,.sBoxR2").css({
        "height": pingKuan * bili(255)
    });
    $(".sBoxR2").css({
        "width": pingKuan * bili(278)
    });
    $(".sBoxR2Btn").css({
        "width": pingKuan * bili(82),
        "height": pingKuan * bili(48),
        "marginRight": pingKuan * bili(10),
        "marginBottom": pingKuan * bili(10),
        "lineHeight": pingKuan * bili(44) + 'px'
    });
    $(".sBoxR2BtnOn").css({
        "backgroundPosition": "0 " + -pingKuan * bili(48) + "px"
    });
    $(".sBoxR2Btn2").css({
        "width": pingKuan * bili(266),
        "height": pingKuan * bili(48),
        "marginRight": pingKuan * bili(10),
        "marginBottom": pingKuan * bili(10),
        "lineHeight": pingKuan * bili(44) + 'px'
    });


    $(".sError").css({
        "width": pingKuan * bili(328),
        "marginLeft": pingKuan * bili(10)
    });

    $(".bBtn").css({
        "width": pingKuan * bili(88),
        "height": pingKuan * bili(126),
        "right": pingKuan * bili(44)
    });
    $(".bBtnFont").css({
        "lineHeight": pingKuan * bili(48) + 'px'
    });
    $(".load").hide();
    if (bOne) {
        bOne = false;
        chooseFn();
        subFn();
    }

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

function chooseFn() {
    var $sChooseBtn = $(".sChooseBtn"),
		od = 'ontouchstart' in window ? "tap" : "click";

    $sChooseBtn.on(od, function () {
        $(this).css({
            "backgroundPosition": "0 " + -pingKuan * bili(48) + "px"
        }).data("bClick", true);
    });
};

function subFn() {
    //	var $bBtn = $(".bBtn"),
    //		$sChooseBtn = $(".sChooseBtn"),
    //		od = 'ontouchstart' in window ? "tap":"click",
    //		aHobby = [];

    //	$bBtn.on(od,function(){
    //		$sChooseBtn.each(function(i,e){
    //			if($(e).data("bClick")){
    //				aHobby.push($(e).html());
    //			}
    //		})
    //	});

};