    var pingKuan;
    var bili = function(mun){
        var oScale = mun/480;
        return oScale.toFixed(8);
    };
    function quanBujs(){
        pingKuan=$("#bg").width();

        $(".cybg2").css({
           
            "height":pingKuan*bili(803)+"px",
            
        });
        $(".logo").css({
            "width":pingKuan*bili(156)+"px",
            "height":pingKuan*bili(120)+"px",
            "padding-top":pingKuan*bili(32)+"px",
            "padding-bottom":pingKuan*bili(50)+"px"
        });
        $(".side4").css({
            "width":pingKuan*bili(207)+"px",
            "height":pingKuan*bili(118)+"px",
            "top":pingKuan*bili(5)+"px",
           
        });
       
        $(".cyMenu").css({
           //"width":pingKuan*bili(326)+"px",
           // "minHeight":pingKuan*bili(526)+"px",
            "top":pingKuan*bili(385)+"px",
            "right":pingKuan*bili(80)+"px"
        });
         $(".cyMenu dt").css({
             "height":pingKuan*bili(35),
             "lineHeight":pingKuan*bili(35)+"px",
            "paddingBottom":pingKuan*bili(15)
          
        });
           $(".cyMenu dd").css({
    
            "height":pingKuan*bili(40)+"px",
            "lineHeight":pingKuan*bili(40)+"px",
             "paddingRight":pingKuan*bili(40)+"px",
          
        });
        
        $(".imgMenu").css({
            "width":pingKuan*bili(326)+"px",
            "minHeight":pingKuan*bili(526)+"px",
            "paddingTop":pingKuan*bili(150)+"px",
            "paddingBottom":pingKuan*bili(115)+"px"
        });
      
        $(".bookBtn").css({
           
            "width":pingKuan*bili(122)+"px",
            "height":pingKuan*bili(27)+"px",
            "left":pingKuan*bili(180)+"px",
            "bottom":pingKuan*bili(52)+"px"

        });

          $(".bookBtnE").css({
           
            "width":pingKuan*bili(149)+"px",
            "height":pingKuan*bili(27)+"px",
            "left":pingKuan*bili(165)+"px",
            "bottom":pingKuan*bili(52)+"px"

        });

         $(".load").hide();
       
    };


    $(".side4").tap(function(){
        $(this).toggleClass("side4H");
        $(".imgMenu div").toggleClass("show");
    })
    window.onload=function(){
        setTimeout(function(){
            quanBujs();
            $("#bg").css("opacity",1);
        },100);
    };
    //横竖屏       
    function hengshuping(){
        if(window.orientation==180||window.orientation==0){setTimeout(function(){quanBujs();},100)};
        if(window.orientation==90||window.orientation==-90){setTimeout(function(){quanBujs();},100)};
    };
    window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", hengshuping, false);
    window.addEventListener('load', hengshuping, false);