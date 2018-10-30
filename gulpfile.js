var gulp = require("gulp");
var sass = require("gulp-sass");
var sourcemaps = require("gulp-sourcemaps");
var del = require("del");
var browserSync = require("browser-sync").create();

	
var paths = {
  styles: {      
    src: "src/scss/**/*.scss",
    dest: "dist/css"
  },
  html: {
    src: "src/**/*.html",
    dest: "dist"
  },
  images: {
    src: ["src/images/**/*.jpg", "src/images/**/*.png", "src/images/**/*.ico"],
    dest: "dist/img"
  }
};

gulp.task("html", function() {
  return gulp.src(paths.html.src)
    .pipe(gulp.dest(paths.html.dest))
    .pipe(browserSync.stream());
});

gulp.task("sass", function () {
  return gulp.src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(sass(
      {
        outputStyle: "expanded"
      }
    ).on("error", sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(browserSync.stream());
});

gulp.task("images", function() {
  return gulp.src(paths.images.src)
    .pipe(gulp.dest(paths.images.dest))
    .pipe(browserSync.stream());
});

gulp.task("del", function () {
  return del(["dist"]);
});

gulp.task("watch", function () {
  browserSync.init({
    server: {
      baseDir: "./dist"
    }
  });
  gulp.watch(["src/scss/**/*.scss", "src/*.html"], ["html", "images", "sass"]);
});

gulp.task("default", ["html", "sass", "images", "watch"]);