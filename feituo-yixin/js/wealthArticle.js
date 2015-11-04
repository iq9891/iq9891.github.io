$(function(){
	var myScroll = new IScroll('#eABox', { mouseWheel: true, click: true }),
		$elHeaderBtn = $('.elHeaderBtn'),
		$elHeaderInfo = $('.elHeaderInfo'),
		$elHeader = $('.elHeader'),
		od = 'ontouchstart' in window ? 'tap':'click',
		bOne = true;

	TouchSlide({ 
		slideCell:"#focus",
		titCell:".hd ul", //开启自动分页 autoPage:true ，此时设置 titCell 为导航元素包裹层
		mainCell:".bd ul", 
		effect:"left", 
		//autoPlay:true,//自动播放
		autoPage:true, //自动分页
		switchLoad:"_src" //切换加载，真实图片路径为"_src" 
	});
	
	myScroll.refresh();

});