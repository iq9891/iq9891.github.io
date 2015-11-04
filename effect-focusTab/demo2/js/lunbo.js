var pingKuan, bOne = true;
var bili = function(mun) {
    var oScale = mun / 480;
    return oScale.toFixed(8);
};

function quanBujs() {
    pingKuan = $("#demo,#demo1").width();
    $("#demo").css({
        "minHeight": pingKuan * bili(756)
    });
    
    $(".logo").css({
        "width": pingKuan * bili(156),
        "height": pingKuan * bili(120),
        "padding-top": pingKuan * bili(32),
        "padding-bottom": pingKuan * bili(46)
    });
    $(".lunboBox,.lunboBoxCon").css({
        "width": pingKuan * bili(360),
        "height": pingKuan * bili(260)
    });
    $(".lunboImg").css({
        "width": pingKuan * bili(340)
    });

    var iPos = pingKuan * bili(305);

    $(".lunboImg1").css({
        "-webkit-transform": "rotateY(60deg) translateZ(" + iPos + "px)"
    });
    $(".lunboImg2").css({
        "-webkit-transform": "translateZ(" + iPos + "px)"
    });
    $(".lunboImg3").css({
        "-webkit-transform": "rotateY(-60deg) translateZ(" + iPos + "px)"
    });
    $(".lunboImg4").css({
        "-webkit-transform": "rotateY(60deg) translateZ(" + -iPos + "px)"
    });
    $(".lunboImg5").css({
        "-webkit-transform": "translateZ(" + -iPos + "px)"
    });
    $(".lunboImg6").css({
        "-webkit-transform": "rotateY(-60deg) translateZ(" + -iPos + "px)"
    });
    $(".lunboPage li").css({
        "width": pingKuan * bili(13),
        "height": pingKuan * bili(13)
    });
    $(".lunboPageBox").css({
        "marginBottom": pingKuan * bili(26)
    });
    $(".lunboBotL").css({
        "width": pingKuan * bili(146),
        "paddingLeft": pingKuan * bili(94),
        "lineHeight": pingKuan * bili(112) + 'px'
    });
    $(".lunboBotR").css({
        "width": pingKuan * bili(146),
        "paddingRight": pingKuan * bili(94),
        "lineHeight": pingKuan * bili(112) + 'px'
    });
    $(".lunboBot,.lunboBotL,.lunboBotR").css({
        "height": pingKuan * bili(112)
    });

    $(".lunboFont1").css({
        "width": pingKuan * bili(410),
        "height": pingKuan * bili(54),
        "lineHeight": pingKuan * bili(54) + 'px'
    });
    $("#demo1").css({
        //"height": pingKuan * bili(756)
    });
    $(".site").css({
        "width": pingKuan * bili(398),
        "height": pingKuan * bili(50),
        "paddingTop": pingKuan * bili(68),
    });
    $(".site li").css({
        "width": pingKuan * bili(102),
        "height": pingKuan * bili(50),
        "marginLeft": pingKuan * bili(25),
        "height": pingKuan * bili(50),
        "lineHeight": pingKuan * bili(50) + 'px'
    });
    $(".genPic").css({
        "width": pingKuan * bili(365),
        "height": pingKuan * bili(231)
    });
    $(".genTit").css({
        "width": pingKuan * bili(143),
        "height": pingKuan * bili(38),
        "lineHeight": pingKuan * bili(38) + 'px',
        "marginTop": pingKuan * bili(25)
    });
    $(".genInfo").css({
        "width": pingKuan * bili(250),
        // "height": pingKuan * bili(38),
        // "lineHeight": pingKuan * bili(38)+'px',
        "paddingTop": pingKuan * bili(25)
    });
    $(".genList").css({
      
        "paddingLeft": pingKuan * bili(30),
    });

    $(".genList li").css({
        "width": pingKuan * bili(89),
        "marginTop": pingKuan * bili(20),
        "height": pingKuan * bili(29),
        "lineHeight": pingKuan * bili(29) + 'px',
        "marginLeft": pingKuan * bili(16)
    });
    $(".bookBtn").css({

        "width": pingKuan * bili(122) + "px",
        "height": pingKuan * bili(27) + "px",
        "paddingTop": pingKuan * bili(35) + "px",
        "paddingBottom": pingKuan * bili(35) + "px"

    });
     
    $(".load").hide();
	  
    if (bOne) {
        bOne = false;
        tabFn();
    }

};
window.onload = function() {
    setTimeout(function() {
        quanBujs();
        $("#demo").css("opacity", 1);
        $("#demo1").css("opacity", 1);
    }, 100);
};
//������        

function hengshuping() {
    if (window.orientation == 180 || window.orientation == 0) {
        setTimeout(function() {
            quanBujs();
        }, 100)
    };
    if (window.orientation == 90 || window.orientation == -90) {
        setTimeout(function() {
            quanBujs();
        }, 100)
    };
};
window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", hengshuping, false);
window.addEventListener('load', hengshuping, false);

function tabFn() {
    var iNow = 0,
        $lunboBoxCon = $(".lunboBoxCon"),
        $lunboPageLi = $(".lunboPage li"),
        iLen = $lunboPageLi.length,
        fMabs = Math.abs;

    $(".lunboBox").swipeLeft(function() {
        iNow--;
        $lunboBoxCon.css({
            "-webkit-transform": "rotateY(" + iNow * 60 + "deg)"
        });
        $lunboPageLi.eq(fMabs(iNow % iLen)).addClass("on").siblings().removeClass("on");
    }).swipeRight(function() {
        iNow++;
        $lunboBoxCon.css({
            "-webkit-transform": "rotateY(" + iNow * 60 + "deg)"
        });
        $lunboPageLi.eq(fMabs(iNow % iLen)).addClass("on").siblings().removeClass("on");
    });
    $lunboBoxCon.get(0).addEventListener('touchmove', function(e) {
        e.preventDefault();
    }, false);
}