fis.match('*', {
  useHash: false
});

fis.match('*.js', {
  optimizer: fis.plugin('uglify-js'),
  useHash: true,
  url:'.$0'
});
fis.match('*.css', {
  optimizer: fis.plugin('clean-css'),
  useHash: true,
  url : '.$0' // 确认发布时候，可以临时调整为相对路径。
});

fis.match('*.png', {
  optimizer: fis.plugin('png-compressor')
});

fis.match('/images/*.*', {
  url : '../..$0' // 确认发布时候，可以临时调整为相对路径。
});