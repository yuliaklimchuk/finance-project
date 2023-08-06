const gulp = require('gulp');
const ghpages = require("gh-pages");
//плагіни для html
const argv = require('yargs').argv;
const fileinclude = require('gulp-file-include');
const browserSync = require('browser-sync').create();
const projectConfig = require('./projectConfig.json');
const path = projectConfig.path;

//плагіни для css
const sass = require('gulp-sass')(require('sass')); 
const sourcemaps = require('gulp-sourcemaps');
const gulpif = require('gulp-if');
const autoprefixer = require('gulp-autoprefixer');
const csso = require('gulp-csso');
const rename = require("gulp-rename");
const gcmq = require('gulp-group-css-media-queries');

//плагіни для js
const webpackStream = require('webpack-stream');
const webpack = require('webpack');
const plumber = require('gulp-plumber');
const uglify = require('gulp-uglify');

//плагіни для image
const newer = require('gulp-newer');

const imagemin = require('gulp-imagemin');

const imageminJpegRecompress = require('imagemin-jpeg-recompress');
const webp = require('gulp-webp'); //для конвертації зображень в webp формат


//плагіни для шрифтів
const ttf2woff = require('gulp-ttf2woff');
const ttf2woff2 = require('gulp-ttf2woff2');
const fonter = require('gulp-fonter');

//плагін для очищення папки dist
const del = require('del');

// шляхи для html
path.src.html[0] =  path.src.srcPath + path.src.html[0];
path.src.html[1] =  "!" + path.src.html[0].slice(0, -6) + "_*.html";
path.src.html[2] =  "!" + path.src.srcPath + "/assets";
path.src.html[3] =  "!" + path.src.srcPath + "/_html";

path.dist.html = path.dist.distPath + path.dist.html;

path.watch = {};

path.watch.html = [];
path.watch.html[0] = path.src.html[0];

//шляхи для css
path.src.style[0] = path.src.srcPath + path.src.style[0];

path.dist.style = path.dist.distPath + path.dist.style;

path.watch.style = [];
path.watch.style[0]  = path.src.style[0].replace( path.src.style[0].split('/').pop(), '**/*.scss' );

//шляхи для js
path.src.script[0] = path.src.srcPath + path.src.script[0];

path.dist.script = path.dist.distPath + path.dist.script;

path.watch.script = [];
path.watch.script[0] = path.src.script[0].replace( path.src.script[0].split('/').pop(), '**/*.js' );

//шляхи для image
path.src.image[0] = path.src.srcPath + path.src.image[0];
path.src.image[1] = "!" + path.src.image[0].slice(0, -6) + "svgIcons/*.svg";

path.dist.image = path.dist.distPath + path.dist.image;

path.watch.image = [];
path.watch.image[0] = path.src.image[0];
path.watch.image[1] = "!" + path.src.image[0].slice(0, -6) + "svgIcons/*.svg";


//шляхи шрифтів
path.src.font[0] = path.src.srcPath + path.src.font[0];
path.src.font[1] = "!" + path.src.font[0].slice(0, -6) + "src/*.*";

path.dist.font = path.dist.distPath + path.dist.font;

path.watch.font = [];
path.watch.font[0] = path.src.font[0];
path.watch.font[1] = "!" + path.src.font[0].slice(0, -6) + "src/*.*";

//функції для перевірки режиму роботи 
const isDev = function(){
    return !argv.prod;
}

const isProd = function(){
    return !!argv.prod;
}

// для автоматичного відкриття браузеру
function browsersync() {
    browserSync.init({
            open: true,
            server: path.dist.distPath
    });
}

//gulp таск для html
function njk() {
    return gulp.src(path.src.html)
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
          }))
        .pipe(gulp.dest(path.dist.html))
        .on('end', browserSync.reload);
}

