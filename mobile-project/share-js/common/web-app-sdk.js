var MbWebAppSDK = {};
//当设置不成功时,时间间隔
MbWebAppSDK.TO = 500;
var isIOSApp = false;
//url 参数
//navi=bottom    //导航栏将出现在底部
//navi=top     //导航栏将出现在顶部
//isLogin=1 H5需要登录才能查看
//isLogin=0 H5不需要登录就能查看 默认也是H5不需要登录就能查看
//unico_appinfo={"appName":"有范", "appVersion":"4.0.0","deviceModel":"ios"} 设备信息



//参数p_type
//1:单品
//2:某个搭配详情
//3:某个品牌详情
//4:某个话题详情
//5:某个设计师个人界面
//6:某个专题详情
//7:某个活动详情
//8:品牌列表
//9:话题列表
//10:专题列表
//12:单品列表
//13:活动列表
//14:最+搭配
//15:时尚达人
//16:推荐品牌
//17:消息列表
//18:通知列表
//19:饭票领取页
//20:话题新tab列表
//21:购物袋
//22:我的钱包
//23:我的范票
//24:我的收藏
//25:扫一扫
//27:我买到的
//28:搜索
//30:发现
//31:我参与的话题
//32:每日新品
//33:发现场景商品购买页
//34:发现场景more
//35:发现品牌more
//36:设计师列表
//37:单品参数选择
//39:登录界面
//42:批量购物车
//102:分类tab页面 热门
//103:分类tab 页面 品类
//104:分类tab 页面 品牌
//105:灵感 tab 资讯
//106:首页带关键字跳转到搜索页  （一个新的页面）
//107:限时激价格
//108:首页当作二级页面
//111:搜索联想 单品
//112:搜索联想 品牌
//113:搜索联想 资讯
// 函数修改 增加p_needClose参数
MbWebAppSDK.jumpToApp = function (p_type, p_tid, p_spID, p_needClose) {
    if (p_needClose == undefined) {
        p_needClose = 0;
    }
    if (checkTwiceProblem()) {
        return;
    }
    var url = "";
    var isH5 = "0";
    if (p_type === GlobalModel.JUMP_TYPE_SPECIAL) {
        isH5 = "1";
        if (!isNaN(p_tid)) {
            url = GlobalModel.SPECIAL_BASE_URL + p_tid;
        } else if (p_tid.indexOf('http') >= 0) {
            url = p_tid;
        }
    }
    if (isIOSApp) {
        if (p_type === GlobalModel.JUMP_TYPE_SPECIAL) {
            ocAPI_jumpH5View(url);
        } else {

            if (typeof(ocAPI_jumpLocalView2) != 'undefined') {
                ocAPI_jumpLocalView2({
                    jump_type: p_type,
                    tid: p_tid,
                    is_h5: 0,
                    spID: p_spID,
                    needCloseSelf: p_needClose
                });
            }
            else if (typeof(ocAPI_jumpLocalView) != 'undefined') {
                ocAPI_jumpLocalView(p_type, p_tid);
            }
            else {
                url = "?jump_type=" + p_type + "&tid=" + p_tid;
                window.location.href = url;
            }
        }

    } else if (window.android) {
        if (p_spID && p_type === GlobalModel.JUMP_TYPE_ITEM) {
            p_tid += ',' + p_spID;
        }
        if (typeof (window.android.jumpLocalView22) != 'undefined') {

            var data = JSON.stringify({jump_type: p_type, tid: p_tid, url: url, is_h5: isH5, needCloseSelf: p_needClose});
            window.android.jumpLocalView22(data);
        } else {
            window.android.bannerJump(p_type, p_tid, "", isH5, url, "", "", "");
        }

    }
};
/*
 * 控制原生显示分享按钮
 * */
