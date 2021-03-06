require('babel-register'); // Pass require()s through babel (for running jasmine)

var gulp = require('gulp');
var gutil = require('gulp-util');
var jasmine = require('gulp-jasmine');
var clean = require('gulp-clean');
var rename = require('gulp-rename');

var webpack = require('webpack');
var webpackProdConfig = require('./webpack.config.js');
var webpackDevConfig = require('./webpack.dev.config.js');

var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

var fs = require('fs');
var version = JSON.parse(fs.readFileSync('./package.json')).version;

gulp.task('webpack:build', ['clean:js'], function(callback) {
  webpack(webpackProdConfig, function(err, stats) {
    if (err) {
      throw new gutil.PluginError('webpack:build', err);
    }

    gutil.log('[webpack:build]', stats.toString({ colors: true }));

    callback();
  });
});

gulp.task('webpack:build-dev', ['clean:js'], function(callback) {
  webpack(webpackDevConfig, function(err, stats) {
    if (err) {
      throw new gutil.PluginError('webpack:build-dev', err);
    }

    gutil.log('[webpack:build-dev]', stats.toString({ colors: true }));

    callback();
  });
});

gulp.task('jasmine', function() {
  gulp.src('./src/**/*.spec.js')
    .pipe(jasmine({verbose: true}));
});

function renameFunc(path) {
  path.basename += '-' + version;
}

gulp.task('sass:build', ['clean:css'], function() {
  return gulp.src('./src/styles/**/*.scss')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(rename(renameFunc))
    .pipe(gulp.dest('./dist/css/'));
});

gulp.task('sass:build-dev', ['clean:css'], function() {
  return gulp.src('./src/styles/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(rename(renameFunc))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist/css/'));
});

gulp.task('copy:images', ['clean:images'], function() {
  return gulp.src('./src/images/**/*')
    .pipe(gulp.dest('./dist/images/'));
});

gulp.task('copy:fonts', ['clean:fonts'], function() {
  return gulp.src('./src/fonts/**/*')
    .pipe(gulp.dest('./dist/fonts/'));
});

gulp.task('clean:js', function() {
  return gulp.src('./dist/js/', {read: false})
    .pipe(clean());
});

gulp.task('clean:css', function() {
  return gulp.src('./dist/css/', {read: false})
    .pipe(clean());
});

gulp.task('clean:images', function() {
  return gulp.src('./dist/images/', {read: false})
    .pipe(clean());
});

gulp.task('clean:fonts', function() {
  return gulp.src('./dist/fonts/', {read: false})
    .pipe(clean());
});

gulp.task('build', ['webpack:build', 'sass:build', 'copy:images', 'copy:fonts']);

gulp.task('build-dev', ['webpack:build-dev', 'sass:build-dev', 'copy:images', 'copy:fonts']);

gulp.task('default', ['build-dev'], function() {
  gulp.watch(['./src/js/**/*'],     ['webpack:build-dev']);
  gulp.watch(['./src/styles/**/*'], ['sass:build-dev']);
  gulp.watch(['./src/images/**/*'], ['copy:images']);
  gulp.watch(['./src/fonts/**/*'],  ['copy:fonts']);
});
