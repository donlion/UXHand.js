var gulp = require("gulp"),
    // jshint = require("gulp-jshint"),
    uglify = require("gulp-uglify"),
    concat = require("gulp-concat"),
    clean = require('gulp-clean'),
    cache = require('gulp-cache'),
    include = require('gulp-include'),
    merge = require('merge-stream'),
    prettify = require('gulp-jsbeautifier'),
    rename = require('gulp-rename');

var buildDir = "../build",
    srcDir = "js/*.js",
    watchDir = "js/**/*.js";

gulp.task("clean", function () {
    cache.clearAll();
    return gulp.src(buildDir)
      .pipe(clean({force:true}));
});
gulp.task("build", ["clean"], function () {
    var _merge = new merge();
    _merge.add(gulp.src(srcDir)
        .pipe(include())
        .pipe(gulp.dest(buildDir)));
    return _merge;
   //return gulp.src(srcDir)
      // .pipe(include())
      // .pipe(uglify())
      // .pipe(gulp.dest(buildDir));
});
gulp.task("build:min", function() {
  var _merge = new merge();
  _merge.add(gulp.src(srcDir)
    .pipe(include())
    .pipe(uglify({
      compress: {
        pure_funcs: ["console.log", "console.info", "console.error"],
        dead_code: false,
        unused: false,
        join_vars: false
      },
      mangle: false
    }))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(buildDir)));
  return _merge;
});

gulp.task('watch', ['clean', 'build'], function () {
    gulp.watch(watchDir, ['build']);
});
