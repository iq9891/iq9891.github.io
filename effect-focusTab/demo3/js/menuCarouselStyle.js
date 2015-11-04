    var pingKuan;
    var bili = function(mun){
        var oScale = mun/480;
        return oScale.toFixed(8);
    };
    function quanBujs(){
        pingKuan=$("#bg").width();

        $(".cybg2").css({
            "height":pingKuan*bili(780)+"px",
        });
        $(".logo").css({
            "width":pingKuan*bili(156)+"px",
            "height":pingKuan*bili(120)+"px",
            "padding-top":pingKuan*bili(32)+"px",
            "padding-bottom":pingKuan*bili(50)+"px"
        });
        $(".side").css({
            "width":pingKuan*bili(207)+"px",
            "height":pingKuan*bili(118)+"px",
            "top":pingKuan*bili(5)+"px",
           
        });
       
         $(".cyMenu").css({
            "width":pingKuan*bili(292),
            "height":pingKuan*bili(320),
            "top":pingKuan*bili(430)+"px",
            "left":pingKuan*bili(120)+"px"
        });
        $(".cyMenu dd,.cyMenu dd a").css({
            "width":pingKuan*bili(292)+"px",
            "height":pingKuan*bili(40)+"px",
            "lineHeight":pingKuan*bili(40)+"px"
          
        });

        var iDDLen = $('.cyMenu dd').length,
            arrPos = [pingKuan*bili(-200), pingKuan*bili(-150), pingKuan*bili(-100), pingKuan*bili(-50), pingKuan*bili(-10), pingKuan*bili(40), pingKuan*bili(90), pingKuan*bili(145), pingKuan*bili(195), pingKuan*bili(245), pingKuan*bili(295), pingKuan*bili(340), pingKuan*bili(390), pingKuan*bili(440), pingKuan*bili(490)],
            arrScale = [0.1, 0.1, 0.1, 0.1, 0.7, 0.8, 1, 1.2, 1, 0.8, 0.7, 0.1, 0.1, 0.1, 0.1],
            arrOpacity = [0.1, 0.1, 0.1, 0.1, 0.1, 0.4, 0.7, 1, 0.7, 0.4, 0.1, 0.1, 0.1, 0.1, 0.1],
            arrFontSize = [pingKuan*bili(14), pingKuan*bili(14), pingKuan*bili(14), pingKuan*bili(14), pingKuan*bili(18), pingKuan*bili(20), pingKuan*bili(24), pingKuan*bili(28), pingKuan*bili(24), pingKuan*bili(20), pingKuan*bili(18), pingKuan*bili(14), pingKuan*bili(14), pingKuan*bili(14), pingKuan*bili(14)],
            arrFontWeight = [0, 0, 0, 0, 100, 200, 400, 700, 400, 200, 100, 0, 0, 0, 0],
            iSacle = Math.floor(iDDLen/2);
      
        $('.cyMenu dd').each(function(i,e){
            $(e).css({
                "top": arrPos[i],
                "opacity": arrOpacity[i],
				"fontSize": arrFontSize[i]
            });
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

         menuCarouselFn();
		
			function menuCarouselFn() { 
				var $dd = $('.cyMenu dd'),
                    iDdLen = $dd.length,
					$cyMenu = $('.cyMenu'),
                    iNow = Math.floor(iDdLen/2);
				
				$('.cyMenu').get(0).addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
				$dd.eq(iNow).find('a').addClass('on');
				$cyMenu.swipeUp(function(){
					arrPos.unshift(arrPos.pop());
					arrOpacity.unshift(arrOpacity.pop());
					arrFontSize.unshift(arrFontSize.pop());
					arrFontWeight.unshift(arrFontWeight.pop());
					$('.cyMenu dd').each(function(i,e){
						$(e).animate({
							"top": arrPos[i],
							"opacity": arrOpacity[i],
							"fontSize": arrFontSize[i],
                            "fontWeight": arrFontWeight[i]
						},300);
					});
                    if(iNow>=iDdLen - 1){
                        iNow = 0;
                    }else{
                         iNow++;
                    }

                    $dd.find('a').removeClass('on');
                    $dd.eq(iNow).find('a').addClass('on');
                    console.log(iNow);
				}).swipeDown(function(){
					arrPos.push(arrPos.shift());
					arrOpacity.push(arrOpacity.shift());
					arrFontSize.push(arrFontSize.shift());
					arrFontWeight.push(arrFontWeight.shift());
					$('.cyMenu dd').each(function(i,e){
						$(e).animate({
							"top": arrPos[i],
							"opacity": arrOpacity[i],
							"fontSize": arrFontSize[i],
                            "fontWeight": arrFontWeight[i]
						},300);
					});
                    if(iNow<=0){
                        iNow = iDdLen-1;
                    }else{
                         iNow--;
                    }
                   
                    $dd.find('a').removeClass('on');
                    $dd.eq(iNow).find('a').addClass('on');
                    console.log(iNow);
				});

			}
    };


    $(".side").tap(function(){
        $(this).toggleClass("sideH");
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
