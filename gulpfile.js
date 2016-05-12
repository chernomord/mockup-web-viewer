var $ = require('gulp-load-plugins')(),
    gulp = require('gulp'),
    path = require('path'),
    less = require('gulp-less');
    // autoprefixer = require('gulp-autoprefixer'),
    // rename = require('gulp-rename'),

var assets = {
    styles: {
        src: 'src/less/app.less',
        dest: 'distr/css'
    },
    scripts: {
        src: 'src/app.js',
        vendors: [
            'bower_components/angular/angular.min.js',
            'bower_components/angular-animate/angular-animate.min.js',
            'bower_components/angular-route/angular-route.min.js'
        ],
        dest: 'distr/js'
    },
    resources: {
        src: [
            '*/i/*',
            '*/mockups/*',
            '*/partials/*',
            '*/*.html',
            '*/*.json'
        ],
        dest: 'distr'
    }
};

gulp.task('scripts', function() {
    return gulp.src(assets.scripts.src)
        .pipe($.plumber())
        .pipe(gulp.dest(assets.scripts.dest))
});

gulp.task('vendors', function() {
    var src = [].concat(assets.scripts.vendors);
    gulp
        .src(src)
        .pipe($.plumber())
        .pipe($.concat('vendors.min.js'))
        .pipe($.uglify())
        .pipe(gulp.dest(assets.scripts.dest));
});

gulp.task('less', function () {
    return gulp.src(assets.styles.src)
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(gulp.dest(assets.styles.dest));
});

gulp.task('resources', function() {
    return gulp.src(assets.resources.src)
        .pipe($.rename(function (path)
        {
            path.dirname = path.dirname.replace('src','').replace('distr','');
        }))
        .pipe($.plumber())
        .pipe(gulp.dest(assets.resources.dest));
});

gulp.task('build', ['less','scripts','resources','vendors']);

gulp.task('default', ['build'], function() {
    gulp.watch(assets.styles.src, ['less']);
    gulp.watch(assets.resources.src, ['resources']);
    gulp.watch(assets.scripts.src, ['scripts']);
});