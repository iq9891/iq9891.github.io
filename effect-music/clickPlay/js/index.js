var bOne = true;
function styleJs(){
	var pingKuan=$(".m_wrapper").width(),
		bili = function(mun){
			var oScale = mun/640;
			return oScale.toFixed(6);
		};
	
	$(".mediagl_play").css({
		"width": pingKuan * bili(260),
		"height": pingKuan * bili(70),
		"left": pingKuan * bili(100),
		"top": pingKuan * bili(100)
	});
	
	if(bOne){
		bOne = false;
		bofangyinpin();
	}

	$(".load").hide();
	$(".m_wrapper").css({
		"opacity": 1
	});
	
};


function loaded(){
	setTimeout(function(){
		styleJs();
	},300);
}

function hengshuping(){
	if(window.orientation==180||window.orientation==0){
		loaded();
	};
	if(window.orientation==90||window.orientation==-90){
		loaded();
	}
}
window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", hengshuping, false);

window.addEventListener('load', loaded, false);


//音放视频
function bofangyinpin(){

	var u=navigator.userAgent,
		od = 'ontouchstart' in window ? "touchend" : "click",
		bIsBo = true,
		$vid1 = $("#vid1"),
		vid1 = $("#vid1")[0];	//播放哪个写哪个
	
	$(".mediagl_play").bind(od, function(){
		if(bIsBo){
			bIsBo = false;
			playMusic();
			$(".mediagl_play").css({
				"backgroundImage": "url(" + $(".mediagl_playOn").attr("src") + ")"
			});;
		}else{
			bIsBo = true;
			endMusic();
			$(".mediagl_play").css({
				"backgroundImage": "url(" + $(".mediagl_play").attr("src") + ")"
			});;
		}
	});

	function playMusic(){
		if(u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1){
			vid1.play();
		}else{
			setTimeout(function(){vid1.play();},1000);
		};
	};
	function endMusic(){
		if(u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1){
			vid1.pause();
		}else{
			setTimeout(function(){vid1.pause();},1000);
		};
	};
}
   