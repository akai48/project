var uiUtility = function () {
    function createAlertHtml() {
        if ($('.ui-alert').length <= 0) {
            $('body').append('<div class="ui-alert"></div>');
        }
        var html = ' <div class="ui-mark"></div> ' +
            '<div class="ui-modal ui-modal-one-btn ui-modal-in"> ' +
            '<div class="div1"> ' +
            '<p class="title"></p> ' +
            '<p class="info"></p> ' +
            '</div> ' +
            '<div class="div2"> ' +
            '<span class="ui-modal-btn first-btn"></span> ' +
            '</div>' +
            '</div>';
        var uiAlert = $('.ui-alert');
        uiAlert.html(html);
        //灰色背景底色
        setMarkBg(true);
    }

    function createConfirmHtml() {
        if ($('.ui-alert').length <= 0) {
            $('body').append('<div class="ui-alert"></div>');
        }
        var html = ' <div class="ui-mark"></div> ' +
            '<div class="ui-modal ui-modal-two-btn ui-modal-in">' +
            '<div class="div1">' +
            '<p class="title">！</p>' +
            '<p class="info"></p></div>' +
            '<div class="div2"> ' +
            '<span class="ui-modal-btn border-r left-btn"></span>' +
            '<span class="ui-modal-btn right-btn"></span>' +
            '</div></div>';
        var uiAlert = $('.ui-alert');
        uiAlert.html(html);
        //灰色背景底色
        setMarkBg(true);
    }

    function initModalBtn(p_btn, p_btnName, p_fun) {
        var modal = $('.ui-modal');
        p_btn.text(p_btnName);
        p_btn.on('click', function () {
            setMarkBg(false);
            modal.addClass('ui-modal-out');
            //有400毫秒过渡动画，之后再删除html
            setTimeout(function () {
                $('.ui-alert').html('')
            }, 400);
            p_btn.off();
            if (p_fun) {
                p_fun();
            }
        });
    }

    function setModalTitleAndInfo(p_info, p_title) {
        if (!p_info) {
            p_info = '';
        }
        var info = $('.ui-modal .info');
        info.html(p_info);
        if (!p_title) {
            p_title = p_info;
            info.hide();
        }
        $('.ui-modal .title').text(p_title);

    }

    /**
     *
     * @param p_tip  提示内容
     * @param p_time 持续时间
     * @returns {void|*|jQuery} 返回创建的对象(用于自己控制是否显示)
     */
    function loadingToast(p_tip, p_duration) {
        var tip_msg = p_tip || "数据加载中",
            duration_time = 3000,//默认显示时间 3s
            obj = null;
        var html = [];
        html.push('<div id="loadingToast" class="weui_loading_toast" style="display:none;">');
        html.push('<div class="weui_mask_transparent"></div>');
        html.push('<div class="weui_toast">');
        html.push('<div class="weui_loading">');
        html.push('<div class="weui_loading_leaf weui_loading_leaf_0"></div>');
        html.push('<div class="weui_loading_leaf weui_loading_leaf_1"></div>');
        html.push('<div class="weui_loading_leaf weui_loading_leaf_2"></div>');
        html.push('<div class="weui_loading_leaf weui_loading_leaf_3"></div>');
        html.push('<div class="weui_loading_leaf weui_loading_leaf_4"></div>');
        html.push('<div class="weui_loading_leaf weui_loading_leaf_5"></div>');
        html.push('<div class="weui_loading_leaf weui_loading_leaf_6"></div>');
        html.push('<div class="weui_loading_leaf weui_loading_leaf_7"></div>');
        html.push('<div class="weui_loading_leaf weui_loading_leaf_8"></div>');
        html.push('<div class="weui_loading_leaf weui_loading_leaf_9"></div>');
        html.push('<div class="weui_loading_leaf weui_loading_leaf_10"></div>');
        html.push('<div class="weui_loading_leaf weui_loading_leaf_11"></div>');
        html.push('</div>');
        html.push('<p class="weui_toast_content">' + tip_msg + '</p>');
        html.push('</div>');
        html.push('</div>');
        if ($('#loadingToast').length <= 0) {
            $('body').append(html.join(''));
        }
        if (typeof(p_duration) == "undefined") {
            setTimeout(function () {
                $('#loadingToast').hide();
            }, duration_time);
            return;
        } else if (typeof(p_duration) == "number") {
            setTimeout(function () {
                $('#loadingToast').hide();
            }, p_duration);
            return;
        } else if (p_duration == "infinite") {//显示时间为无限（用于自己控制是否显示）
            obj = $('#loadingToast').show();
        }
        return obj;
    }

    /*
     * p_show true 显示灰色背景  false 关闭灰色背景
     * */
    function setMarkBg(p_show) {
        if (p_show) {
            $('.ui-mark').addClass('ui-mark-visible');
        } else {
            $('.ui-mark').addClass('ui-mark-hide');
        }
    }

    return {
        /*
         * 单个按钮
         * p_info 信息
         * p_title 标题（可选）
         * p_fun 点击函数（可选）
         * p_btnName 按钮名称（可选）
         * */
        alert: function (p_info, p_title, p_fun, p_btnName) {
            if(typeof p_title === 'function'){
                p_btnName = arguments[2];
                p_fun = arguments[1];
                p_title = undefined;
            }
            createAlertHtml();
            setModalTitleAndInfo(p_info, p_title);
            if (!p_btnName) {
                p_btnName = '确认';
            }
            initModalBtn($('.ui-modal .first-btn'), p_btnName, p_fun);
            $('.ui-modal').show();

        },
        /*
         * 两个按钮
         * p_info 信息
         * p_title 标题（可选）
         * p_leftFun 左边点击函数（可选）
         * p_rightFun 左边点击函数（可选）
         * p_leftBtnName 左边按钮名称（可选）
         * p_rightBtnName 右边按钮名称（可选）
         * */
        confirm: function (p_info, p_title, p_leftFun, p_rightFun, p_leftBtnName, p_rightBtnName) {
            if(typeof p_title === 'function'){
                p_rightBtnName = arguments[4];
                p_leftBtnName = arguments[3];
                p_rightFun = arguments[2];
                p_leftFun = arguments[1];
                p_title = undefined;
            }
            createConfirmHtml();
            setModalTitleAndInfo(p_info, p_title);
            if (!p_rightBtnName) {
                p_rightBtnName = '确认';
            }
            if (!p_leftBtnName) {
                p_leftBtnName = '取消';
            }
            initModalBtn($('.ui-modal .left-btn'), p_leftBtnName, p_leftFun);
            initModalBtn($('.ui-modal .right-btn'), p_rightBtnName, p_rightFun);
            $('.ui-modal').show();

        },
        /*
         * 提示分享按钮
         * */
        promptShare: function () {
            if ($('.ui-prompt-share').length <= 0) {
                $('body').append('<div class="ui-prompt-share"></div>');
            }

            var uiPromptShare = $('.ui-prompt-share');
            var html = '<div class="modal-overlay">' +
                '<img src="' + CDN_BASE_URL + 'share-guide-20151120.png" class="prompt-share"></div>';
            if (uiPromptShare.html().trim().length <= 0) {
                uiPromptShare.append(html);
            }
            $('.modal-overlay').addClass('modal-overlay-visible');
            uiPromptShare.on('click', function () {
                $('.modal-overlay').removeClass('modal-overlay-visible');
                uiPromptShare.off();
            });
        },
        /**
         *微信中加载提示
         * @param p_tip  提示内容
         * @param p_time 持续时间
         * @returns {void|*|jQuery} 返回创建的对象(用于自己控制是否显示)
         */
        loadingToast: function (p_tip, p_duration) {
            return loadingToast(p_tip, p_duration);
        }

    };
};

var UIwx = new uiUtility();
