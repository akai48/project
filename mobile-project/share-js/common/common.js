var BaiDuSdk = {};
//统计pv
//用于发送某个指定URL的PV统计请求，通常用于AJAX页面的PV统计。
BaiDuSdk.trackPageview = function (p_pageURL) {
    if (typeof(_hmt) === 'undefined' || !_hmt) {
        return;
    }
    _hmt.push(['_trackPageview', p_pageURL]);
};
//统计点击事件
//用于触发某个事件
/*
 category	必选	String	要监控的目标的类型名称
 action		必选	String	用户跟网页进行交互的动作名称
 opt_label	可选	String	事件的一些额外信息
 opt_value	可选	Number	跟事件相关的数值
 */
BaiDuSdk.trackEvent = function (p_category, p_action, p_opt_label, p_opt_value) {
    if (typeof(_hmt) === 'undefined' || !_hmt) {
        return;
    }
    var condition = ['_trackEvent', p_category, p_action];
    if (p_opt_label) {
        condition.push(p_opt_label);
    }
    if (p_opt_value) {
        condition.push(p_opt_value);
    }
    _hmt.push(condition);
};

$.parseUrlQuery = function (p_url) {
    var query = {}, i, params, param;
    if (p_url.indexOf('?') >= 0) p_url = p_url.split('?')[1];
    else return query;
    params = p_url.split('&');
    for (i = 0; i < params.length; i++) {
        param = params[i].split('=');
        query[param[0]] = param[1];
    }
    return query;
};

if(typeof(closeFastClick) === "undefined"){
    $(document).ready(function () {
        //懒加载页面初始化
        //if ($('img.lazy').length > 0) {
        //    lazyBgImgInit($('img.lazy'));
        //}
        //通过fastclick解决300毫秒的延时问题
        window.addEventListener('load', function () {
            FastClick.attach(document.body);
        }, false);
    });
}




function checkMobile(str) {
    var re = /^1\d{10}$/;
    if (re.test(str)) {
        return true;
    } else {
        return false;
    }
}

//判断有效日期
function checkDate(p_val) {
    if (p_val.match(/^((((1[6-9]|[2-9]\d)\d{2})-(0?[13578]|1[02])-(0?[1-9]|[12]\d|3[01]))|(((1[6-9]|[2-9]\d)\d{2})-(0?[13456789]|1[012])-(0?[1-9]|[12]\d|30))|(((1[6-9]|[2-9]\d)\d{2})-0?2-(0?[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))-0?2-29-))$/) == null) {
        return false;
    }
    return true;
}

var isArray = function (obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
};

function loadWechatConfig() {
    if (!isWeixin()) {
        return;
    }

    wx.error(function (res) {
        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
        document.title = "全球时尚，有范搭配";
        // 用来暗示错误
    });

    $.getJSON(WX_JS_SDK_CONFIG, {url: location.href.split('#')[0]}, function (json, status, xhr) {
        //json.debug = true;
        wx.config(json);
    });
}

// 新版接口
function setWechatAPI(info) {
    if (!isWeixin()) {
        return;
    }
    document.title = info.title;
    wx.ready(function () {

        // 获取“分享到QQ”按钮点击状态及自定义分享内容接口
        wx.onMenuShareQQ(info);
        // 获取“分享到腾讯微博”按钮点击状态及自定义分享内容接口
        wx.onMenuShareWeibo(info);

        // 获取“分享给朋友”按钮点击状态及自定义分享内容接口
        wx.onMenuShareAppMessage(info);

        // 分享到微信朋友圈
        // 这里是异步操作，不要直接修改info对象，重新复制一个
        var infoTimeline = {
            "imgUrl": info.imgUrl,
            "link": info.link,
            "desc": info.desc,
            "title": info.title
        };
        wx.onMenuShareTimeline(infoTimeline);
    });
}

// 获得url参数对象
function getRequest(name, targetString) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = null;
    if (targetString) {
        targetString = targetString.split("html?");
        if (targetString && targetString.length > 1) {
            r = targetString[1].match(reg);
        }
    } else {
        r = window.location.search.substr(1).match(reg);
    }
    if (r !== null) return unescape(r[2]);
    return null;
}


function downloadApp() {
    location.href = APP_DOWNLOAD;
}

function downloadFromFunwear() {
    location.href = FUNWEAR_DOWNLOAD;
}

function isAppClickEventByStr(p_str) {
    if (!p_str) {
        p_str = "请下载有范app之后，参与哟！";
    }
    if (!isIOSApp && !window.android) {
        UIwx.alert(p_str, '有范', function () {
            downloadApp();
        });
        return false;
    }
    return true;
}


/*
 * 在手机里打开，但是不在主流分享浏览器中打开，返回true
 * */
