var cfenv = require('cfenv');
var appEnv = cfenv.getAppEnv();

var gulp = require('gulp');
var gulpNgConfig = require('gulp-ng-config');

gulp.task('config', function () {
  gulp.src('config.json')
  .pipe(gulpNgConfig('watsonUi.config', {
    constants: {
      baseUrl: appEnv.url
    }
  }))
  .pipe(gulp.dest('public/js'))
});
