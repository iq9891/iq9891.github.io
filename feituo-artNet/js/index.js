$(function(){
	focusFn();
});

//焦点图切换
function focusFn(){
	TouchSlide({ 
		slideCell:"#iFocus",
		titCell:".iFocusBtnList", //开启自动分页 autoPage:true ，此时设置 titCell 为导航元素包裹层
		mainCell:".iFocusList", 
		effect:"left", 
		autoPlay:true,//自动播放
		autoPage:true
	});
};