function isWebView() {
    if (isMobile() && !isQQBrowser() && !isUCBrowser() && !isWeixin() && !isWeibo()) {
        return true;
    } else {
        return false;
    }
}
//判断平台和浏览器
function isMobile() {
    var ua = navigator.userAgent.toLowerCase();
    return ua.match(/mobile/i) == "mobile";
}

function isQQBrowser() {
    var ua = navigator.userAgent.toLowerCase();
    return ua.match(/mqqbrowser/i) == "mqqbrowser";
}

function isUCBrowser() {
    var ua = navigator.userAgent.toLowerCase();
    return ua.match(/ucbrowser/i) == "ucbrowser";
}

function isWeixin() {
    var ua = navigator.userAgent.toLowerCase();
    return ua.match(/MicroMessenger/i) == "micromessenger";
}

function isWeibo() {
    var ua = navigator.userAgent.toLowerCase();
    return ua.match(/weibo/i) == "weibo";
}


function isAndroid() {
    var sUserAgent = navigator.userAgent.toLowerCase();
    return sUserAgent.match(/android/i) == "android";
}

function isIOS() {
    var sUserAgent = navigator.userAgent.toLowerCase();
    return sUserAgent.match(/iphone/i) == "iphone" || sUserAgent.match(/ipad/i) == "ipad";
}

/*
 小米3和galaxy s4等手机，在html5这个框架下，会点击两次
 */
var INTERVAL_MIN = 600;
var INTERVAL_MIN2 = 250;
var LAST_CALL_TIME = (new Date()).getTime();
function checkTwiceProblem() {
    //framework7 1.20版本已经解决了这个问题，所以直接return false
    return false;
    if (!window.android) {
        return;
    }
    var curTime = (new Date()).getTime();
    //两次tap事件的间隔如果不大于500
    if ((curTime - LAST_CALL_TIME < INTERVAL_MIN) && (curTime - LAST_CALL_TIME > INTERVAL_MIN2)) {
        //myApp.alert(curTime - LAST_CALL_TIME);
        LAST_CALL_TIME = curTime;

        return true;
    }

    LAST_CALL_TIME = curTime;
    return false;
}

function clearSession() {
    removeValueFromLocation(COOKIE_USER_INFO);
}

function getSessionKey() {
    var sessionKey;
    var userInfo = getValueFromLocation(COOKIE_USER_INFO);
    if (!jQuery.isEmptyObject(userInfo)) {
        if (userInfo) {
            sessionKey = userInfo['session'];
        } else {
            sessionKey = null;
        }
    } else {
        sessionKey = null;
    }

    // for test !!!
    // sessionKey = "xxxxxxxx";

    return sessionKey;
}

function commonErrorHandler(p_info) {
    UIwx.alert(p_info.info);
}

function actionCallForNew(p_actionParam, p_onSuccess, p_onFail, p_target, p_closeLoading) {
    if (!p_actionParam) {
        p_actionParam = {};
    }
    if (!p_closeLoading) {
        loadPicShow();
    }
    //这个调用方式和pc，webapp不一样，为了兼容zepto.js框架
    $.getJSON(SERVER_NEW_BASE_URL, p_actionParam, function (json) {
        if (!p_closeLoading) {
            loadPicHide();
        }
        if (json.status == AJAX_STATUS_SUCCESS) {
            p_onSuccess.apply(p_target, [json.data]);
        } else {
            if (p_onFail) {
                p_onFail.apply(p_target, [json]);
            } else {
                commonErrorHandler(json);
            }
        }
    }, function (jqxhr, textStatus, error) {
        if (!p_closeLoading) {
            loadPicHide();
        }
    });
}
//post请求
function actionCallForNewByPost(actionParam, onSuccess, onFail) {
    if (!actionParam) {
        actionParam = {};
    }
    var urlParam = {
        m: actionParam.m,
        a: actionParam.a,
        c: actionParam.c
    };

    var plist = "";
    for (p in urlParam) {
        plist += (p + "=" + urlParam[p] + "&")
    }
    plist = plist.substring(0, plist.length - 1);

    $.ajax({
        url: SERVER_NEW_BASE_URL_POST + "?" + plist,
        data: actionParam,
        type: "POST",
        success: function (res) {
            onSuccess(res);
        },
        error: function (res) {
            if (onFail) {
                onFail(res);
            } else {
                commonErrorHandler(res);
            }
        }
    });
}

function saveValueToLocation(key, value, isStrType) {
    var str;
    if (isStrType) {
        str = value;
    } else {
        str = JSON.stringify(value);

    }
    //判断是非支持html5
    if (window.applicationCache) {
        localStorage.setItem(key, str);
    } else {
        setCookie(key, str, 1);
    }


}
//判断是非支持html5
function getValueFromLocation(key, isStrType) {
    var str;
    if (window.applicationCache) {
        str = localStorage.getItem(key);
    } else {
        str = getCookie(key);
    }

    if (isStrType) {
        return str;
    } else {
        if (!str) {
            return {};
        } else {
            return JSON.parse(str);
        }

    }
}


