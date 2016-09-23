var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var reload      = browserSync.reload;

// 静态服务器 + 监听 scss/html 文件
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        // baseDir: './'
        server: './'
    });

    gulp.watch('*.scss', ['sass']);
    gulp.watch('*.html').on('change', reload);
});

// scss编译后的css将注入到浏览器里实现更新
gulp.task('sass', function() {
    return gulp.src('*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./'))
        .pipe(reload({stream: true}));
});

gulp.task('default', ['serve']);