MbWebAppSDK.controlShare = function (p_bool) {
    var param = 0;
    if (p_bool) {
        param = 1;
    }
    if (isIOSApp) {
        if (typeof(ocAPI_showShareButton) != 'undefined') {
            ocAPI_showShareButton(param);
        } else {
            window.location.href = "?isShare=" + param;
        }
    } else if (window.android) {
        if (typeof(window.android.isShare) != 'undefined') {
            window.android.isShare(param);
        }
    }


};

/*
 * 弹出原生分享
 * */
MbWebAppSDK.showShare = function () {
    if (checkTwiceProblem()) {
        return;
    }
    if (isIOSApp) {
        if (typeof(ocAPI_showSharePanel) != 'undefined') {
            ocAPI_showSharePanel();
        } else {
            window.location.href = "?Method=showWebShare";
        }

    } else if (window.android) {
        if (typeof(window.android.showShare) != 'undefined') {
            window.android.showShare();
        }
    }


};

/*
 * 原生返回
 * */
MbWebAppSDK.onBack = function () {
    if (checkTwiceProblem()) {
        return;
    }
    if (isIOSApp) {
        if (typeof(ocAPI_back) != 'undefined') {
            ocAPI_back();
        } else {
            window.location.href = "?Method=isBack";
        }
    } else if (window.android) {
        if (typeof( window.android.onJsFinish) != 'undefined') {
            window.android.onJsFinish();
        }

    }


};
/*
 * 设置html5抬头
 * */
MbWebAppSDK.setH5Title = function (p_title) {
    var isSuccess = false;
    if (isIOSApp) {
        if (typeof(ocAPI_setTitle) != 'undefined') {
            ocAPI_setTitle(p_title);
            isSuccess = true;
        }
    } else if (window.android) {
        if (typeof(window.android.setTitle) != 'undefined') {
            window.android.setTitle(p_title);
            isSuccess = true;
        }
    }
    if (!isSuccess) {
        setTimeout(function () {
            MbWebAppSDK.setH5Title(p_title);
        }, MbWebAppSDK.TO);
    }
};

MbWebAppSDK.addressInputDone = function () {
    if (checkTwiceProblem()) {
        return;
    }
    if (isIOSApp) {
        if (typeof(ocAPI_addressInputDone) != 'undefined') {
            ocAPI_addressInputDone();
        } else {
            window.location.href = "?Method=addressInputDone";
        }

    } else if (window.android) {

    }


};

/*
 * 显示导航栏
 * */
MbWebAppSDK.showNavigtor = function (p_bool) {
    var param = 0;
    if (p_bool) {
        param = 1;
    }
    if (isIOSApp) {
        if (typeof(ocAPI_showNavigationBar) != 'undefined') {
            ocAPI_showNavigationBar(param);
        } else {
            window.location.href = "?isShowTitle=" + param;
        }

    } else if (window.android) {
        if (typeof( window.android.getTitleState) != 'undefined') {
            window.android.getTitleState(param);
        }
    }


};

/*
 *资讯跳转活动的单品
 * */
MbWebAppSDK.jumpToAppActivity = function (p_isCollocation, p_tempId, p_actvityId) {
    /*
     param:
     1为搭配
     0为单品
     */
    var param = 0;
    if (p_isCollocation) {
        param = 1;
    }
    if (isIOSApp) {
        if (typeof(ocAPI_activityGoShopping) != 'undefined') {
            ocAPI_activityGoShopping(param, p_tempId, p_actvityId);
        } else {
            window.location.href = "?Method=activityGoShopping&isCollocation=" + param + "&id=" + p_tempId + "&actvityId=" + p_actvityId;
        }

    } else if (window.android) {
        if (typeof( window.android.activityGoShopping) != 'undefined') {
            window.android.activityGoShopping(param, p_tempId, p_actvityId);
        }

    }


};

/*
 判断是否再app中
 * */
MbWebAppSDK.isApp = function () {
    var flag = false;
    if ((typeof (isIOSApp) != "undefined" && isIOSApp) || (typeof(ocAPI_jumpLocalView) != 'undefined')) {
        flag = true;
    } else if (typeof (window.android) != "undefined" && window.android && typeof (window.android.bannerJump) != "undefined") {
        flag = true;
    }
    return flag;
};
/*
 * android中
 * */