//判断是非支持html5
function removeValueFromLocation(key) {
    if (window.applicationCache) {
        localStorage.removeItem(key);
    } else {
        delCookie(key);
    }


}
/*
 * sessionStorage 浏览器本地存储 会话关闭时，自动删除数据
 * */
function setSessionStorage(p_key, p_value) {
    if (sessionStorage) {
        sessionStorage.setItem(p_key, p_value);
    }
}
function getSessionStorage(p_key, p_value) {
    if (sessionStorage) {
        return sessionStorage.getItem(p_key, p_value);
    }
}
function removeSessionStorage(p_key) {
    if (sessionStorage) {
        sessionStorage.removeItem(p_key);
    }
}

/*
 * 纪录每次页面跳转前的位置
 * p_param 保存当前页面都参数，比如数据的页数,json字符串保存
 * */
function setLastPageInfo(p_param) {
    var temp = getSessionStorage('LAST_PAGE_INFO');
    var posList;
    if (!temp || temp === "") {
        posList = [];
    } else {
        posList = JSON.parse(temp);
    }
    if (!p_param) {
        p_param = '';
    }
    posList.push({url: window.location.href, pos: $(window).scrollTop(), param: p_param});
    temp = JSON.stringify(posList);
    setSessionStorage('LAST_PAGE_INFO', temp);
}
/*
 * 获取最近一次的页面位置
 * */
function getLastPageInfo() {
    var temp = getSessionStorage('LAST_PAGE_INFO');
    var posList;
    if (!temp || temp === "") {
        return 0;
    } else {
        posList = JSON.parse(temp);
        if (posList.length === 0) {
            setSessionStorage('LAST_PAGE_INFO', '');
            return 0;
        }
        var pos = posList[posList.length - 1];
        if (window.location.href === pos.url) {
            posList.pop();
            setSessionStorage('LAST_PAGE_INFO', JSON.stringify(posList));
            return pos;
        }
    }
}

function convertDateTime(timeStr) {
    if (timeStr.length > 10) {
        timeStr = timeStr.substring(0, 10);
        timeStr = timeStr.replace(/-/g, '.');
    }
    return timeStr;
}
Date.prototype.format = function (format) {
    var o = {
        "M+": this.getMonth() + 1, //month
        "d+": this.getDate(), //day
        "h+": this.getHours(), //hour
        "m+": this.getMinutes(), //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
        "S": this.getMilliseconds() //millisecond
    };

    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
};

//转化"2015-12-31T13:59"
function converDateTimeForInput(p_dt) {
    return p_dt.format("yyyy-MM-ddThh:mm");
}

//计算长度
function chkstrlen(str) {
    var strlen = 0;
    for (var i = 0; i < str.length; i++) {
        if (str.charCodeAt(i) > 255) //如果是汉字，则字符串长度加2
            strlen += 2;
        else
            strlen++;
    }
    return strlen;
}
//截取字符串长度
function cutStrLen(p_str, p_len) {
    var strlen = 0;
    var index = 0;
    p_len = 2 * p_len;
    for (index = 0; index < p_str.length; index++) {
        if (p_str.charCodeAt(index) > 255) //如果是汉字，则字符串长度加2
        {
            strlen += 2;
        }
        else {
            strlen++;
        }
        if (strlen > p_len) {
            break;
        }

    }

    var str = p_str.substring(0, index);
    if (index < p_str.length) {
        str += ".."
    }
    return str;
}

function compressImage(p_img, p_width) {
    if (!p_width) {
        p_width = 375;
    }
    var imgUrl = p_img;
    if (p_img.indexOf('vframe') == -1) {
        imgUrl = p_img + "?imageMogr/v2/auto-orient/thumbnail/" + p_width + "x/quality/60/format/jpg";
    }
    return imgUrl;

}


function calcPercent(p_len, p_originLen) {
    if (p_originLen === 0) {
        return p_len;
    }

    return ((p_len / p_originLen) * 100).toFixed(2);

}


/**
 * soa图片压缩处理
 *
 * @param url
 */
(function () {
    if (typeof String.prototype.startsWith != 'function') {
        String.prototype.startsWith = function (prefix) {
            return this.slice(0, prefix.length) === prefix;
        };
    }

    if (typeof String.prototype.endsWith != 'function') {
        String.prototype.endsWith = function (suffix) {
            return this.indexOf(suffix, this.length - suffix.length) !== -1;
        };
    }

})();


