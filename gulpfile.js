/** Declare module */

const
    { src, dest, parallel, watch, series } = require('gulp'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    pug = require('gulp-pug'),
    browserSync = require('browser-sync').create()

/** Files Path */
const FilesPath = {
    sassFiles: 'sass/*.sass',
    jsFiles: 'js/*.js',
    htmlFiles: 'pages/*.pug'
}

const { sassFiles, jsFiles, htmlFiles } = FilesPath;

/** Sass Task */
function sassTask() {
    return src(sassFiles)
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(concat('style.css'))
        .pipe(dest('dist/css'))
        .pipe(browserSync.stream());
}

/** JS Task */
function jsTask() {
    return src(jsFiles)
        .pipe(concat('all.js'))
        .pipe(dest('dist/js'))

}

/** HTML Task */
function htmlTask() {
    return src(htmlFiles)
        .pipe(pug({ pretty: true }))
        .pipe(dest('dist'))
        .pipe(browserSync.stream());
}

/** Assets Task */

function assetsTask() {
    return src('assets/**')
        .pipe(dest('dist/assets'))

}

/** Watch Task */

function serve() {
    browserSync.init({
        server: {
            baseDir: 'dist'
        }
    })

    watch(sassFiles, sassTask);
    watch(jsFiles, jsTask);
    watch(htmlFiles, htmlTask);
}


exports.js = jsTask;
exports.sass = sassTask;
exports.html = htmlTask;
exports.assets = assetsTask;
exports.default = series(parallel(htmlTask, sassTask, jsTask, assetsTask));
exports.serve = series(serve, parallel(htmlTask, sassTask, jsTask, assetsTask))