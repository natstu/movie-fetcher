'use strict';
var gulp = require('gulp'), 
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    server = require('gulp-server-livereload');

var paths = {
  sass: ['styles/scss/*.scss', 'styles/scss/partials/*.scss', 'styles/scss/templates/*.scss']
};

gulp.task('default', ['compileSass', 'webserver']);

gulp.task('watch', function() {
    gulp.watch(paths.sass, ['compileSass']);
});

gulp.task("compileSass", function(){
 gulp.src("styles/scss/main.scss")
  .pipe(sass())
  .pipe(gulp.dest('styles/css'));
});

gulp.task('webserver', function() {
  gulp.src('')
    .pipe(server({
      livereload: true,
      directoryListing: true,
      open: true,
      port: 8000,
      defaultFile: '/index.html'
    }));
});
gulp.task('autoprefixer', function () {
    var postcss      = require('gulp-postcss');
    var sourcemaps   = require('gulp-sourcemaps');
    var autoprefixer = require('autoprefixer');
    return gulp.src('styles/css/*.css')
        .pipe(sourcemaps.init())
        .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('styles/css'));
});