String.prototype.endsWith = function (s) {
    if (s == null || s == "" || this.length == 0 || s.length > this.length)
        return false;
    if (this.substring(this.length - s.length) == s)
        return true;
    else
        return false;
    return true;
};
String.prototype.startWith = function (s) {
    if (s == null || s == "" || this.length == 0 || s.length > this.length)
        return false;
    if (this.substr(0, s.length) == s)
        return true;
    else
        return false;
    return true;
};

//锚点在正中（Center），生成a x b裁剪图
//http://developer.qiniu.com/resource/gogopher.jpg?imageMogr2/gravity/Center/crop/300x300
function cutPicUrlInMiddle(p_url, p_width, p_heigth) {
    if (p_url.indexOf('qiniucdn') != -1) {
        var imgUrl = p_url;
        //if (p_url.indexOf('vframe') == -1) {
        //    imgUrl = p_url + '?imageMogr2/gravity/Center/crop/' + p_width + 'x' + p_heigth;
        //}
        imgUrl = p_url + '?imageMogr2/gravity/Center/crop/' + p_width + 'x' + p_heigth;
        return imgUrl;
    } else {
        return p_url;
    }
}

//http://metersbonwe.qiniucdn.com/Fs6HXVKN818ercY4K-hIB7fANQhq?imageView2/1/w/350/h/400/quality/60/format/jpg
function reducePicUrl(p_url, p_width, p_heigth) {
    if (p_url.indexOf('qiniucdn') != -1) {
        var imgUrl = p_url;
        if (p_url.indexOf('vframe') == -1) {
            imgUrl = p_url + '?imageView2/1/w/' + p_width + '/h/' + p_heigth;
        }
        return imgUrl;
    } else {
        return p_url;
    }
}

//http://img8.ibanggo.com/sources/images/goods/TP/816136/816136_01--w_430_h_430.jpg。
function getSoaThumUrl(p_url, p_width, p_heigth) {
    if (p_url == null) return "";
    if (p_url.indexOf('qiniucdn') != -1) {
        return compressImage(p_url, p_width);
    }
    // if (p_url.indexOf(".mixme.cn/sources") < 0) return p_url;
    if ((p_url.endsWith(".jpg")) || (p_url.endsWith(".png")) || (p_url.endsWith(".jpeg"))) {
        if (p_url.indexOf("ibanggo") != -1) {
            p_url = p_url.substring(0, p_url.lastIndexOf(".")) + "--w_" + p_width + "_h_" + p_heigth + ".jpg";
        } else {
            p_url = p_url.substring(0, p_url.lastIndexOf(".")) + "--" + p_width + "x" + p_heigth + ".jpg";
        }

    } else {
        p_url = p_url + "--" + p_width + "x" + p_heigth + ".jpg";
    }

    return p_url;
}
/**
 * soa图片压缩处理
 *
 * @param url
 */

function getSoaThumUrlPng(p_url, p_width, p_heigth) {
    if (p_url == null) return "";
    // if (p_url.indexOf(".mixme.cn/sources") < 0) return p_url;
    if ((p_url.endsWith(".jpg")) || (p_url.endsWith(".png")) || (p_url.endsWith(".jpeg"))) {
        if (p_url.indexOf("ibanggo") != -1) {
            p_url = p_url.substring(0, p_url.lastIndexOf(".")) + "--w_" + p_width + "_h_" + p_heigth + ".png";
        } else {
            p_url = p_url.substring(0, p_url.lastIndexOf(".")) + "--" + p_width + "x" + p_heigth + ".png";
        }
    } else {
        p_url = p_url + "--" + p_width + "x" + p_heigth + ".png";
    }
    return p_url;
}
//预先加载图片 针对弹出的页面
function preloadImg(p_url) {
    var img1 = new Image();
    img1.src = p_url;
}
//app外时，显示的黑色下标
function showDownloadInfo(p_tag, p_function) {
    var html = ' <div class="down-app-block " onclick="' + p_function + ';" style="background-color: rgba(0,0,0,0.8);">\
                <div class="app-icon">\
                    <img src="unico/img/logo72.png"  style="width:50px;">\
                </div>\
                <div style="margin-top:10px;">\
                    <h2 style = "color:white;margin:0px;">有范</h2>\
                    <h5 style = "color:grey;margin:0px;">\
                        你离时尚只差一个APP\
                    </h5>\
                    <div class="down-app-btn" style="background-color:yellow;font-weight: bold;color:black;">\
                        立即下载\
                    </div>\
                </div>\
            </div> ';
    $$(p_tag).append(html);
    if (!p_function) {
        p_function = "downloadApp()"
    }
    $$(p_tag).css("display", "block");

}

function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return (r[2]);
    }
    return r;
}

//获取 cookie
function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}

//设置 cookie
function setCookie(name, value, expiresTime) {
    var Days = expiresTime;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path=/";
}

//删除 cookie
function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}

