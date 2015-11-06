$(jq360);

function jq360(){
	var c_i = 1;
	var iAllNum = 4;
	var c1=new Array();
	//创建数组，i的数量是图片的总数；进行for循环。
	for(var i=1;i<=iAllNum;i++){
		c1[i]=new Image();
		c1[i].src="images/jImg"+i+".png";
	}

	//定义要360度旋转的对象
	var $main_swipe = $("#phone");

	//创建滑动的基本距离和滑动方法属性。
	var defaults = {x: 10,y: 30};
	//定义初始坐标
	var originalCoord = { x: 0, y: 0 };
	var shiftCoord = { x: 0, y: 0 };
	var finalCoord = { x: 0, y: 0 };

	//向左滑动方法
	var showPicLeft = function(){
		c_i--;
		if(c_i < 1){
			c_i = iAllNum;
		};
		$main_swipe.attr({src: c1[c_i].src});
	};

	//向右滑动方法
	var showPicRight = function(){
		c_i++;
		if(c_i > iAllNum){
			 c_i = 1;
		};
		$main_swipe.attr({src: c1[c_i].src});
	};
		
	$main_swipe.bind({
		"touchstart": function(ev) {
			//定义滑动初始时的坐标
			originalCoord.x = event.targetTouches[0].pageX;
			originalCoord.y = event.targetTouches[0].pageY;
			shiftCoord.x = event.targetTouches[0].pageX;
			shiftCoord.y = event.targetTouches[0].pageY;
			finalCoord.x = originalCoord.x;
			finalCoord.y = originalCoord.y;
			$('.jImg4').hide();
		},
		"touchmove": function(ev) {
		
			//定义滑动中的坐标
			event.preventDefault();
			finalCoord.x = event.targetTouches[0].pageX;
			finalCoord.y = event.targetTouches[0].pageY;
			
			//当横向滑动距离大于5时，则判断为有效滑动并执行向左滑动的方法。反之则向向右滑动。
			if(finalCoord.x - shiftCoord.x > 30){
				showPicLeft();
				shiftCoord.x = finalCoord.x;
			}else if(finalCoord.x - shiftCoord.x < -30){
				showPicRight();
				shiftCoord.x = finalCoord.x;
		   }
		},
		"touchend": function(ev) {
		
			var changeY = originalCoord.y - finalCoord.y;
			
			//滑动结束时，进行坐标判断。并执行向左或是向右的方法
			if(changeY < defaults.y && changeY > (defaults.y*-1)) {
				
				changeX = originalCoord.x - finalCoord.x;
				
				if(changeX > defaults.x) {
					showPicRight();
				}
				
				if(changeX < (defaults*-1)) {
					showPicLeft();
				}
			}
			$('.jImg4').show();
		}
	});

};