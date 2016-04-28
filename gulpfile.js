var path = require('path');
var del = require('del');
var gulp = require('gulp');
var webpackStream = require('webpack-stream');
var $ = require('gulp-load-plugins')();
var runSequence = require('run-sequence');

// set variable via: gulp --type=production
var environment = $.util.env.type || 'development';
var isProduction = environment === 'production' || environment === 'prod';
var webpackConfig = require('./webpack.config.js').getConfig(environment);

var root = './';
var dev = root + 'app/';
var dist = root + 'public/';

var folders = {
  //         dev   |   dist
  stylus:  ['styl', 'styles'],
  scripts: ['js', 'scripts'],
  images:  ['img', 'images'],
  fonts:   ['fonts', 'fonts'],
  vendor:  ['vendor', 'vendor'],
  html:    ['', ''],
  directiveTemplates:  ['js/directives', 'directives'],
  viewTemplates:  ['js/views', 'views']
}

var autoprefixerBrowsers = [
  'ie >= 9',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 6',
  'opera >= 23',
  'ios >= 6',
  'android >= 4.4',
  'bb >= 10'
];

var i;
var scriptFiles = {
  webpackEntry: [dev + 'scripts/app.js'],
  webpackAll: [dev + folders.scripts[0] + 'scripts/**/*.js']
};

gulp.task('styl', function (cb) {
  return gulp.src(dev + folders.stylus[0] + '/main.styl')
    .pipe(!isProduction ? $.plumber() : $.util.noop())
    .pipe($.stylus({
      compress: isProduction,
      'include css': true
    }))
    .pipe($.autoprefixer({ browsers: autoprefixerBrowsers }))
    .pipe(gulp.dest(dist + folders.stylus[1] + '/'))
    .pipe($.size({ title: 'styles' }));
});

gulp.task('images', function (cb) {
  return gulp.src(dev + folders.images[0] + '/**/*')
    .pipe(!isProduction ? $.plumber() : $.util.noop())
    .pipe(gulp.dest(dist + folders.images[1] + '/'))
    .pipe($.size({ title: 'images' }));
});

gulp.task('fonts', function (cb) {
  return gulp.src(dev + folders.fonts[0] + '/**/*')
    .pipe(!isProduction ? $.plumber() : $.util.noop())
    .pipe(gulp.dest(dist + folders.fonts[1] + '/'))
    .pipe($.size({ title: 'fonts' }));
});

gulp.task('webpack', function (cb) {
  return gulp.src(scriptFiles.webpackEntry)
    .pipe(!isProduction ? $.plumber() : $.util.noop())
    .pipe(webpackStream(webpackConfig))
    .pipe(gulp.dest(dist + folders.scripts[1] + '/'))
    .pipe($.size({ title: 'scripts' }));
});

gulp.task('vendor', function (cb) {
  return gulp.src(dev + folders.vendor[0] + '/**/*')
    .pipe(!isProduction ? $.plumber() : $.util.noop())
    .pipe(gulp.dest(dist + folders.vendor[1] + '/'))
    .pipe($.size({ title: 'vendor' }));
});

gulp.task('directives', function (cb) {
  return gulp.src(dev + folders.directiveTemplates[0] + '/*.html')
    .pipe(!isProduction ? $.plumber() : $.util.noop())
    .pipe(gulp.dest(dist + folders.directiveTemplates[1] + '/'))
    .pipe($.size({ title: 'html (directives)' }));
});

gulp.task('views', function (cb) {
  return gulp.src(dev + folders.viewTemplates[0] + '/*.html')
    .pipe(!isProduction ? $.plumber() : $.util.noop())
    .pipe(gulp.dest(dist + folders.viewTemplates[1] + '/'))
    .pipe($.size({ title: 'html (views)' }));
});

gulp.task('html', function (cb) {
  return gulp.src(dev + folders.html[0] + '/*.html')
    .pipe(!isProduction ? $.plumber() : $.util.noop())
    .pipe(gulp.dest(dist + folders.html[1] + '/'))
    .pipe($.size({ title: 'html' }));
});

gulp.task('clean', function (cb) {
  return del([dist], { force: true }, cb);
});

gulp.task('watch', function () {
  gulp.watch(dev + folders.stylus[0] + '/**/*.styl', ['styl']);
  gulp.watch(dev + folders.images[0] + '/**/*', ['images']);
  gulp.watch(dev + folders.fonts[0] + '/**/*', ['fonts']);
  gulp.watch(scriptFiles.webpackAll, ['webpack']);
  // gulp.watch(scriptFiles.copy, ['scripts']);
  gulp.watch(dev + folders.vendor[0] + '/**/*', ['vendor']);
  gulp.watch(dev + folders.html[0] + '/*.hmtl', ['html']);
  gulp.watch(dev + folders.directiveTemplates[0] + '/*.hmtl', ['directives']);
  gulp.watch(dev + folders.viewTemplates[0] + '/*.hmtl', ['views']);
});


/**
 * PRIMARY TASKS
 */

// npm start
// WATCH - Clean, build (development), watch
gulp.task('default', ['clean'], function (cb) {
  runSequence('webpack', ['html', 'directives', 'views', 'styl', 'images', 'fonts', 'vendor'], 'watch', cb);
});

// npm run build
// BUILD - Clean, build (production)
gulp.task('build', ['clean'], function (cb) {
  runSequence('webpack', ['html', 'directives', 'views', 'styl', 'images', 'fonts', 'vendor'], cb);
});
