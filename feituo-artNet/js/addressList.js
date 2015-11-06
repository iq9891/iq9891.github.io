$(function(){
	getNewDataFn();
	collectFn();
	deleteFn();
});

//收货地址信息修改
function collectFn(){
	
	var $alBtn1 = $(".alBtn1"),
		$alBoxInfo = $(".alBoxInfo"),
		$alSubBtn = $(".alSubBtn"),
		$alDeleteBtn = $(".alDeleteBtn");
	
	//显示修改信息
	$alBtn1.live("click",function(){
		var _this = $(this),
			iNow = _this.closest(".alBox").index(".alBox"),
			$info = $alBoxInfo.eq(iNow);

		if(_this.data("bClick")){
			$info.hide();
			_this.removeData("bClick");
		}else{
			$info.show().siblings(".alBoxInfo").hide();
			_this.data("bClick",true);
		}
	});
	
	//保存修改信息
	$alSubBtn.live("click",function(){
		var _this = $(this),
			$inp = _this.closest(".alBoxInfo").find(".raBox"),
			iNow = _this.closest(".alBoxInfo").index(".alBoxInfo"),
			$inpNow = $(".alBox").eq(iNow),
			$inp0 = $inp.eq(0),
			$inp1 = $inp.eq(1),
			$inp2 = $inp.eq(2),
			sInpVal0 = $inp0.find(".raBoxR").val(),
			sInpVal1 = $inp1.find(".raBoxR").val(),
			sInpVal2 = $inp2.find(".raBoxR").val();

		if(!sInpVal0){
			$inp0.addClass("getInpAnim").on("webkitAnimationEnd", function(){
				$inp0.removeClass("getInpAnim");
			});
		}else if(!sInpVal1){
			$inp1.addClass("getInpAnim").on("webkitAnimationEnd", function(){
				$inp1.removeClass("getInpAnim");
			});
		}else if(!sInpVal2){
			$inp2.addClass("getInpAnim").on("webkitAnimationEnd", function(){
				$inp2.removeClass("getInpAnim");
			});
		}else{
			$inpNow.find(".alBoxLtopL").html(sInpVal0);
			$inpNow.find(".alBoxLtopR").html(sInpVal1);
			$inpNow.find(".alBoxLbot").html(sInpVal2);
			_this.closest(".alBoxInfo").hide();
			_this.closest(".alBoxInfo").data("bClick",true);
		}

	});

	//删除地址
	$alDeleteBtn.click(function(){
		var $myInp = $(this).closest(".raBox").find(".raBoxR");
		$myInp.val("").attr("placeholder","");
	});
	
};

//收货地址删除
function deleteFn(){
	var $alBtn2 = $(".alBtn2");
	$alBtn2.live("click",function(){
		if(confirm("一定要删吗？")){
			$(this).closest(".alBox").remove();
		}
	});
};

//添加新数据
function getNewDataFn(){

	var url = window.location.search,
		aData = [];
	if (url.indexOf("?") != -1) {
		var str = url.substr(1)
		strs = str.split("&");
		for (i = 0; i < strs.length; i++) {
			aData.push(strs[i].split("=")[1]);
		}
	}

	if(!aData.length){
		return;
	}

	var sHtml = '<div class="clear w94 mid bobdadada alBox">'+
			'<div class="bordadada alBoxL fl">'+
				'<p class="oh alBoxLtop">'+
					'<span class="fs14 alBoxLtopL fl">'+decodeURI(aData[0])+'</span>'+
					'<span class="fs14 alBoxLtopR fr">'+decodeURI(aData[2])+'</span>'+
				'</p>'+
				'<p class="fs14 alBoxLbot">'+decodeURI(aData[1])+'</p>'+
			'</div>'+
			'<div class="h100 alBoxR fl">'+
				'<a href="javascript:;" class="h100 changeWord fl alBtn alBtn1">修改信息</a>'+
				'<a href="javascript:;" class="h100 changeWord fl alBtn alBtn2">删除</a>'+
			'</div>'+
		'</div>'+
		'<div class="w94 mid alBoxInfo bobdadada dn">'+
			'<div class="w94 mid mt3 oh bodadada raBox">'+
				'<p class="raBoxL fl tar fs16 bordadada">联系人姓名</p>'+
				'<input type="text" class="fs14 inpNoBg h100 raBoxR fl" placeholder="'+decodeURI(aData[0])+'" value="">'+
			'</div>'+
			'<div class="r w94 mid oh mt3 bodadada raBox">'+
				'<p class="raBoxL fl tar fs16 bordadada">邮寄地址</p>'+
				'<input type="text" class="fs14 inpNoBg h100 raBoxR fl" placeholder="'+decodeURI(aData[1])+'" value="">'+
				'<a href="javascript:;" class="h100 a alDeleteBtn"></a>'+
			'</div>'+
			'<div class="w94 mid oh mt3 bodadada raBox">'+
				'<p class="raBoxL fl tar fs16 bordadada">联系人手机</p>'+
				'<input type="tel" class="fs14 inpNoBg h100 raBoxR fl" placeholder="'+decodeURI(aData[2])+'" value="">'+
			'</div>'+
			'<a href="javascript:;" class="w94 mid db tac cfff fs16 mt3 alSubBtn bgf48401">保存</a>'+
		'</div>';
	$(".alArea").append(sHtml);

};