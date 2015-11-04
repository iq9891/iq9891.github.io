$(function(){
	var $mask = $(".mask"),
		$win = $(window);

	$mask.css({height: $win.height()});

	tabFn();
	srcollFn();
	subFn();
	actFn();
	playVedioFn();
	leftRightFn();
	chooseFn();
	
	var od = 'ontouchstart' in window ? "touchstart":"click";
	$('.loneNo').on(od, function(){
		window.location.href = 'QxImgWin.html';
	});

});

//单选he条款点击
function chooseFn(){
	var $ib1mBox1Sex = $(".ib1mBox1Sex"),
		$ib1mBox1SexInp = $(".ib1mBox1SexInp"),
		$ib1mProv = $(".ib1mProv"),
		$ib1mProvInp = $(".ib1mProvInp"),
		od = 'ontouchstart' in window ? 'tap':'click',
		bClick = true;
	
	//选择性别
	$ib1mBox1Sex.on(od, function(){
		$ib1mBox1SexInp.removeClass("ib1mBox1SexInpOn").removeAttr("checked").eq($(this).index()).addClass("ib1mBox1SexInpOn").attr("checked","checked");
	});

	//选择条款
	$ib1mProv.on(od, provFn);
	$ib1mProvInp.on(od, provFn);
	function provFn(){
		if(bClick){
			$ib1mProvInp.removeClass("ib1mProvInpOn").removeAttr("checked")
		}else{
			$ib1mProvInp.addClass("ib1mProvInpOn").attr("checked","checked");
		}
		bClick = !bClick;
		event.stopPropagation();
	}

};

//活动详情
function actFn(){
	var $iBox1TBtn = $(".iBox1TBtn"),
		od = 'ontouchstart' in window ? 'tap':'click';
	$iBox1TBtn.on(od, function(){
		showTkFn("iTkInfo");
	});
	$(".itifClose").on(od, function(){
		hideTkFn("iTkInfo");
	});
};

//注册之后抽奖弹框
function subFn(){
	var $iBox1Btn2 = $(".iBox1Btn2"),
		$ifImg = $(".ifImg"),
		od = 'ontouchstart' in window ? 'tap':'click',
		od2 = 'ontouchstart' in window ? 'longTap':'click';
	$iBox1Btn2.on(od, function(){
		showTkFn("iFingerprint");
	});
	$(".ifClose").on(od, function(){
		hideTkFn("iFingerprint");
	});

	//长按
	$ifImg.on(od2, function(){
		window.location.href = "QxImgWin.html";
	});

};
//显示弹框
function showTkFn(s){
	$(".mask,."+s).show();
};
//隐藏弹框
function hideTkFn(s){
	$(".mask,."+s).hide();
};

//焦点图事件
function tabFn(){
	TouchSlide({ 
		slideCell:"#focus",
		titCell:".hd ul",
		mainCell:".bd ul", 
		effect:"left", 
		//autoPlay:true,
		autoPage:true,
		switchLoad:"_src"
	});
};


//滚动
function srcollFn(){
	var myScroll = new IScroll('#iBox3Aera', { click: true,mouseWheel: true, scrollbars: 'custom' });
	$("#iBox3Aera").get(0).addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
};

//播放视频
function playVedioFn(){
	
	var $iTkVImg = $(".iTkVImg"),
		od = 'ontouchstart' in window ? 'tap':'click';

	$iTkVImg.on(od, function(){
		var u=navigator.userAgent,
			$vid1 = $("#vid1"),
			vid1 = $("#vid1")[0];	//播放哪个写哪个
		$vid1.show();
		if(u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1){
			vid1.play();
		}else{
			setTimeout(function(){vid1.play();},1000);
		}
		
		$vid1.css("width","100%").show().bind({"ended": end_playing,"pause": end_playing});
			
		function end_playing(){$vid1.css("width","0%").hide();}
		
	});
	
}

//向左向右滑动
function leftRightFn(){
	var $iBox1Top = $(".iBox1Top"),
		$iTkVideo = $(".iTkVideo"),
		$iTkTest = $(".iTkTest"),
		$iTkVideoClose = $(".iTkVideoClose"),
		$iTkTestClose = $(".iTkTestClose"),
		$iBox1TLeft = $(".iBox1TLeft"),
		$iBox1TRight = $(".iBox1TRight"),
		bLeft = true,
		bRight = true,
		aStartX = 0,
		bCanTkL = false,
		bCanTkR = false,
		od = 'ontouchstart' in window ? 'tap':'click';

	$iTkVideo.get(0).addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
	$iTkTest.get(0).addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
	//$iBox1Top.swipeLeft(moveLeftFn).swipeRight(moveRightFn);
	$iBox1TLeft.on(od, moveLeftFn);
	$iBox1TRight.on(od, moveRightFn);
	
	$iBox1Top.on({
		"touchstart": function(e){
			aStartX = e.changedTouches[0].clientX;
		},
		"touchmove": function(e){
			if(aStartX - e.changedTouches[0].clientX > 10){
				bCanTkL = true;
				event.preventDefault();
			}
			if(e.changedTouches[0].clientX - aStartX > 10){
				bCanTkR = true;
				event.preventDefault();
			}
			//event.preventDefault();
		},
		"touchend": function(e){
			if(bCanTkL){
				moveLeftFn();
			}
			if(bCanTkR){
				moveRightFn();
			}
		}
	});
	function moveLeftFn(){
		if(bLeft){
			$iTkVideo.animate({left:0});
		}
	}

	function moveRightFn(){
		if(bRight){
			$iTkTest.animate({left:0});
		}
	}

	$iTkVideoClose.on(od, function(){
		bLeft = false;
		$iTkVideo.animate({left:-640});
		var $vid1 = $("#vid1"),
			vid1 = $("#vid1")[0];
		vid1.pause();
		$vid1.css("width","0%").hide();
	});
	$iTkTestClose.on(od, function(){
		bRight = false;
		$iTkTest.animate({left:640});
	});
};