/*
 * 从cookie获取userId,tokenId
 * 1 为userId
 * 2 为tokenId
 * 3 为全部
 * */
function getUserIdFromCookie(p_flag) {
    var result = null;
    var cookieData = getCookie(COOKIE_USER_ID);

    if (cookieData && cookieData != "") {
        if (p_flag === 1) {
            if (cookieData.indexOf('userId') > 0) {
                //只返回userId
                if (JSON.parse(cookieData).userId) {
                    result = JSON.parse(cookieData).userId;
                }
            }
            //return JSON.parse(cookieData).userId;
        } else if (p_flag === 2) {
            if (cookieData.indexOf('tokenId') > 0) {
                //只返回tokenId
                if (JSON.parse(cookieData).tokenId) {
                    result = JSON.parse(cookieData).tokenId;
                }
            }
            // return JSON.parse(cookieData).tokenId;
        } else if (p_flag === 3) {
            if (cookieData.indexOf('userId') > 0 && cookieData.indexOf('tokenId') > 0) {
                //userId和tokenId都返回
                if (JSON.parse(cookieData).tokenId && JSON.parse(cookieData).userId) {
                    result = JSON.parse(cookieData);
                }
            }

        }
    }
    return result;
}

//删除cookie中userId
function deleteUserIdInCookie() {
    return delCookie(COOKIE_USER_ID);
}

//设置userId到cookie中
//单位天
function setUserIdToCookie(p_value, p_day) {
    setCookie(COOKIE_USER_ID, p_value, p_day);
}

//校验字符串长度
function checkStringLength(p_str, p_maxLen, p_minLen) {
    if (p_str === "") {
        return false;
    } else {
        var len = 0;
        for (var i = 0; i < p_str.length; i++) {
            if (p_str.charCodeAt(i) > 256) {
                len += 2;
            } else {
                len++;
            }
        }

        if (len > p_minLen && len < p_maxLen) {
            return true;
        } else {
            return false;
        }
    }
}

function addArray(p_arrayA, p_arrayB) {
    if (p_arrayA && p_arrayB) {
        for (var i = 0; i < p_arrayB.length; i++) {
            p_arrayA.push(p_arrayB[i]);
        }
    }
    return p_arrayA;
}

//检验收货人格式
function checkReceiver(p_name) {
    var re = /^[a-zA-Z\u4e00-\u9fa5]+$/;
    if (re.test(p_name)) {
        return true;
    } else {
        return false;
    }
}

//检验地址格式
function checkAddressDetail(p_address) {
    var re = /^[a-zA-Z0-9\u4e00-\u9fa5]+$/;
    if (re.test(p_address)) {
        return true;
    } else {
        return false;
    }
}

//从微信返回url获取userId和tokenId
//返回
// {
//   userId:XXXX,
//   tokenId:XXXX
// }
function getPersonalForWx() {
    var weiXinData = null;
    var userInfo = {};
    var personal = GetQueryString("personal");
    if (personal) {
        weiXinData = JSON.parse(decodeURIComponent(personal));
        if (weiXinData.isSucess) {
            userInfo.userId = weiXinData.result.openid;
            if (weiXinData.result.tokenID.toString().indexOf("{") < 0) {
                userInfo.tokenId = weiXinData.result.tokenID;
            } else {
                userInfo.tokenId = JSON.parse(weiXinData.result.tokenID);
            }
            setUserIdToCookie(JSON.stringify(userInfo), 0.1);
            return userInfo;
        } else {
            alert(weiXinData.msg);
        }
    }
    return null;
}
//微信登录  p_businessUrl 微信返回的页面url
function wxLogin(p_businessUrl) {
    if (!p_businessUrl) {
        UIwx.alert("参数不能为空");
        return;
    }
    MbWebAppSDK.wechatlogin(
        {
            "redirectUri": p_businessUrl,
            "sucessCallBack": function (data) {
                if (data.isSucess) {
                    window.location.href = data.result;
                } else {
                    alert('微信认证失败，请下载有范app参与活动，谢谢！', downloadApp);
                }
            }
        });
}


//微信响应消息中读取userID和tokenId
function ReadUserIdAndTokenIdFromWX() {
    var weiXinData = null;
    var userInfo = {};
    var personal = GetQueryString("personal");
    if (personal) {
        weiXinData = JSON.parse(decodeURIComponent(personal));
        if (weiXinData.isSucess) {
            userInfo.userId = weiXinData.result.openid;
            userInfo.nickName = weiXinData.result.nickName;
            userInfo.headImgUrl = weiXinData.result.headImgUrl;
            if (weiXinData.result.tokenID.indexOf("{") < 0) {
                userInfo.tokenId = weiXinData.result.tokenID;
            } else {
                userInfo.tokenId = JSON.parse(weiXinData.result.tokenID);
            }

            //userInfo.tokenId = JSON.parse(weiXinData.result.tokenID);
            setUserIdToCookie(JSON.stringify(userInfo), 0.1);
            return userInfo;
        } else {
            alert(weiXinData.msg);
        }
    }
    return null;
}

