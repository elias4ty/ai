const gulp = require('gulp'),
      sass = require('gulp-sass'),
      plumber = require('gulp-plumber'),
      connect = require('gulp-connect'),
      // browserify = require('gulp-browserify'),
      babel = require('gulp-babel');

gulp.task('css',function(){
  gulp.src('./public/sass/**/*.scss')
      .pipe(plumber())
      .pipe(sass())
      .pipe(gulp.dest('./static/css'))
})

gulp.task('js',function(){
  gulp.src('./public/js/**/*.js')
      .pipe(plumber())
      .pipe(babel())
      // .pipe(browserify())
      .pipe(gulp.dest('./static/js'))
})

gulp.task('connect',function(){
    connect.server({
      root:'./src/views',
      livereload : true
    })
})

gulp.task('html',function(){
  gulp.src('./src/views/**/*.html')
      .pipe(connect.reload());
})

gulp.task('watch',function(){
  gulp.watch('./public/sass/**/*.scss',['css'])
  gulp.watch('./src/views/**/*.html',['html'])
  gulp.watch('./public/js/**/*.js',['js'])
})
