var pingKuan;
var bili = function (mun) {
    var oScale = mun / 480;
    return oScale.toFixed(8);
},
bOne = true;
function quanBujs() {
    pingKuan = $("#demo").width();

    $("#demo").css({
        "height": pingKuan * bili(756)
    });
    $(".btn").css({
        "width": pingKuan * bili(90) + "px",
        "height": pingKuan * bili(130) + "px",
        "margin-left": pingKuan * bili(346) + "px",
        "padding-top": pingKuan * bili(30) + "px",
        "padding-bottom": pingKuan * bili(48) + "px"
    });
    $(".jaImg").css({
        "width": pingKuan,
        "height": pingKuan * bili(21),
        "top": pingKuan * bili(706)
    });

    $(".btn span").css({
        "width": pingKuan * bili(90) + "px",
        "margin-top": pingKuan * bili(10) + "px"
    });
    $(".date_top").css({
        "width": pingKuan * bili(476) + "px",
        "height": pingKuan * bili(82) + "px"
    });
    $(".date_top li").css({
        "width": pingKuan * bili(68) + "px",
        "height": pingKuan * bili(82) + "px",
        "line-height": pingKuan * bili(82) + "px"
    });
    $(".prevMonth").css({
        "width": pingKuan * bili(476) + "px",
        "height": pingKuan * bili(62) + "px"
    });
    $(".prevMonth li").css({
        "width": pingKuan * bili(68) + "px",
        "height": pingKuan * bili(62) + "px",
        "line-height": pingKuan * bili(62) + "px"
    });
    $(".month").css({
        "width": pingKuan * bili(460) + "px",
        "height": pingKuan * bili(62) + "px",
        "line-height": pingKuan * bili(62) + "px",
        "padding-right": pingKuan * bili(20) + "px"
    });
    $(".nowMonth ul").css({
        "width": pingKuan * bili(476) + "px",
        "height": pingKuan * bili(62) + "px"
    });
    $(".nowMonth ul li").css({
        "width": pingKuan * bili(68) + "px",
        "height": pingKuan * bili(62) + "px",
        "line-height": pingKuan * bili(62) + "px"
    });
    $(".active,.active1,.active2").css({
        "width": pingKuan * bili(54) + "px",
        "height": pingKuan * bili(54) + "px",
        "line-height": pingKuan * bili(54) + "px"
    });

    if (bOne) {
        bOne = false;
        gotoFn();
    }
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


function gotoFn() {
    var od = "ontouchstart" in window ? "touchstart" : "click";
    $(".nowMonth li span").bind(od, function () {
        if ($(this).attr("class") == "active") {
            alert("不可预约");
        } else {
            window.location.href = "MemberSignIn.aspx?city=" + city + "&type=" + type + "&fn=" + fn + "&rq=" + $(this).text();
        }
    });
}