/*
 * 用于手机上打印log
 * */
function consoleLogForM(p_log) {
    if ($('.console-log').length <= 0) {
        $('body').append('<div style="background-color: white;margin-top:20px;">' +
            '<code class="console-log"></code>' +
            '</div>');
    }
    var temp = $('.console-log').html();
    temp += p_log;
    temp += '<br><br>';
    $('.console-log').html(temp);
    console.log(p_log);
}
/*
 * 提示分享按钮
 * */
function promptShare() {
    var ui = new uiUtility();
    ui.promptShare();
}

/*加载的圈圈显示*/
function loadPicShow() {
    $('body').append('<div class="preloader-indicator-overlay"></div><div class="preloader-indicator-modal"><span class="preloader preloader-white"></span></div>');
}
/*加载的圈圈关闭*/
function loadPicHide() {
    $('.preloader-indicator-overlay,.preloader-indicator-modal').remove();
}

function showMain() {
    $('.common-main').css('visibility', 'visible');
}


/*
 * 默认背景图片http://metersbonwe.qiniucdn.com/grey.gif
 * */
function lazyPicLoad(p_selector, p_param) {
    if (!p_param) {
        p_param = {};
        p_param.threshold = 100;
    }
    if (p_selector) {
        g_lazyLoad.initLazy($(p_selector), p_param);
    }
}
//关闭懒加载
function disableLazy() {
    g_lazyLoad.disableLazy();
}

/*
 * 用于Vue.$watch观察数据时的懒加载,参数为选择器
 * 例子为delayLazy('.lazy')
 * */
function delayLazy(p_selector) {
    if (!p_selector) {
        p_selector = '.lazy';
    }
    //关闭加载
    disableLazy();
    //兼容vue.js做了50毫秒延时
    setTimeout(function () {
        //开启懒加载
        lazyPicLoad(p_selector);
    }, 50);
}

/*
 * 范背景的图片
 * */
function lazyBgImgInit(p_ob, isFan) {
    //灰色背景图
    var bgUrl = 'http://metersbonwe.qiniucdn.com/grey.gif';
    if (isFan) {
        //范背景的图片
        bgUrl = 'http://metersbonwe.qiniucdn.com/empty_m-0115.jpg';
    }


    p_ob.each(function () {
        var par = $(this).attr('bg-size');
        var size;
        if (par && par.length > 0) {
            size = par.split('x');
            if (size.length === 2) {
                $(this).attr('src', bgUrl + '?imageView2/1/w/' + size[0] + '/h/' + size[1]);
            }
        } else {
            $(this).attr('src', bgUrl);
        }
    });

}
//获取价值商品铺款背景图
/*http://metersbonwe.qiniucdn.com/empty_m-0115.jpg?imageView2/1/w/335/h/455/
 *直接使用
 * */
function getLazyBgImg(p_width, p_height, p_url) {
    if (!p_url) {
        p_url = 'http://metersbonwe.qiniucdn.com/empty_m-0115.jpg';
    }
    return reducePicUrl(p_url, p_width, p_height);
}

function jumpOther(p_type, p_tid, p_spID, p_needClose, p_pageParam) {
    //if(isWeixin()){
    setLastPageInfo(p_pageParam);
    //}
    if (p_type === GlobalModel.JUMP_TYPE_SPECIAL_URL) {
        p_tid = p_tid.replace(/\*o\*/g, '/');
        p_type = GlobalModel.JUMP_TYPE_SPECIAL;
    }
    if (!MbWebAppSDK.isApp()) {
        if (p_type === GlobalModel.JUMP_TYPE_ITEM) {
            window.location.href = GlobalModel.ITEM_BASE_URL + p_tid;
        } else if (p_type === GlobalModel.JUMP_TYPE_SPECIAL) {
            var url = '';
            if (!isNaN(p_tid)) {
                url = GlobalModel.SPECIAL_WX_SP_BASE_URL + p_tid;
            } else if (p_tid.indexOf('http') >= 0) {
                url = p_tid;
            }
            window.location.href = url;
        } else if (p_type === GlobalModel.JUMP_TYPE_SPECIAL_URL) {
            window.location.href = p_tid;
        } else if (p_type === GlobalModel.JUMP_TYPE_BRAND) {
            window.location.href = GlobalModel.BRAND_BASE_URL + p_tid;
        } else if (p_type === GlobalModel.JUMP_TYPE_COLLOCATION) {
            window.location.href = GlobalModel.CO_BASE_URL + p_tid;
        }
    } else {
        MbWebAppSDK.jumpToApp(p_type, p_tid, p_spID, p_needClose);
    }
}

