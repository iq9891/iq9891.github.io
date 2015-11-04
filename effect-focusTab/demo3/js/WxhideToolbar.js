
document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
    WeixinJSBridge.call('hideToolbar');
    WeixinJSBridge.on('menu:setfont', function (argv) {
        var num = parseInt(argv.fontSize);
        changefont(num);
        return;

    });
    WeixinJSBridge.on('menu:share:appmessage', function (argv) {
        sendShareCommand('sendAppMessage');
        return;
    });
    WeixinJSBridge.on('menu:share:timeline', function (argv) {
        sendShareCommand('shareTimeline');
        return;
    });
    function sendShareCommand(command) {

        WeixinJSBridge.invoke(command, {
            "appid": '',
            "img_url": 'http://peugeot.moadx.cn/campaign/H5/images/share_cx_508.jpg', // 分享到朋友圈的缩略图
            "img_width": "200",
            "img_height": "200",
            "link": 'http://peugeot.moadx.cn/campaign/H5/CarInfo_508.aspx',
            "desc": '东风标致抢钱运动',
            "title": "东风标致抢钱运动"
        }, function (res) {

        });
    }
    window.bindEvent('#shareTimeline', 'click', function () {
        sendShareCommand(this);
    });
    window.bindEvent('#sendAppMessage', 'click', function () {
        sendShareCommand(this);
    });

    window.bindEvent('#isShareBuy', 'click', function () {
        sendShareCommand(this);
    });

}, false);