MbWebAppSDK.isAndroidApp = function () {
    if (typeof (window.android) != "undefined" && window.android) {
        return true;
    } else {
        return false;
    }
};

/*
 * 在ios中
 * */
MbWebAppSDK.isIosApp = function () {
    if ((typeof (isIOSApp) != "undefined" && isIOSApp) || (typeof(ocAPI_jumpLocalView) != 'undefined')) {
        return true;
    } else {
        return false;
    }
};


/*
 * 说明：微信分享配置
 * title（分享的标题）
 * desc（分享的描述）
 * imgUrl(分享的图标)
 * link（分享的连接）
 * callback（分享成功后执行的回调函数名称）
 *
 title: '有范',
 desc: '有范是一种生活态度!',
 imgUrl: 'http://metersbonwe.qiniucdn.com/ic_launcher.png',
 link: 'http://a.app.qq.com/o/simple.jsp?pkgname=com.metersbonwe.www',
 callback: ''
 */
MbWebAppSDK.SetShareContent = function (p_config) {
    var isSuccess = false;
    //第一次分享
    if (MbWebAppSDK.isIosApp()) {
        if (typeof(ocAPI_setShareContent) != 'undefined') {
            ocAPI_setShareContent(p_config.title, p_config.desc, p_config.imgUrl, p_config.link, p_config.callback);
            isSuccess = true;
        }
    } else if (MbWebAppSDK.isAndroidApp()) {
        if (typeof(window.android.shareContent) != 'undefined') {
            window.android.shareContent(p_config.title, p_config.desc, p_config.imgUrl, p_config.link, p_config.callback);
            isSuccess = true;
        }
    }
    if (!isSuccess) {
        setTimeout(function () {
            MbWebAppSDK.SetShareContent(p_config);
        }, MbWebAppSDK.TO);
    }
};


/*
 * countMax(选图的最大数量)
 * sizeMax(单张图片的最大尺寸，单位k)
 * sourceType('album':相册, 'camera':相机,'all':全部)
 * success(选图成功后执行的回调函数)
 *
 countMax: 1,
 sizeMax: 1000,
 sourceType: 'album',
 success: ''
 */
MbWebAppSDK.chooseImage = function (p_config) {
    var $config = p_config;
    if (MbWebAppSDK.isIosApp()) {
        if (typeof(ocAPI_chooseSystemImage) != 'undefined') {
            ocAPI_chooseSystemImage($config.countMax, $config.sizeMax, $config.sourceType, $config.success);
        }
    } else if (MbWebAppSDK.isAndroidApp()) {
        if (typeof(window.android.chooseSystemImage) != 'undefined') {
            window.android.chooseSystemImage($config.countMax, $config.sizeMax, $config.sourceType, $config.success);
        }
    }

};

/*
 * url:图片本地地址(设备上的地址)
 * sizeType：‘original’：原图，‘compressed’：‘缩略图’
 * success：(预览成功后执行的回调函数)
 *
 *   url: '',
 sizeType: 'original',
 success: ''
 */
MbWebAppSDK.previewImage = function (p_config) {
    var $config = p_config;
    if (MbWebAppSDK.isIosApp()) {
        if (typeof(ocAPI_getImage) != 'undefined') {
            //获取预览图片的地址（ios需要将图片拷贝到沙箱中，然后返回图片的base64数据）
            ocAPI_getImage($config.url, $config.sizeType, $config.success);
        }

    } else if (MbWebAppSDK.isAndroidApp()) {
        if ($config.success != '') {
            var callback = new Function('return ' + $config.success + '(\'' + $config.url + '\')')();
            callback();
        }
    }
};

/*
 * localIds:需要上传的图片的本地ID列表（通过分号分割），由chooseImage接口获得
 * success：(上传成功后执行的回调函数)
 */