/*
 * 上拉加载
 * p_threshold 离底部的阈值
 * p_fun 处理的函数
 * */
function pullLoadInit(p_threshold, p_fun) {
    var screenHeight = window.screen.availHeight;
    $(window).scroll(function () {
        var scrollHeight = $(window).scrollTop();
        if (screenHeight + scrollHeight >= document.body.clientHeight - p_threshold) {
            if (p_fun) {
                p_fun();
            }
        }
    });
}

/*
 * 添加已经到底啦
 * */
function addLastTip() {
    if ($('.bottom-tips').length <= 0) {
        $('body').append('<p class="bottom-tips" >已经到底啦O(n_n)O</p>')
    }
}

function removeLastTip() {
    if ($('.bottom-tips').length > 0) {
        //$('body').append('<p class="bottom-tips" >已经到底啦O(n_n)O</p>')
        $('.bottom-tips').remove();
    }
}
/*
 * 回到顶部
 * */
function goTop() {
    excuteGoTop(0.5);
}
function excuteGoTop(acceleration, time) {
    acceleration = acceleration || 0.1;
    time = time || 16;
    var x1 = 0;
    var y1 = 0;
    var x2 = 0;
    var y2 = 0;
    var x3 = 0;
    var y3 = 0;
    if (document.documentElement) {
        x1 = document.documentElement.scrollLeft || 0;
        y1 = document.documentElement.scrollTop || 0;
    }
    if (document.body) {
        x2 = document.body.scrollLeft || 0;
        y2 = document.body.scrollTop || 0;
    }
    x3 = window.scrollX || 0;
    y3 = window.scrollY || 0;
    // 滚动条到页面顶部的水平距离
    var x = Math.max(x1, Math.max(x2, x3));
    // 滚动条到页面顶部的垂直距离
    var y = Math.max(y1, Math.max(y2, y3));
    // 滚动距离 = 目前距离 / 速度, 因为距离原来越小, 速度是大于 1 的数, 所以滚动距离会越来越小
    var speed = 1 + acceleration;
    window.scrollTo(Math.floor(x / speed), Math.floor(y / speed));
    // 如果距离不为零, 继续调用迭代本函数
    if (x > 0 || y > 0) {
        var invokeFunction = "goTop(" + acceleration + ", " + time + ")";
        window.setTimeout(invokeFunction, time);
    }
}
/*
 * 回到顶部 按钮及事件初始化
 * */
function goTopInit() {
    if ($('.common-top').length <= 0) {
        $('body').prepend('<img class="common-top" src="images/btn_top_gray.png" onclick="goTop();">');
    }

    $(window).scroll(function () {
        var scrollHeight = $(window).scrollTop();
        if (scrollHeight >= 2000) {
            $('.common-top').show();
        } else {
            $('.common-top').hide();
        }
    });
}

//取消下载导航
function cancelDownLoad() {
    $(".common-download-app").hide();
}


function showDownload(p_funName) {
    if (!p_funName) {
        p_funName = 'downloadApp()';
    }
    if ($('.common-download-app').length <= 0) {
        var html = '<div class="common-download-app">' +
            '<img src="images/pic_youfan_download_down.png" alt="" style="width:100%;">' +
            '<div style="position:absolute;z-index:5;top:25.00%;left:75.20%;width:21.07%;height:50.00%;" onclick="' + p_funName + ';"></div>' +
            '<div style="position:absolute;z-index:5;top:10.00%;left:0.67%;width:8.00%;height:60.00%;"onclick="cancelDownLoad();"></div></div>';
        $('body').append(html);
    } else {
        $('.common-download-app').show();
    }

}

/*
 * ios onload 之后还没有读取到状态，故1.5秒之后再去判断
 * */
function showDownloadDelay() {
    if (!isWebView()) {
        showDownload();
    }
    setTimeout(function () {
        if (!MbWebAppSDK.isApp()) {
            showDownload();
        }
    }, 1500);
}
//app外时，显示的黑色下标
function showDownloadInfo2(p_tag, p_function) {
    if (!p_function) {
        p_function = "downloadApp()"
    }
    $(p_tag).html('');
    var html = '<img src="images/pic_youfan_download_down.png" alt="" style="width:100%;"/>';
    $(p_tag).append(html);

    //下载按钮
    var downBtnInfo = {
        img_widthPre: calcPercent(158.0, 750),
        img_heightPre: calcPercent(50.0, 100),
        left: calcPercent(564.0, 750),
        top: calcPercent(25.0, 100),
        onclick: p_function
    };
    LocateButtonPosition(downBtnInfo, p_tag);
    //取消按钮
    var calCanBtnInfo = {
        img_widthPre: calcPercent(60.0, 750),
        img_heightPre: calcPercent(60.0, 100),
        left: calcPercent(5.0, 750),
        top: calcPercent(10.0, 100),
        onclick: "canCalDownLoad();"
    };
    LocateButtonPosition(calCanBtnInfo, p_tag);
}
//取消下载导航
function canCalDownLoad() {
    $(".common-download-wap").hide();
}
function LocateButtonPosition(p_btnInfo, p_tag) {
    var temp = p_btnInfo;
    var html = '<div><div style="position:absolute;z-index:5;\
            top:' + temp.top + '%;left:' + temp.left + '%;\
            width:' + temp.img_widthPre + '%;height:' + temp.img_heightPre + '%;" \
            onclick="' + temp.onclick + '"></div></div>';

    $(p_tag).append(html);
}

