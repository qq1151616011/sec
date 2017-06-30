/**
 * Created by zaq on 16/8/8.
 */
var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin'), //html压缩
    // imagemin = require('gulp-imagemin'),//图片压缩
    clean = require('gulp-clean'),
   /* pngcrush = require('imagemin-pngcrush'),*/
    // sass = require('gulp-ruby-sass'),//scss编译
    // sass = require('gulp-sass'),//scss编译
   /* autoprefixer = require('gulp-autoprefixer'),*///css3代码自动补全插件
    minifycss = require('gulp-clean-css'),//css压缩
  /*  jshint = require('gulp-jshint'),*///js检测
    uglify = require('gulp-uglify'),//js压缩
    concat = require('gulp-concat'),//文件合并
    rename = require('gulp-rename'),//文件更名
    /*spritesmith = require('gulp.spritesmith'),*///雪碧图
    notify = require('gulp-notify'),//提示信息
    browserSync = require('browser-sync').create(),//浏览器刷新
    livereload = require('gulp-livereload');//自动刷新页面
// 检查js
/*gulp.task('lint', function() {
    return gulp.src(['src/js/!*.js','src/js/controllers/!*.js','src/js/services/!*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        // .pipe(notify({ message: 'lint task ok' }));
});*/
// 压缩js
gulp.task('js', function() {
    return gulp.src(['src/js/*.js','src/js/controllers/*.js'])
        .pipe(concat('all.js'))

        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        // .pipe(notify({ message: 'js task ok' }));
});
//复制lib
gulp.task('lib',function () {
    return gulp.src('src/lib/**')
        .pipe(gulp.dest('dist/lib'))
});


gulp.task('image',function () {
    return gulp.src('src/image/**')
        .pipe(gulp.dest('dist/image'))
});
//编译并压缩scss
// gulp.task('scss', function() {
//     return gulp.src('src/scss/*.scss')
//         .pipe(sass({ style: 'expanded' }))
//         .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
//         .pipe(gulp.dest('dist/css'))
//         .pipe(rename({suffix: '.min'}))
//         .pipe(minifycss())
//         .pipe(gulp.dest('dist/css'))
//         .pipe(notify({ essage: 'Styles task complete' }));
// });
// 合并、压缩、重命名css
gulp.task('css', function() {
    return gulp.src('src/css/*.css')
        .pipe(concat('main.css'))

        .pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
        .pipe(gulp.dest('dist/css'))
        // .pipe(notify({ message: 'css task ok' }));
});
// 压缩图片
/*gulp.task('img', function() {
    return gulp.src('src/img/!*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngcrush()]
        }))
        .pipe(gulp.dest('./dist/images/'))
        // .pipe(notify({ message: 'img task ok' }));
});*/
//雪碧图
/*gulp.task('sprite', function () {
    var spriteData = gulp.src('src/img/!*.png').pipe(spritesmith({
        imgName: 'sprite.png',
        cssName: 'sprite.css'
    }));
    return spriteData.pipe(gulp.dest('dist/img'));
});*/
// 压缩html
gulp.task('html', function() {
    return gulp.src('src/*.html')
        .pipe(htmlmin({collapseWhitespace: true,minifyCSS: true}))
        .pipe(gulp.dest('./dist'))
        // .pipe(notify({ message: 'html task ok' }));

});
//templates目录下的html文件压缩
gulp.task('html-tpl', function() {
    return gulp.src('src/views/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('./dist/views'))
    // .pipe(notify({ message: 'html task ok' }));

});
// 静态服务器
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: "dist",
            index: "index.html"
            // proxy: "域名或者ip"
        }
    });
});
//清除文件
gulp.task('clean', function(cb) {
    return gulp.src('dist',{read: false})
        .pipe(clean({force: true}))
});
gulp.task('default',function () {
    gulp.start('js','css','html','html-tpl','lib','browserSync','image');
    // 监听html文件变化
    gulp.watch('src/*.html', ['html']);
    gulp.watch('src/templates/*.html', ['html-tpl']);
    // 监听scss
    gulp.watch('src/scss/*.scss', function () {
        gulp.run('scss');
    });
    // 监听css
    gulp.watch('src/css/*.css', ['css']);
    //
    // 监听 .js
    gulp.watch(['src/js/*.js','src/js/controllers/*.js'], ['lint', 'js']);
    //
    // // 监听 image 文件
    // gulp.watch('imges/*', ['img']);
    // livereload.listen();
    // // Watch any files in dest/, reload on change
    // gulp.watch(['dist/**']).on('change', livereload.changed);
    gulp.watch(['src/**']).on('change', browserSync.reload);



})