MbWebAppSDK.uploadImage = function (p_config) {
    var $config = p_config;
    if (MbWebAppSDK.isIosApp()) {
        if (typeof(ocAPI_uploadImage) != 'undefined') {
            ocAPI_uploadImage($config.localIds, $config.success);
        }
    } else if (MbWebAppSDK.isAndroidApp()) {
        if (typeof(window.android.uploadImage) != 'undefined') {
            window.android.uploadImage($config.localIds, $config.success);
        }
    }
};

/*
 *redirectUri：认证成功后返回页面的地址
 *sucessCallBack：认证后回调函数 data值如下：
 {
 "isSucess":false,
 "msg" :"error!",
 "result":""
 }，
 {
 "isSucess":true,
 "msg" :"",
 "result" => “http://www.baidu.com”;
 }
 *微信认证
 */
MbWebAppSDK.wechatlogin = function (p_config) {
    var $config = p_config;
    var redirectUri = encodeURIComponent(SERVER_CONFIG + "/sdk_wx_authorization/wechart_authorization.php?callback=&getUserInfo=1&business_Url=" + $config.redirectUri);
    $.getJSON(SERVER_CONFIG + "/sdk_wx_authorization/wechart_authorization.php?callback=?", {
            getAuthorizeUrl: "1",
            redirect_uri: redirectUri
        },
        function (json, status, xhr) {
            if (typeof($config.sucessCallBack) == "function") {
                $config.sucessCallBack(json);
            }
        }
    );

};


/*
 *userId：用户的ID
 *orderId:订单ID
 *sucessCallBack：向微信发起支付请求的Url data值如下：
 {
 "isSucess":false,
 "msg" :"error!",
 "result":""
 }，
 {
 "isSucess":true,
 "msg" :"",
 "result" => “http://www.baidu.com”;
 }
 *微信支付
 */
MbWebAppSDK.wechatpay = function (p_config) {
    var $config = p_config;
    $.getJSON(SERVER_CONFIG + "/sdk_wx_pay/WxPay.php?callback=?", {
            "userId": $config.userId,
            "orderId": $config.orderId
        },
        function (json, status, xhr) {
            if (typeof($config.sucessCallBack) == "function") {
                $config.sucessCallBack(json);
            }
        }
    );

};

/*
 * 设置导航栏的位置
 * p_pos字符串 up上边 bottom 下边
 */
MbWebAppSDK.setNaviBarPos = function (p_pos) {
    if (MbWebAppSDK.isIosApp()) {
        if (typeof(ocAPI_setNavigationBarPosition) != 'undefined') {
            ocAPI_setNavigationBarPosition(p_pos);
        }
    } else if (MbWebAppSDK.isAndroidApp()) {
        if (typeof(window.android.setNavigationBarPosition) != 'undefined') {
            window.android.setNavigationBarPosition(p_pos);
        }
    }
};

/*
 * 设置导航栏 右边按钮
 * 组成数组
 *   [{title:"会员规则", callback:"jsFUn1"}, {title:"分享", callback:""}, {title:"白色点赞", callback:"jsFUn3"}]
 * 点赞按钮 白色点赞 未点赞 黑色点赞 已点赞
 */
MbWebAppSDK.setNaviRigBtn = function (p_param) {
    var str = JSON.stringify(p_param);
    var isSuccess = false;
    if (MbWebAppSDK.isIosApp()) {
        if (typeof(ocAPI_setNavigationRightButtons) != 'undefined') {
            ocAPI_setNavigationRightButtons(str);
            isSuccess = true;
        }
    } else if (MbWebAppSDK.isAndroidApp()) {
        if (typeof(window.android.setNavigationRightButtonWithTitle) != 'undefined') {
            window.android.setNavigationRightButtonWithTitle(str);
            isSuccess = true;
        }
    }
    if (!isSuccess) {
        setTimeout(function () {
            MbWebAppSDK.setNaviRigBtn(p_param);
        }, MbWebAppSDK.TO);
    }
};


