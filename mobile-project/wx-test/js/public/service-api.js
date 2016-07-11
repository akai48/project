var ServiceApi = function () {
};
/*
 *   抽奖和发奖
 * 参数:
 * token
 * aid 活动id
 * isRand 0发放 1抽奖
 * 返回值
 * code=-100 message:当前活动已关闭
 * code=-101 message:当前活动已过期
 * code=-102 message:当前活动未开始
 * code＝－2 message:您已参与过！reward_id 奖品id
 * code=-1 message:活动奖励整理中，请稍后重试！
 * code=1 reward_id:奖品信息
 * */
ServiceApi.receiveOperateReward = function (p_actionParam, p_fun) {
    if (!p_actionParam) {
        alert("参数不能为空");
        return;
    }
    p_actionParam.m = "Operate";
    p_actionParam.a = "receiveOperateReward";
    actionCallForNew(
        p_actionParam,
        function (data) {
            if (p_fun) {
                p_fun(data);
            }
        });
};

/*
 *   获得活动信息
 * 参数:
 * token 可以不传
 * aid 活动id
 * isRand 0发放 1抽奖
 *
 * 返回值
 * code=-100 message:当前活动已关闭
 * code=-101 message:当前活动已过期
 * code=-102 message:当前活动未开始
 * code＝－2 message:您已参与过！reward_id 奖品id
 * code=1 活动正常
 * */
ServiceApi.getReceiveOperateInfo = function (p_actionParam, p_fun) {
    if (!p_actionParam) {
        alert("参数不能为空");
        return;
    }
    p_actionParam.m = "Operate";
    p_actionParam.a = "getReceiveOperateInfo";
    actionCallForNew(
        p_actionParam,
        function (data) {
            if (p_fun) {
                p_fun(data);
            }
        });
};

/*
 *领取饭票
 *  userId 用户id
 *  batchCode 批次code
 * */
ServiceApi.getCouponForSpecialV2 = function (p_actionParam, p_fun) {
    if (!p_actionParam) {
        alert("参数不能为空");
        return;
    }
    p_actionParam.m = "Activity";
    p_actionParam.a = "getCouponForSpecialV2";
    actionCallForNew(
        p_actionParam,
        function (data) {
            if (p_fun) {
                p_fun(data);
            }
        });
};

/*
 *校验会员是否升级
 *  orderNo 订单号
 * */
ServiceApi.getOrderResult = function (p_actionParam, p_fun) {
    if (!p_actionParam) {
        alert("参数不能为空");
        return;
    }
    p_actionParam.m = "Member";
    p_actionParam.a = "getOrderResult";
    actionCallForNew(
        p_actionParam,
        function (data) {
            if (p_fun) {
                p_fun(data);
            }
        });
};
/*
 * 客服中心数据
 * */

ServiceApi.getOnlineCate = function (p_actionParam, p_fun, p_closeLoading) {
    if (!p_actionParam) {
        UIwx.alert("参数不能为空");
        return;
    }
    p_actionParam.m = "Help";
    p_actionParam.a = "getOnlineCate";
    actionCallForNew(
        p_actionParam,
        function (data) {
            if (p_fun) {
                p_fun(data);
            }
        }, null, null, p_closeLoading);
};
/*
 * 获取在线客户问题列表
 * type=1
 * pageSize=10
 * pageIndex=1
 * */
ServiceApi.getOnlineListByType = function (p_actionParam, p_fun, p_closeLoading) {

    if (!p_actionParam) {
        UIwx.alert("参数不能为空");
        return;
    }
    p_actionParam.m = "Help";
    p_actionParam.a = "getOnlineListByType";
    actionCallForNew(
        p_actionParam,
        function (data) {
            if (p_fun) {
                p_fun(data);
            }
        }, null, null, p_closeLoading);
};
/*
 * 获取帮助文档列表
 * type=1
 * pageSize=10
 * pageIndex=1
 * */
