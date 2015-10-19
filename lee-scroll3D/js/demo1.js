$(function(){

	new LeeScroll();
	new LeeScroll({obj:'#scroll3D2',addObj:'#lsUl3,#lsUl4'});
	
	
	document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

});

