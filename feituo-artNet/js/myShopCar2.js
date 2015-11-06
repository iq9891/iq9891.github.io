$(function(){
	toInfoFn();
	updateDataFn();
});

//跳转信息页
function toInfoFn(){
	$(".mscInfo").click(function(){
		window.location.href = 'MyShopCarAddress.html';
	});
};

//修改新数据
function updateDataFn(){

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

	var $top = $(".mscInfoLp"),
		$span = $top.eq(0).find("span"),
		$P = $top.eq(1);

	$span.eq(0).html(decodeURI(aData[0]));
	$span.eq(1).html(decodeURI(aData[1]));
	$P.html(decodeURI(aData[2]));

};