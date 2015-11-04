function styleJs(){

	var pingKuan=$(".m_wraper").width(),
		bili = function(mun){
			var oScale = mun/480;
			return oScale.toFixed(6);
		},
		tanchu = false;	//弹出一次
		
		//刮刮卡必须设置的变量样式
		oWidth=pingKuan * bili(331);	//刮刮卡宽度
        oHeight=pingKuan * bili(128);	//刮刮卡高度
		
		//刮刮卡容器的样式
		$(".div3").css("height", pingKuan * bili(128));
		$("#wScratchPad3").css({
			"width":pingKuan * bili(331),
			"height":pingKuan * bili(128),
	    });
		
		//刮刮卡插件调用
		$("#wScratchPad3").wScratchPad({
            cursor:'',
			width:pingKuan * bili(331),					// set width - best to match image width
		    height:pingKuan * bili(128),
			size:20,		
            image:'images/xiexiecy.jpg',	//刮完覆盖层以后显示的中奖图片
			image2:'images/css_tu6.jpg',    //覆盖层图片
				
            scratchMove: function(e, percent){
				
                if(percent > 80){
					//清除剩余
					this.clear();
					if(tanchu==false){
						tanchu=true;
						alert("挂完了");
					}
				}

            },
        });

};
	
function loaded(){setTimeout(function(){styleJs();},300);}

function hengshuping(){
	if(window.orientation==180||window.orientation==0){loaded();};
	if(window.orientation==90||window.orientation==-90){loaded();}
}
window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", hengshuping, false);
window.addEventListener('load', loaded, false);