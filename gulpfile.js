var gulp = require('gulp'),
    gulpSass = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    autoPrefix = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    sourcemaps = require('gulp-sourcemaps'),
    pug = require('gulp-pug'),
    del = require('del'),
    imgmin = require('gulp-imagemin'),
    eslint = require('gulp-eslint');

var path = {
    baseDir: './dist',
    css: {
        src: './src/sass',
        dist: './dist/css',
    },
    html: {
        src: './src/pug',
        dist: './dist',
    },
    img: {
        src: './src/img/*',
        dist: './dist/img',
    },
    js: {
        src: './src/js',
        dist: './dist/js',
    },
    fonts: {
        src: './src/fonts',
        dist: './dist/fonts',
    },
};

function sass() {
    return gulp
        .src(path.css.src + '/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(gulpSass().on('error', gulpSass.logError))
        .pipe(sourcemaps.write())
        .pipe(cleanCSS())
        .pipe(autoPrefix())
        .pipe(gulp.dest(path.css.dist))
        .pipe(browserSync.stream());
}

function html() {
    return gulp
        .src(path.html.src + '/*.pug')
        .pipe(pug({
            pretty: true,
        }))
        .pipe(gulp.dest(path.html.dist))
        .pipe(browserSync.stream());
}

function sync() {
    browserSync.init({
        server: {
            baseDir: path.baseDir,
        }
    });
    gulp.watch(path.css.src + '/**/*.scss', gulp.series(sass));
    gulp.watch(path.html.src + '/**/*.pug', gulp.series(html));
    gulp.watch(path.js.src + '/**/*.js', gulp.series(js));
    gulp.watch(path.html.dist + '/**/*.html').on('change', browserSync.reload);
}

function minimizeImages() {
    return gulp
        .src(path.img.src)
        // .pipe(imgmin())
        .pipe(gulp.dest(path.img.dist));
}


function clean () {
    return del([
        path.css.dist,
        path.html.dist,
    ]);
}

// TODO use eslint (configure)
function js () {
    return gulp.src(path.js.src + '/**/*.js')
        .pipe(gulp.dest(path.js.dist));
}

// TODO optimize
function fonts () {
    return gulp.src(path.fonts.src + '/**/*')
        .pipe(gulp.dest(path.fonts.dist));
}

exports.build = gulp.series(clean, minimizeImages, fonts, gulp.parallel(sass, js, html), sync);
