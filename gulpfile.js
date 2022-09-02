const { src, dest, watch, series, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const browserSync = require('browser-sync').create();
const pug = require('gulp-pug');
const del = require('del');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');

function browsersync() {
  browserSync.init({
    server: 'src/',
    notify: false,
  });
}

function buildHTML() {
  return src('src/pug/*.pug')
    .pipe(
      pug({
        pretty: true,
      })
    )
    .pipe(dest('dist'))
    .pipe(dest('src'))
    .pipe(browserSync.stream());
}

function buildSass() {
  return src('src/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(
      postcss([
        autoprefixer({
          overrideBrowserslist: ['last 2 versions'],
        }),
        cssnano(),
      ])
    )
    .pipe(rename('styles.min.css'))
    .pipe(dest('dist/css'))
    .pipe(dest('src/css'))
    .pipe(sourcemaps.write('.'))
    .pipe(browserSync.stream());
}

function buildJs() {
  return src('src/js/scripts.js')
    .pipe(rename('scripts.min.js'))
    .pipe(dest('src/js'))
    .pipe(dest('dist/js'))
    .pipe(browserSync.stream());
}

function serve() {
  watch(['src/js/**/*.js', '!src/js/**/*.min.js'], buildJs);
  watch('src/scss/**/*.scss', buildSass);
  watch('src/pug/*.pug', buildHTML);
}

function cleanDist() {
  return del('dist/**/*', { force: true });
}

function copy() {
  return src(['src/img/**/*.*', 'src/css/**/*.css'], {
    base: 'src/',
  }).pipe(dest('dist'));
}

exports.build = series(cleanDist, buildHTML, buildSass, buildJs, copy);
exports.default = series(
  [buildHTML, buildSass, buildJs],
  parallel(browsersync, serve)
);
