// grab gulp packages
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    babel = require('gulp-babel'),
    browserSync = require('browser-sync').create();

// Start server and watch files
gulp.task('serve', ['sass'], function() {

  browserSync.init({
    server: "./dist"
  });

  gulp.watch(["./src/scss/*.scss", "./src/scss/components/*.scss"], ['sass']);
  gulp.watch('./src/js/*.js', ['babel']);

  gulp.watch("./dist/*.html").on('change', browserSync.reload);
  gulp.watch("./dist/css/*.css").on('change', browserSync.reload);
  gulp.watch("./dist/js/*.js").on('change', browserSync.reload);
});

// Compile sass into CSS and auto-inject into browsers
gulp.task('sass', function() {
  return gulp.src("./src/scss/*.scss")
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(gulp.dest("./dist/css/"));
});

// Compile js with babel
gulp.task('babel', function() {
  return gulp.src('./src/js/*.js')
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(gulp.dest('./dist/js/'))
});

gulp.task('default', ['serve']);
