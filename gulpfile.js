'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'del']
});

var assets = {
    sass: './sass/**/*.sass',
    mainSass: './sass/style.sass'
  };

var dist = {
    css: './css/',
  };

var reportError = function(err) {
    if (typeof err.fileName !== 'undefined') {
      return '\n' + err.fileName + ': line ' + err.lineNumber + ', ' + err.message;
    } else {
      return err;
    }
  };

function styles() {
  var origin = assets.mainSass;
  var destination = dist.css;

  var c = gulp.src(origin)
    .pipe($.compass({
          css: './css',
          sass: './sass',
          image: './images'
        })
        .on('error', $.notify.onError(function(err) {
            c.end();
            return reportError(err);
          })
    ))
    .pipe($.autoprefixer({browsers: ['last 4 versions'], cascade: false }))
    .pipe($.csso())
    .pipe(gulp.dest(destination))
    .pipe($.notify({ message: 'Styles task from ' + origin + ' complete' }));

  return c;
}

gulp.task('styles', function() {
  return styles();
});

// Clean up static folder
gulp.task('clean', function (done) {
  $.del(dist.css + 'style.css', done);
});

gulp.task('watch', function() {
  gulp.watch(assets.sass, ['styles']);
});

// Default Task
gulp.task('default', ['clean'], function () {
    gulp.start('styles');
    gulp.watch(assets.sass, ['styles']);
});
