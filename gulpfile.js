var gulp        = require('gulp');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;
var cp          = require('child_process');
var harp        = require('harp');

gulp.task('serve', function () {
  harp.server(__dirname, {
    port: 9000
  }, function () {
    browserSync({
      proxy: "localhost:9000",
      open: true,
      notify:false
    });

    gulp.watch("public/**/*.{jade,styl,haml,sass,scss,less}", function() {
        reload();
    });
  })
});

gulp.task('compile', function (done) {
    cp.exec('harp compile . pontchabandelmas/public', {stdio: 'inherit'})
        .on('close', done)
});

gulp.task('build', ['compile'], function(){
    gulp.src('app.yaml')
        .pipe(gulp.dest('pontchabandelmas'));
});

gulp.task('default', ['serve']);
