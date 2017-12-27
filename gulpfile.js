'use strict';
const gulp = require('gulp');
/*global -$ 加载需使用的gulp插件*/
const $ = require('gulp-load-plugins')();

/*
 *管理资源文件路径集合
 */
var config = {};

config['src'] = { 
    scripts: 'src/*.js',
};

// 目标文件路径　不用替换
config['dist'] = {
    scripts: 'dist/'
}

//js
gulp.task('scripts', function () {
    return gulp.src(config['src'].scripts)
			.pipe($.uglify({mangle: true}))
            .pipe($.concat('vm.js'))
			.pipe(gulp.dest(config['dist'].scripts))
});

//清空文件
gulp.task('clean', function () {
    return gulp.src('dist/*.js', {read: false})
        .pipe($.clean());
});

gulp.task('default',['scripts']);