ServiceApi.getHelpCenterList = function (p_actionParam, p_fun, p_closeLoading) {

    if (!p_actionParam) {
        UIwx.alert("参数不能为空");
        return;
    }
    p_actionParam.m = "Help";
    p_actionParam.a = "getHelpCenterList";
    actionCallForNew(
        p_actionParam,
        function (data) {
            if (p_fun) {
                p_fun(data);
            }
        }, null, null, p_closeLoading);
};
/*
 * 获取帮助文档当个详情
 * id
 * */
ServiceApi.getHelpCenterById = function (p_actionParam, p_fun, p_closeLoading) {

    if (!p_actionParam) {
        UIwx.alert("参数不能为空");
        return;
    }
    p_actionParam.m = "Help";
    p_actionParam.a = "getHelpCenterById";
    actionCallForNew(
        p_actionParam,
        function (data) {
            if (p_fun) {
                p_fun(data);
            }
        }, null, null, p_closeLoading);
};

/**
 * 读取满赠兑换码
 * 参数:
 * orderNo: 订单号
 * userId:  用户ID
 */
ServiceApi.getGiftTipsByOrder = function (p_actionParam, p_fun, p_closeLoading) {
    if (!p_actionParam) {
        alert("参数不能为空");
        return;
    }
    p_actionParam.m = "Order";
    p_actionParam.a = "getGiftTipsByOrder";
    actionCallForNew(
        p_actionParam,
        function (data) {
            if (p_fun) {
                p_fun(data);
            }
        }, null, null, p_closeLoading);
};
/**
 * 获取问答数据
 * userId:用户id
 * quziId：活动id
 * answer：答题结果
 */
ServiceApi.getQuestionInfos = function (p_actionParam, p_fun, p_closeLoading) {
    if (!p_actionParam) {
        alert("参数不能为空");
        return;
    }
    p_actionParam.m = "Activity";
    p_actionParam.a = "getQuziActivity";
    actionCallForNew(
        p_actionParam,
        function (data) {
            if (p_fun) {
                p_fun(data);
            }
        }, null, null, p_closeLoading);

};
/**
 *提交问答
 *userId:用户id
 * answer:{"1":"1","2":"1","3":"3"}
 * quziId:活动id
 */
ServiceApi.submitAnswer = function (p_actionParam, p_fun, p_closeLoading) {
    if (!p_actionParam) {
        alert("参数不能为空");
        return;
    }
    p_actionParam.m = "Activity";
    p_actionParam.a = "confirmQuziActivity";
    actionCallForNew(
        p_actionParam,
        function (data) {
            if (p_fun) {
                p_fun(data);
            }
        }, null, null, p_closeLoading);

};


/**
 * 获得问卷系统 题目
 * @param p_actionParam
 * {
 *  userId
 *  id 题目id（默认不传）
 * }
 * @param p_fun
 */
ServiceApi.getQuestionNaire = function (p_actionParam, p_fun, p_onFail, p_closeLoading) {
    if (!p_actionParam) {
        alert("参数不能为空");
        return;
    }
    p_actionParam.m = "Activity";
    p_actionParam.a = "getQuestionNaire";
    actionCallForNew(
        p_actionParam,
        function (data) {
            if (p_fun) {
                p_fun(data);
            }
        }, p_onFail, null, p_closeLoading);
};

/**
 * 问卷系统答题
 * @param p_actionParam
 * {
 *  userId
 *  nid 问卷ID
 *  answer 答案
 * }
 * @param p_fun
 */
ServiceApi.recordUserNaire = function (p_actionParam, p_fun, p_onFail, p_closeLoading) {
    if (!p_actionParam) {
        alert("参数不能为空");
        return;
    }
    p_actionParam.m = "Activity";
    p_actionParam.a = "recordUserNaire";
    actionCallForNew(
        p_actionParam,
        function (data) {
            if (p_fun) {
                p_fun(data);
            }
        }, p_onFail, null, p_closeLoading);
};