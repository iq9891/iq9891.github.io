/**
 * Created with EditPlus.
 * User: leemagnum
 * Date: 14-8-7
 * Time: 下午5.40
 * 数据对象.
 */

var oData = {
		//bg: [854, 226],		//背景宽高
		//road: [854, 386, 0, 452],	//路的w,h,x,y
		s: 0,					//加速度
		bg: [1280, 170],		//背景宽高
		bgSpeed: 0.5,			//背景速度
		road: [1282, 290],	//路的w,h,x,y
		item: [59, 62],		//障碍物w，h
		aItemPos: [161, 205, 249],		//障碍物位置 y
		//aFrogPos: [131, 175, 219],		//青蛙位置 y
		aFrogPos: [131, 175, 219],		//青蛙位置 y
		aBtn: [110, 70],			//按钮w，h
		iSpeed: 8,			//背景速度
		aPlayer: [1968, 90, 132, 90, 15],		//玩家 总宽度，总高度，单w，单h
		aPlayerIndex: 1,	//玩家位置
		aSpeedUp: [297, 41, 99, 41, 3],		//提高速度 总宽度，总高度，单w，单h
		bIsStart: false,	//是否开始
		iTime: 20,			//倒计时时间 /s
		iDiff: 0,			//倒计时累加改变时间
		addTimeOne: true,	//是否添加一次
		iSpeedChangeTime: 1000,	//速度改变间隔
		addStep: 0,			//添加障碍物累积时间
		addGap: 70,			//添加障碍物间隔
		bStartTime: false,	//开始倒计时按钮
		score: 0			//分数
	};