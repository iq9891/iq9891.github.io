
function styleJs(){

	var pingKuan=$("#legend canvas").width(),
		pingGao = window.innerHeight,
		bili = function(mun){
			var oScale = mun/480;
			return oScale.toFixed(6);
		};


	$(".mask").css({
		"width": pingKuan,
        "height": pingGao
    });	
	$(".info").css({
        "width": pingKuan * bili(250),
        "height": pingKuan * bili(590),
        "left": pingKuan * bili(115)
    });
	$(".iImgFont").css({
        "width": pingKuan * bili(140),
        "height": pingKuan * bili(40),
        "marginTop": pingKuan * bili(137)
    });
	$(".iImg").css({
        "width": pingKuan * bili(251),
        "height": pingKuan * bili(251),
        "marginTop": pingKuan * bili(21),
        "marginBottom": pingKuan * bili(10)
    });
	
	//over 
	$(".over,.overLoaded").css({
        "width": pingKuan * bili(446),
        "height": pingKuan * bili(615)
    });
	$(".over,.list").css({
        "left": pingKuan * bili(23)
    });
	$(".oScore").css({
        "width": pingKuan * bili(425),
        "height": pingKuan * bili(218),
        "paddingTop": pingKuan * bili(180),
        "paddingLeft": pingKuan * bili(225)
    });
	$(".oArea").css({
        "width": pingKuan * bili(16)
    });
	$(".oList").css({
        "width": pingKuan * bili(300),
        "height": pingKuan * bili(53),
        "paddingTop": pingKuan * bili(10),
        "paddingLeft": pingKuan * bili(135)
    });
	$(".oBtn").css({
        "marginTop": pingKuan * bili(260)
    });
	$(".oBtn,.oBl").css({
        "height": pingKuan * bili(80)
    });
	$(".overLoad,.listLoad").css({
        "width": pingKuan * bili(101),
        "height": pingKuan * bili(101),
        "left": pingKuan * bili(170),
        "top": pingKuan * bili(210)
    });

	//list
	$(".list,.listLoaded").css({
        "width": pingKuan * bili(436),
        "height": pingKuan * bili(615)
    });	
	$(".listUl").css({
        "paddingTop": pingKuan * bili(173)>>0
    });
	$(".listUlarea").css({
        "width": pingKuan * bili(280),
        "height": pingKuan * bili(38),
        "lineHeight": pingKuan * bili(38) + 'px',
        "paddingLeft": pingKuan * bili(108)
    });
	$(".listMy").css({
        "width": pingKuan * bili(378),
        "height": pingKuan * bili(44),
        "lineHeight": pingKuan * bili(40) + 'px'
    });
	$(".listBtn").css({
        "width": pingKuan * bili(200),
        "height": pingKuan * bili(90)
    });
	$(".listClose").css({
        "width": pingKuan * bili(90),
        "height": pingKuan * bili(90),
        "top": pingKuan * bili(80)
    });


};
	
function loaded(){setTimeout(function(){styleJs();},500);}
function hengshuping(){
	if(window.orientation==180||window.orientation==0){loaded();};
	if(window.orientation==90||window.orientation==-90){loaded();}
}
window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", hengshuping, false);
window.addEventListener('load', loaded, false);
