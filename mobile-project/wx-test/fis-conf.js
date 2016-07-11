fis.match('::packager', {
  spriter: fis.plugin('csssprites')
});

fis.match('*', {
  useHash: false
});

fis.set('project.ignore', ['node_modules/**', 'output/**', 'fis-conf.js','release-tool/**','readme.txt']);
//zepto压缩
fis.match('/js/lib/zepto-app/*.js', {
  packTo: '/js/app/zepto-app.js'
});
fis.match('/js/lib/zepto-app/zepto.min.js', {
  packOrder: -110
});
fis.match('/js/lib/zepto-app/zepto.picLazyLoad.min.js', {
  packOrder: -109
});
fis.match('/js/lib/zepto-app/vue.min.js', {
  packOrder: -108
});

fis.match('/js/lib/zepto-app/config.js', {
  packOrder: -100
});
fis.match('/js/lib/zepto-app/global.js', {
  packOrder: -99
});
fis.match('/js/lib/zepto-app/common.js', {
  packOrder: -98
});

fis.match('/js/lib/jquery-app/*.js', {
  packTo: '/js/app/jquery-app.js'
});
//jquery压缩
fis.match('/js/lib/jquery-app/jquery-1.8.3.min.js', {
  packOrder: -110
});
fis.match('/js/lib/jquery-app/jquery.lazyload.min.js', {
  packOrder: -109
});
fis.match('/js/lib/jquery-app/vue.min.js', {
  packOrder: -107
});
fis.match('/js/lib/jquery-app/config.js', {
  packOrder: -100
});
fis.match('/js/lib/jquery-app/global.js', {
  packOrder: -99
});
fis.match('/js/lib/jquery-app/common.js', {
  packOrder: -98
});

fis.match('/css/temp/*.css', {
  packTo: '/css/common/common.css'
});

fis.match('**.less', {
    parser: fis.plugin('less'), // invoke `fis-parser-less`,
    rExt: '.css'
});


