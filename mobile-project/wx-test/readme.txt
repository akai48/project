1.压缩代码
 a.首先安装fis3
 b.html代码中将js中common config lib 的js文件放在注释
    <!--压缩-b-->
    <!--压缩-e-->
    （压缩脚本会根据这个注释，更改script 脚本导入）
    如果你js框架使用jquery 则在其下面添加注释
    <!--jquery.js-->
    如果你js框架使用zepto 则在其下面添加注释
     <!--zepto.js-->
模版见template.html
例子见example.html

2. 在mbfun_web下打开shell脚本
site_wx_mult.sh编译为生成环境
site_wx_mult_test.sh编译为测试环境
site_wx_mult_dp.sh编译为开发环境

3生成代码在mbfun_web同一级目录下的mbfun_web_release/wx-mult