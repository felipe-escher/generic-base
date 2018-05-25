var args = require('yargs').argv;
var gulp = require('gulp');
var del = require("del");
var htmlreplace = require('gulp-html-replace');
var systemjsBuilder = require('gulp-systemjs-builder');
var $ = require('gulp-load-plugins')({ lazy: true });

var build = './build/';
var staticFiles = [
    './assets/img/*.*',
    './menu.permissoes.json'
];
var temp = './tmp/';

var fonts = [
    './node_modules/font-awesome/fonts/*.*',
    './node_modules/bootstrap/fonts/*.*'
];

gulp.task('build-sjs', function() {
    var builder = systemjsBuilder();
    builder.loadConfigSync('./systemjs.config.js');
    return builder.buildStatic('./app/main.js', 'build.js', { minify: true, mangle: false })
           .pipe(gulp.dest(temp));
});

gulp.task('copy-static', function () {
    return gulp
        .src(staticFiles, { base: '.' })
        .pipe(gulp.dest(build));
});

gulp.task('clean-fonts', function (done) {
    return clean(build + 'fonts/**/*.*', done);
});

gulp.task('copy-fonts', ['clean-fonts'], function () {
    log('Copying fonts');

    return gulp
        .src(fonts)
        .pipe(gulp.dest(build + 'fonts'));
});

gulp.task('clean-styles', function (done) {
    var files = [].concat(
        build + 'styles/**/*.css'
    );
    return clean(files, done);
});

gulp.task('clean-js', function (done) {
    var files = [].concat(
        build + 'js/*.js'
    );
    return clean(files, done);
});

gulp.task('optimize', ['clean-styles', 'clean-js', 'copy-static', 'copy-fonts'], function() {
    var assets = $.useref({ searchPath: './' });
    var cssFilter = $.filter('**/*.css', { restore: true });
    var ignoreIndexFilter = $.filter(['**/*.css', '**/*.js'], { restore: true });

    var buildJs = gulp.src(temp + 'build.js');

    return gulp
        .src('./index.html')
        .pipe($.plumber())
        .pipe($.inject(buildJs))
        .pipe(assets)
        .pipe(cssFilter)
        .pipe($.csso())
        .pipe(cssFilter.restore)
        .pipe(ignoreIndexFilter)
        .pipe($.rev())
        .pipe(ignoreIndexFilter.restore)
        .pipe($.useref())
        .pipe($.revReplace())
        .pipe(htmlreplace({
            'systemjs': ''
        }))
        .pipe(gulp.dest(build));
});

function clean(path, done) {
    log('Cleaning: ' + $.util.colors.blue(path));
    return del(path, done);
}

function log(msg) {
    if (typeof (msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.util.log($.util.colors.blue(msg[item]));
            }
        }
    } else {
        $.util.log($.util.colors.blue(msg));
    }
}