function downLoadFormOther(p_name) {
    var downLink = 'http://7xpm5r.dl1.z0.glb.clouddn.com/youfan_' + p_name + '_v3.2.2.apk';
    window.location.href = downLink;
}


function getTitleSuffix() {
    return '－funwear.com有范官网|每日新品不断更新！';
}
function getImgDesSuffix() {
    return '-有范';
}

function goBack() {

    if (MbWebAppSDK.isApp()) {
        MbWebAppSDK.goBack();
    } else if (isWeixin()) {
        wx.closeWindow();
    } else {
            window.open("about:blank","_self").close()
    }
}
function jumpLast() {
    MbWebAppSDK.jumpLastLocal();
}
/*
 * 登陆
 * 通过注册登陆
 * p_object{
 * pageType:9 必须为9
 * url:登陆成功之后返回的url
 * }
 * */
function loginFromReg(p_object) {
    var url = WX_BASE_URL + 'f_code=login&info=';
    var infoStr = JSON.stringify(p_object);
    infoStr = encodeURIComponent(infoStr);
    window.location.href = url + infoStr;
}

/*
 * 用户登陆
 * 在微信中通过微信认证
 * 其他则通过注册登陆
 * p_object{
 * pageType:9 必须为9
 * url:登陆成功之后返回的url
 * }
 * */
function userAuthentication(p_object) {
    if (isWeixin()) {
        //微信中使用其他方式登录
        if (p_object.isLoginType === undefined) {
            wxLogin(p_object.url);
        } else {
            loginFromReg(p_object);
        }
    } else {

        loginFromReg(p_object);
    }
}

/*
 * p_business_Url 登陆成功之后返回的url
 * 获取用于信息，如果不存在，通过登陆获取
 * */

function getUserInfoByLogin(p_business_Url) {
    var userInfo = null;
    if (isWeixin()) {
        ReadUserIdAndTokenIdFromWX();
    }
    userInfo = getUserIdFromCookie(3);
    if (!userInfo) {
        userAuthentication({pageType: 9, url: p_business_Url});
        return null;
    }
    return userInfo;
}

function showTipBox(p_class, p_context, p_time) {
    var html = '<div class="common-tips"></div>';
    if ($('.common-tips').length <= 0) {
        $(p_class).append(html);
    }
    var obj = $(".common-tips");
    obj.show();
    obj.text(p_context);
    setTimeout(function () {
        $(obj).hide();
    }, p_time);

}
/*
 用途：检查输入字符串是否只由汉字、字母、数字组成
 输入：
 value：字符串
 返回：
 如果通过验证返回true,否则返回false
 */
function isChinaOrNumbOrLett(str) {//判断是否是汉字、字母、数字组成
    var re = /^[0-9a-zA-Z\u4e00-\u9fa5]+$/gi;
    return re.test(str);
}
//删除cookie中店铺信息（店铺编号，店铺ID）
function delStoreInfoInCookie() {
    return delCookie(COOKIE_STORE_INFO);
}
//店铺信息（店铺编号，店铺ID）存放到cookie中
//单位天
function setStoreInfoToCookie(p_value, p_day) {
    setCookie(COOKIE_STORE_INFO, p_value, p_day);
}
//从cookie读取店铺信息（店铺编号，店铺ID）
function getStoreInfoFromCookie() {
    var str = null;
    str = getCookie(COOKIE_STORE_INFO);
    if (str) {
        return JSON.parse(str);
    } else {
        return null;
    }
}
/**
 * 微信支付
 * 参数:
 * p_userId  认证成功跳转页面url
 * p_orderId 订单ID
 */
function WeiXinPay(p_userId, p_orderId) {
    if (!p_orderId || !p_userId) {
        alert("参数不能为空");
        return;
    }
    MbWebAppSDK.wechatpay({
        "userId": p_userId,
        "orderId": p_orderId,
        "sucessCallBack": function (data) {
            if (data.isSucess) {
                window.location.href = data.result;
            } else {
                alert(data.msg);
            }
        }
    });
}