/*
 * 仅限ios使用
 * p_param "YES"可以滚动  "NO"不能滚动
 * */
MbWebAppSDK.setLocalScrollEnabled = function (p_param) {
    if (typeof(ocAPI_setLocalScrollEnabled) != 'undefined') {
        ocAPI_setLocalScrollEnabled(p_param);
    }
};
/*
 * 获取用户信息
 * 返回参数
 * '{userToken: "13131313131313"; userId:"ffff"}'
 * */
MbWebAppSDK.getUserInfo = function () {
    var rltContent = null;
    if (MbWebAppSDK.isIosApp()) {
        if (typeof(ocAPI_getUserInfo) != 'undefined') {
            rltContent = ocAPI_getUserInfo();
        }
    } else if (MbWebAppSDK.isAndroidApp()) {
        if (typeof(window.android.getUserInfo) != 'undefined') {
            rltContent = window.android.getUserInfo();
        }
    }
    if (rltContent) {
        return JSON.parse(rltContent);
    } else {
        return null;
    }
};

/*
 * 通知本地App清除登录状态
 * */
MbWebAppSDK.setLogout = function () {
    if (MbWebAppSDK.isIosApp()) {
        if (typeof(ocAPI_setLogout) != 'undefined') {
            ocAPI_setLogout();
        }
    } else if (MbWebAppSDK.isAndroidApp()) {
        if (typeof(window.android.setLogout) != 'undefined') {
            window.android.setLogout();
        }
    }
};

/*
 * 获取app信息
 * */
MbWebAppSDK.getAppInfo = function () {
    var info = null;
    if (MbWebAppSDK.isIosApp()) {
        if (typeof(ocAPI_getAppInfo) != 'undefined') {
            info = ocAPI_getAppInfo();
        }
    } else if (MbWebAppSDK.isAndroidApp()) {
        if (typeof(window.android.getAppInfo) != 'undefined') {
            info = window.android.getAppInfo();
        }
    }
    return info;
};
/*
 * 跳回上一个本地页面
 * */
MbWebAppSDK.goBack = function () {

    if (isIOSApp) {
        if (typeof(ocAPI_popBack) != 'undefined') {
            ocAPI_popBack();
        }
    } else if (window.android) {
        if (typeof(window.android.popBack) != 'undefined') {
            window.android.popBack();
        }
    }


};
/*
 * 跳回上一个本地页面  也就是可以关闭多个 h5
 * */
MbWebAppSDK.jumpLastLocal = function () {

    if (isIOSApp) {
        if (typeof(ocAPI_jumpToLastLocal) != 'undefined') {
            ocAPI_jumpToLastLocal();
        }
    } else if (window.android) {
        if (typeof(window.android.jumpToLastLocal) != 'undefined') {
            window.android.jumpToLastLocal();
        }
    }


};

/*
 * 保存图片到本地相册
 * */
MbWebAppSDK.saveGallery = function (p_data) {
    if (isIOSApp) {
        if (typeof(ocAPI_send512BOfImageDataToAlbum) != 'undefined') {
            ocAPI_send512BOfImageDataToAlbum(p_data.imageTag, p_data.index, p_data.data, p_data.callBack);
        }
    } else if (window.android) {
        if (typeof(window.android.saveToGallery) != 'undefined') {
            window.android.saveToGallery(p_data.imageTag, p_data.index, p_data.data, p_data.callBack);
        }
    }
};

/*
* app 代替返回按钮
* p_data js函数名称
* */
MbWebAppSDK.replaceBackFun = function(p_data){
    if (isIOSApp) {
        if (typeof(ocAPI_replaceBackFun) != 'undefined') {
            ocAPI_replaceBackFun(p_data);
        }
    } else if (window.android) {
        if (typeof(window.android.replaceBackFun) != 'undefined') {
            window.android.replaceBackFun(p_data);
        }
    }
};





