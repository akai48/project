var COOKIE_PREFIX = 'YOUFAN_'; //cookie的工程前缀，避免不同项目的cookie重复
var COOKIE_USER_INFO = COOKIE_PREFIX + 'COOKIE_USER_INFO';
var COOKIE_USER_ID = COOKIE_PREFIX + 'COOKIE_USER_ID'; //用户ID
var COOKIE_PAY_SUCCESS_BACK = COOKIE_PREFIX + 'COOKIE_PAY_SUCCESS_BACK'; //用户ID
var COOKIE_STORE_INFO = COOKIE_PREFIX + 'COOKIE_STORE_INFO'; //店铺信息(手机号码，店铺名称)
var COOKIE_QINNIU_TOKEN = COOKIE_PREFIX + 'COOKIE_QINNIU_TOKEN';

var APP_DOWNLOAD = "http://a.app.qq.com/o/simple.jsp?pkgname=com.metersbonwe.www";

//内容类型
var GlobalModel = {};
//资讯内容
//文本
GlobalModel.CONTENT_TEXT= 0;
//搭配
GlobalModel.CONTENT_COLLOCATION= 1;
//单品
GlobalModel.CONTENT_ITEM= 2;
//品牌
GlobalModel.CONTENT_BRAND= 3;
//图片
GlobalModel.CONTENT_PIC = 4;
//食品
GlobalModel.CONTENT_VIDEO = 5;
//活动
GlobalModel.CONTENT_ACTIVITY = 6;
//领取饭票
GlobalModel.CONTENT_FP_BATCH = 7;
//图片热区点击
GlobalModel.CONTENT_PIC_HOTSPOT = 8;
//单品列表（铺款）
GlobalModel.CONTENT_ITEM_LIST = 9;
//倒计时
GlobalModel.CONTENT_COUNT_DOWN = 10;
//资讯
GlobalModel.CONTENT_SPECIAL_TOPIC = 11;
//抽奖结果
GlobalModel.CONTENT_SPECIAL_LOTTERY_RESULT = 12;
//抽奖动画
GlobalModel.CONTENT_SPECIAL_LOTTERY_GIF = 13;
//中奖名单
GlobalModel.CONTENT_SPECIAL_LOTTERY_LIST = 14;
//活动id －倒计时
GlobalModel.CONTENT_SPECIAL_ACTIVITY_ID_COUNTDOWN = 15;
//活动条件 图片
GlobalModel.CONTENT_SPECIAL_ACTIVITY_PIC = 16;
//商品上的促销logo图片
GlobalModel.CONTENT_SPECIAL_SALE_LOGO = 17;
//铺款时 商品类型的热区的刷新
GlobalModel.CONTENT_SPECIAL_ITEM_TYPE_HOTSPOT = 18;
//导航栏
GlobalModel.CONTENT_SPECIAL_NAVIGATOR_HOTSPOT = 19;
//导航栏缩小图片
GlobalModel.CONTENT_SPECIAL_NAVIGATOR_SMALL = 20;
//搭配购铺款
GlobalModel.CONTENT_CO_ITEM_LIST = 21;
//搭配购批量买
GlobalModel.CONTENT_CO_BATCH_BUY = 22;
//标题ICON头图
GlobalModel.CONTENT_TITLE_ICON = 23;
//空白条
GlobalModel.CONTENT_WHITE_EMPTY = 24;
//副标题模块
GlobalModel.CONTENT_SEC_TITLE = 25;
//小字说明模块1
GlobalModel.CONTENT_SMALL_DEC_A = 26;
//小字说明模块2
GlobalModel.CONTENT_SMALL_DEC_B = 27;
//正文模块
GlobalModel.CONTENT_WORD = 28;
//数字分割模块
GlobalModel.CONTENT_NUM_DIV = 29;
//灰色条
GlobalModel.CONTENT_GREY_EMPTY = 30;
//正文模块2
GlobalModel.CONTENT_WORD2 = 31;
//跑马灯图片
GlobalModel.CONTENT_SWIPER_IMAGE = 32;
//搜索按钮
GlobalModel.CONTENT_SEARCH_THINK = 33;
//更多资讯
GlobalModel.CONTENT_MORE_SPECIAL = 34;

