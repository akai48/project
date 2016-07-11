(function () {
    var query = $.parseUrlQuery(window.location.href.split("#")[0]);
    //uiUtility 是一个控件类
    var UI = uiUtility();

    //通过vue.js双向绑定数据
    var demo;
    demo = new Vue({
        el: '#template-div',
        data: {

        },
        methods: {

        }
    });
    //窗口加载初始化
    window.onload = function () {
        /*懒加载 lazy为图片的css类*/
        lazyPicLoad('.lazy');
        //微信分享 获取配置
        loadWechatConfig();
        //微信二次分享配置
        var shareHeadImg = SHARE_IMG_ICON;
        setWechatAPI({
            "imgUrl": shareHeadImg,
            "link": BASE_URL + 'template.html?',
            "desc": PAGE_DESC,
            "title": PAGE_TITLE
        });
    };
    //选择器绑定事件
    function bindLabelEventInit(){

    }
    //处理数据
    function dealData(p_data){
        console.log(p_data);
    }

    function createHtml(){
        var html = '{{text}}';
        var rend = ArtTemplate.compile(html);
        var html2 = rend({text:'哈哈哈'});
        console.log(html2);
        $('.text-go').html(html2);
    }
    //获取数据
    function getData(){
        var actionParam = {};
        actionParam.order = "price";
        actionParam.order_type = "desc";
        actionParam.cid = '1';
        // ServiceApi.getProductNewList(actionParam,
        //     function (p_data) {
        //         dealData(p_data);
        //     });
    }
    //js入口执行函数
    function onEnter(){
        bindLabelEventInit();
        getData();
        createHtml();
    }

    onEnter();
    //显示vue的DIV
    showMain();

})();

