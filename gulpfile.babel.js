import gulp from 'gulp';
import plumber from 'gulp-plumber';

// sass
import sass from 'gulp-sass';
import cssnano from 'gulp-cssnano';
import autoprefixer from 'gulp-autoprefixer';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';
import sourcemaps from 'gulp-sourcemaps';

// js
import browserify from 'browserify'
import babelify from 'babelify';
import source from 'vinyl-source-stream';
import babel from 'gulp-babel';

const PATH = {
  CSS : {
    src : 'src/scss/**/*.scss',
    dest: 'static/css'
  },
  JS: {
    src: 'src/js/index.js',
    dest: 'static/js'
  }
};

gulp.task('css', () => {
  gulp.src(PATH.CSS.src)
    .pipe(plumber({
      errorHandler: (err) => {
        console.log(err.messageFormatted);
      }
    }))
    .pipe(sass({errLogToConsole: true}))
    .pipe(autoprefixer('last 4 version'))
    .pipe(gulp.dest(PATH.CSS.dest))
    .pipe(cssnano())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(PATH.CSS.dest))
});

gulp.task('browserify', () => {
  browserify(PATH.JS.src, {debug: true})
  .transform(babelify)
  .bundle()
  .on('error', err => { console.log(`ERR!: ${err.message}`); })
  .pipe(source('bundle.js'))
  .pipe(gulp.dest(PATH.JS.dest))
});

gulp.task('js',() =>{
  gulp.src(PATH.JS.src)
    .pipe(babel())
    .pipe(gulp.dest(PATH.JS.dest))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(PATH.JS.dest))
});

gulp.task('default', ['css', 'js' ], () => {
    gulp.watch("src/scss/**/*.scss", ['css']);
    gulp.watch("src/js/**/*.js", ['browserify']);
});
