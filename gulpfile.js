const gulp = require('gulp');
const babel = require('gulp-babel');
const watch = require('gulp-watch');
const roullp = require('gulp-rollup'); //流清理
const replace = require('rollup-plugin-replace'); //变量替换
const eslint = require('gulp-eslint');

const entry = './src/server/**/*.js';
const cleanEntry = './src/server/config/index.js'

//开发环境

function builddev() {
    return watch(entry, {
        ignoreInitial: false
    }, function () {
        gulp.src(entry)
            .pipe(babel({
                //关闭外包.babelrc
                babelrc: false,
                "plugins": [
                    "@babel/plugin-transform-modules-commonjs"
                ]
            }))
            .pipe(gulp.dest('dist'))
    })
}

//上线环境

function buildprod() {
    return gulp.src(entry)
        .pipe(babel({
            //关闭外包.babelrc
            babelrc: false,
            ignore: [cleanEntry],
            "plugins": [
                "@babel/plugin-transform-modules-commonjs"
            ]
        }))
        .pipe(gulp.dest('dist'))
}
//清洗流

function buildconfig() {
    return gulp.src(entry)
        .pipe(roullp({
            input: cleanEntry,
            output: {
                format: 'cjs',
            },
            plugins: [
                replace({
                    'process.env.NODE_ENV': JSON.stringify('production')
                })
            ]
        }))
        .pipe(gulp.dest('dist'))
}
//代码校验
function buildhint() {
    return gulp.src([entry])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
}

let build = gulp.series(builddev);
if (process.env.NODE_ENV == 'production') {
    build = gulp.series(buildprod, buildconfig);
}
if (process.env.NODE_ENV == 'hint') {
    build = gulp.series(buildhint);
}
gulp.task('default', build);