//h5跳转原生 类型
//单品
GlobalModel.JUMP_TYPE_ITEM = 1;
//搭配
GlobalModel.JUMP_TYPE_COLLOCATION = 2;
//品牌
GlobalModel.JUMP_TYPE_BRAND = 3;
//话题
GlobalModel.JUMP_TYPE_TOPIC = 4;
//设计师
GlobalModel.JUMP_TYPE_DESIGNER = 5;
//资讯
GlobalModel.JUMP_TYPE_SPECIAL = 6;
//活动
GlobalModel.JUMP_TYPE_ACTIVITY = 7;
//品牌列表
GlobalModel.JUMP_TYPE_BRAND_LIST = 8;
//话题列表
GlobalModel.JUMP_TYPE_TOPIC_LIST = 9;
//资讯列表
GlobalModel.JUMP_TYPE_SPECIAL_LIST = 10;
//单品列表
GlobalModel.JUMP_TYPE_ITEM_LIST = 12;
//活动列表
GlobalModel.JUMP_TYPE_ACTIVITY_LIST = 13;
//最佳搭配
GlobalModel.JUMP_TYPE_BEST_COLLOCATION = 14;
//明星店铺
GlobalModel.JUMP_TYPE_STAR_SHOP = 15;
//推荐品牌
GlobalModel.JUMP_TYPE_RECOMMEND_BRAND = 16;
//消息列表
GlobalModel.JUMP_TYPE_MESSAGE_LIST = 17;
//通知列表
GlobalModel.JUMP_TYPE_NOTIFICATION_LIST = 18;
//领取饭票页
GlobalModel.JUMP_TYPE_FANPIAO_GET = 19;
//话题新tab列表
GlobalModel.JUMP_TYPE_TOPIC_TAB_LIST = 20;
//购物袋
GlobalModel.JUMP_TYPE_CART = 21;
//我的钱包
GlobalModel.JUMP_TYPE_MY_WALLET = 22;
//我的饭票
GlobalModel.JUMP_TYPE_MY_FANPIAO = 23;
//我的收藏
GlobalModel.JUMP_TYPE_MY_COLLECTION = 24;
//扫一扫
GlobalModel.JUMP_TYPE_SCAN = 25;
//系统设置
GlobalModel.JUMP_TYPE_SYSTEM_SETTING = 26;
//订单列表
GlobalModel.JUMP_TYPE_ORDER_LIST = 27;
//搜索
GlobalModel.JUMP_TYPE_SEARCH = 28;
//联系我们
GlobalModel.JUMP_TYPE_CONTACT_US = 29;
//发现
GlobalModel.JUMP_TYPE_DISCOVERY = 30;
//我参与的话题
GlobalModel.JUMP_TYPE_JOIN_TOPIC = 31;
//每日新品
GlobalModel.JUMP_TYPE_EVERYDAY_NEW_ITEM = 32;
//单品参数选择
GlobalModel.JUMP_TYPE_SELECT_ITEM = 37;
//登陆界面
GlobalModel.JUMP_TYPE_GO_LOGIN = 39;
//搭配购
GlobalModel.JUMP_TYPE_CO_BUY = 42;
//编辑个人信息
GlobalModel.JUMP_TYPE_EDIT_PERSONAL_INFO = 43;
//搜索单品
GlobalModel.JUMP_TYPE_SEARCH_ITEM = 44;
//咨询中抽奖
GlobalModel.LOTTERY_TYPE_1 = 11;
//咨询中抽奖新
GlobalModel.LOTTERY_TYPE_2 = 12;

//普通关键字搜索单品
GlobalModel.JUMP_TYPE_SEARCH_ITEM = 111;
//普通关键字搜索品牌
GlobalModel.JUMP_TYPE_SEARCH_BRAND = 112;
//普通关键字搜索资讯
GlobalModel.JUMP_TYPE_SEARCH_SEPCIAL = 113;

//灵感关注
GlobalModel.JUMP_TYPE_SPECIAL_ATTENTION = 115;
//灵感范儿
GlobalModel.JUMP_TYPE_SPECIAL_FUNWEAR = 116;
//搜索单品结果页 json字符串
GlobalModel.JUMP_TYPE_SEARCH_ITEM_JSON_RESULT = 117;
//搜索品牌结果页 json字符串
GlobalModel.JUMP_TYPE_SEARCH_BRAND_JSON_RESULT = 118;
//搜索资讯结果页 json字符串
GlobalModel.JUMP_TYPE_SEARCH_SPECIAL_JSON_RESULT = 119;
//搜索单品联想页 json字符串
GlobalModel.JUMP_TYPE_SEARCH_ITEM_JSON_THINK = 120;
//搜索品牌联想页 json字符串
GlobalModel.JUMP_TYPE_SEARCH_BRAND_JSON_THINK = 121;
//搜索资讯联想页 json字符串
GlobalModel.JUMP_TYPE_SEARCH_SPECIAL_JSON_THINK = 122;


//用于领取饭票，投票，抽奖等活动热区
//领取饭票
GlobalModel.JUMP_TYPE_GET_FP = 2000;
//抽奖
GlobalModel.JUMP_TYPE_LOTTERY = 2001;
//单品列表
GlobalModel.JUMP_TYPE_ITEM_LIST_INDEX = 2002;
//导航栏
GlobalModel.JUMP_TYPE_NAVIGATOR = 2003;
//导航栏收缩
GlobalModel.JUMP_TYPE_NAVIGATOR_SHRINK = 2004;
//资讯url
GlobalModel.JUMP_TYPE_SPECIAL_URL = 2005;
//弹出规则说明图片
GlobalModel.JUMP_TYPE_RULE_PIC_URL = 2006;
//热区跳搜索
GlobalModel.JUMP_TYPE_PIC_SEARCH = 2007;

//详情页 跳转的url
GlobalModel.SPECIAL_BASE_URL = WX_BASE_URL + 'p=';
GlobalModel.SPECIAL_WX_SP_BASE_URL = BASE_URL + 'special-insp.html?p=';
GlobalModel.ITEM_BASE_URL = WX_BASE_URL + 'f_code=item_detail&productID=';
GlobalModel.BRAND_BASE_URL = WX_BASE_URL + 'f_code=brand_detail&brandCode=';
GlobalModel.CO_BASE_URL = WX_BASE_URL + 'f_code=co_detail&collocalID=';
//资讯列表
GlobalModel.SP_LIST_BASE_URL = BASE_URL + 'special-list.html?labelId=';

GlobalModel.isShareMode = false;

GlobalModel.CO_SCORE_HTML = 0;
GlobalModel.isLyf = false;


