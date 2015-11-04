$(function(){
	carouseFn({
		id: '#carousel',
		disNum: 3,
		bo: 1,
		marL: 10,
		scrollCon: '#list'
	});
	carouseFn({
		id: '#carousel2',
		disNum: 3,
		bo: 1,
		marL: 10,
		prev: '#prev2',
		next: '#next2',
		scrollCon: '#list2'
	});
});

/*
 * 带有按钮的滚动
 * id string 滚动父级的名字，如'#demo'，'.demo'
 * bo number 边框的宽度，默认是0
 * marL number 左边距，默认是0
 * scrollCon string 滚动内容的名字，如'#demo'，'.demo';默认'#list'
 * prev string 上一页的名字，如'#demo'，'.demo';默认'#prev'
 * next string 下一页的名字，如'#demo'，'.demo';默认'#next'
 * disNum number 没次滚动几个，即显示几个，默认是2
*/
function carouseFn(json){
	
	if(!json.id){console.log('请书写父级');return;}

	var $par = $(json.id),
		iShowNum = json.disNum || 2,
		iBoW = json.bo || 0,
		iMarL = json.marL || 0,
		$ul = $par.find(json.scrollCon||'#list'),
		$li = $ul.children(),
		$prev = $par.find(json.prev || '#prev'),
		$next = $par.find(json.next || '#next');

	var iLiW = $li.eq(0).width() + iBoW * 2  + iMarL,
		iNow = 0,
		iLeft = 0,
		iLiLen = $li.length,
		iLen = iLiLen/iShowNum,
		iLeftShow = iLiLen, //左边显示的
		iRightShow = iShowNum, //右边显示的
		bDivisible = iLiLen%iShowNum == 0;

	$ul.css({width: iLiW * iLiLen });
	
	$next.click(function(){

		if(iNow < iLen - 1){
			iNow++;
		}
		
		if(iLiLen - iRightShow < iShowNum){
			iLeft += iLiW * (iLiLen - iRightShow);
			iRightShow = iLiLen;
			iLeftShow = iShowNum;
		}else{
			iLeft += iLiW * iShowNum;
			iRightShow += iShowNum;
			iLeftShow -= iShowNum;
		}
		
		$ul.animate({marginLeft: - iLeft});

	});
	
	$prev.click(function(){

		if(iNow > 0){
			iNow--;
		}
		
		if(iLiLen - iLeftShow < iShowNum){
			iLeft = 0;
			iLeftShow = iLiLen;
			iRightShow = iShowNum;
		}else{
			if(iRightShow == iLiLen){
				if(!bDivisible){
					iLeft = iLiW * iShowNum * iNow - iLiW*(iShowNum-1);
				}else{
					iLeft -= iLiW * iShowNum;
				}
			}else{
				iLeft -= iLiW * iShowNum;
			}
			iRightShow -= iShowNum;
			iLeftShow += iShowNum;
		}
		
		$ul.animate({marginLeft: - iLeft});

	});

};