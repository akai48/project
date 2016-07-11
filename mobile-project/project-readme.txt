share-css 
几个模块共用的样式 轻易不要修改和添加。
修改时，要注意是否会影响到其他地方的调用
添加时检查其他文件有没有已经用到该命名，以免被覆盖

share-js  
几个模块共用的函数接口
修改时，要注意是否会影响到其他地方的调用
添加时检查其他文件有没有已经用到该命名，以免被覆盖
/lib 第三方库
/common/common.js 通用函数
/common/fastclick.js 解决移动端的点击延迟
/common/global.js 全局函数
/common/ui-utility.js 共用的ui（弹窗，提示分享等）
/common/web-app-sdk.js 与原生app之间的交互函数


具体模块下的文件说明
css/content/ 每一个页面对应的css
css/public/ 属于该模块共用的css
images  该模块的图片
js/config 该模块配置文件
js/content 每一个页面对应的js
js/other 共用于该模块的第三方库
js/public 共用于该模块的js函数