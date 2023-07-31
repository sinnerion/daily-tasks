'use strict';

const gulp = require('gulp');
// const sass = require('gulp-sass');
// const plumber = require('gulp-plumber');
const cache = require('gulp-cache');
// const purgecss = require('gulp-purgecss');
const csso = require('gulp-csso');
// const cleanCss = require('gulp-clean-css');
// const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');
// const pngout = require('imagemin-pngout');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync');
const del = require('del');
const runSequence = require('run-sequence');

gulp.task('browserSync', function () {
  browserSync({
    server: {
      baseDir: './src',
      routes: {
        '/node_modules': 'node_modules',
      },
    },
    notify: false,
  });
});

// gulp.task('sass', function () {
//   gulp.src('./src/sass/**/*.scss')
//       .pipe(plumber({
//         errorHandler: function (error) {
//           console.log(error.message);
//           this.emit('end');
//         }
//       }))
//       .pipe(sass())
//       .pipe(autoprefixer('last 10 versions'))
//       .pipe(csso())
//       .pipe(gulp.dest('src/css'))
//       .pipe(browserSync.reload({stream: true}));
// });

// gulp.task('images', function () {
//   gulp.src('./src/images/**/*')
//       .pipe(cache(imagemin({
//         interlaced: true,
//         progressive: true,
//         svgoPlugins: [{removeViewBox: false}],
//         use: [pngout()]
//       })))
//       .pipe(gulp.dest('dist/images'));
// });

gulp.task('css:minify', function () {
  return gulp.src('./src/css/**/*.css')
      .pipe(autoprefixer('last 10 versions'))
      .pipe(csso())
      .pipe(gulp.dest('dist/css'));
});

// gulp.task('purgecss', function() {
//   return gulp.src('src/css/bootstrap.min.css')
//       .pipe(purgecss({
//         content: ['src/**/*.html']
//       }))
//       .pipe(gulp.dest('dist/css'))
// });

// gulp.task('fonts', function () {
//   return gulp.src('./src/fonts/**/*').pipe(gulp.dest('dist/fonts'));
// });

gulp.task('html', function () {
  return gulp.src('./src/**/*.html')
  // .pipe(htmlmin({collapseWhitespace: true}))
      .pipe(gulp.dest('dist'));
});
// gulp.task('libs', function () {
//   return gulp.src('./src/libs/**/*')
//       .pipe(gulp.dest('dist/libs'));
// });
gulp.task('js', function () {
  return gulp.src('./src/js/**/*')
  // .pipe(uglify())
  .pipe(gulp.dest('dist/js'));
});

gulp.task('clean:dist', function () {
  return del.sync('dist');
});

gulp.task('watch', ['browserSync'], function () {
  gulp.watch('src/css/**/*.css', browserSync.reload);
  gulp.watch('src/*.html', browserSync.reload);
  gulp.watch('src/js/**/*.js', browserSync.reload);
});

gulp.task('clearcache', function () {
  return cache.clearAll();
});

gulp.task('build', function (callback) {
  runSequence('clean:dist', 'css:minify', ['html', 'js'], callback);
});

gulp.task('default', function (callback) {
  runSequence(['browserSync', 'watch'], callback);
});