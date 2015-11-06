$(function(){
	getNewDataFn();
	chooseFn();
});

//收货地址信息修改
function chooseFn(){
	var $mscaBtn = $(".mscaBtn");

	$mscaBtn.click(function(){
		$mscaBtn.css({"backgroundImage":"url(images/mscCheck.png)"});
		$(this).css({"backgroundImage":"url(images/mscCheckOn.png)"});
		var $mscaInfo = $(this).closest(".mscaInfo"),
			$inp0 = $mscaInfo.find("span").eq(0),
			$inp1 = $mscaInfo.find("span").eq(1),
			$inp2 = $mscaInfo.find(".mscInfoLp").eq(1);

		setTimeout(function(){
			window.location.href = 'MyShopCar2.html?user='+$inp0.html()+'&tel='+$inp1.html()+'&w='+$inp2.html()+'';
		},500);
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

	var sHtml = '<div class="r mid oh bobdadada mscaInfo">'+
			'<p class="oh mscInfoLp fs14">'+
				'<span class="fl">'+decodeURI(aData[0])+'</span>'+
				'<span class="fr">'+decodeURI(aData[1])+'</span>'+
			'</p>'+
			'<p class="mscInfoLp fs14">'+decodeURI(aData[2])+'</p>'+
			'<a href="javascript:;" class="boldadada a mscaBtn"></a>'+
		'</div>';
	$(".mscArea").append(sHtml);

};