//gulp таск для CSS стилів
function scss(){
    return gulp.src(path.src.style)
        .pipe(gulpif(isDev(), sourcemaps.init()))
        .pipe(sass())
        .pipe(gulpif(isProd(), autoprefixer({
            grid: true
        })))
        .pipe(gulpif(isProd(), gcmq()))
        .pipe(gulpif(isDev(), sourcemaps.write()))
        .pipe(gulpif(isProd(), gulp.dest(path.dist.style)))
        .pipe(gulpif(isProd(), csso()))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(path.dist.style))
        .pipe(browserSync.reload({stream: true}))
}

//gulp таск для js
const webpackConf = {
    mode: isDev() ? 'development' : 'production',
    devtool: isDev() ? 'eval-source-map' : false,
    optimization: {
        minimize: false
    },
    output: {
        filename: 'app.js',
    },
    module: {
        rules: []
    }
}

if(isProd()){
    webpackConf.module.rules.push({
        test: /\.(js)$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader'
    });
}

function script(){
    return gulp.src(path.src.script)
        .pipe(plumber())
        .pipe(webpackStream(webpackConf, webpack))
        .pipe(gulpif(isProd(), gulp.dest(path.dist.script)))
        .pipe(gulpif(isProd(), uglify()))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(path.dist.script))
        .pipe(browserSync.reload({stream: true}))
}

//gulp таск для мінімізації image
function imageMin(){
    return gulp.src(path.src.image)
        .pipe(newer(path.dist.image))
        .pipe(imagemin([

            imageminJpegRecompress({
                progressive: true,
                min: 70, max: 75
            }),

            imagemin.svgo({
                plugins: [
                        { removeViewBox: false },
                        { removeUnusedNS: false },
                        { removeUselessStrokeAndFill: false },
                        { cleanupIDs: false },
                        { removeComments: true },
                        { removeEmptyAttrs: true },
                        { removeEmptyText: true },
                        { collapseGroups: true }
                ]
            })

        ]))
        .pipe(gulp.dest(path.dist.image))
}


//таск для конвертації зображень в webp:
function webConverter(){
    return gulp.src(path.dist.image + '**/*.{png,jpg,jpeg}')
        .pipe(webp())
        .pipe(gulp.dest(path.dist.image))
}

//виконуємо стиснення зображень, потім конвертацію і перезавантажуємо браузер

const image = gulp.series(imageMin, webConverter, (done) => {browserSync.reload(); done();});


//таски для перетворення шрифтів
function ttf2woff2Converter(){
    return gulp.src(path.src.font[0].slice(0, -6) + "src/*.ttf")
        .pipe(ttf2woff2())
        .pipe(gulp.dest(path.src.font[0].slice(0, -6)));
}

function ttf2woffConverter(){
    return gulp.src(path.src.font[0].slice(0, -6) + "src/*.ttf")
        .pipe(ttf2woff())
        .pipe(gulp.dest(path.src.font[0].slice(0, -6)));
}

function otf2ttf(){
    return gulp.src(path.src.font[0].slice(0, -6) + "src/*")
        .pipe(fonter({
            formats: ['ttf']
        }))
        .pipe(gulp.dest(path.src.font[0].slice(0, -6) + "src"));
}
const fontsConvert = gulp.series(otf2ttf, ttf2woff2Converter, ttf2woffConverter);

function font() {
    return gulp.src(path.src.font)      
        .pipe(gulp.dest(path.dist.font))
        .on('end', browserSync.reload);
};


//таск для очищення папки dist
function clean(){
    return del([path.dist.distPath]);
}

// для відстеження змін
function watch(){
    gulp.watch(path.watch.html, njk);
    gulp.watch(path.watch.style, scss);
    gulp.watch(path.watch.script, script);
    gulp.watch(path.watch.image, image);
    gulp.watch(path.watch.font, font);
}

exports.default = gulp.series(
    gulp.parallel(clean),
    gulp.parallel(njk, scss, script, image, font),
    gulp.parallel(browsersync, watch)
);

module.exports.ghp = (cb) => {
    ghpages.publish('./dist', cb);
  }