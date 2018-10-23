var gulp = require('gulp');
var sass = require('gulp-sass');
var del = require('del');
var browserSync = require("browser-sync").create();

gulp.task('html', function() {
  return gulp.src('src/**/*.html')
    .pipe(gulp.dest('dist/'))
    .pipe(browserSync.stream())
})

gulp.task('sass', function () {
  return gulp.src('src/scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream())
});

gulp.task('del', function () {
  return del(['dist']);
})

gulp.task('watch', function () {
  browserSync.init({
    server: {
      baseDir: "./dist"
    }
  });
  gulp.watch(['src/scss/**/*.scss', 'src/*.html'], ['html', 'sass'])
});

gulp.task('default', ['html', 'sass', 'watch'])