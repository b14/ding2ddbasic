'use strict';

var gulp = require('gulp-help')(require('gulp'));

// Plugins.
var gutil = require('gulp-util');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var concatCss = require('gulp-concat-css');
var gulpStylelint = require('gulp-stylelint');


// We only want to process our own non-processed JavaScript files.
var jsPath = './scripts/ddbasic.!(*.min).js';
var sassPath = './sass/**/*.scss';

gulp.task('jshint', 'Run Javascript through JSHint',
  function() {
    return gulp.src(jsPath)
      .pipe(jshint())
      .pipe(jshint.reporter('jshint-stylish'));
  }
);

gulp.task('uglify', 'Minify JavaScript using Uglify',
  function() {
    gulp.src(jsPath)
      .pipe(uglify({
        // Preserve the $ variable name.
        mangle: { except: ['$'] }
      }).on('error', gutil.log))
      // Use gulp-rename to change the name of processed files.
      // We keep them in the same folder as the originals.
      .pipe(rename(function (path) {
        path.extname = '.min.js';
      }))
      .pipe(gulp.dest('./scripts'));
  }
);

gulp.task('sass', 'Process SCSS using libsass',
  function () {
    gulp.src(sassPath)
      .pipe(gulpStylelint({
        syntax: 'scss',
        failAfterError: false,
        reporters: [
          {formatter: 'string', console: true, save: 'stylelint'},
        ]
      }))
      .pipe(sass({outputStyle: 'compressed'})
        .on('error', sass.logError))
      .pipe(concatCss("bundle.css"))
      .pipe(cleanCSS())
      .pipe(gulp.dest('./gulp_css'));
  }
);

gulp.task('watch', 'Watch and process JS and SCSS files', ['uglify', 'sass'],
  function() {
    gulp.watch(jsPath, ['jshint', 'uglify']);
    gulp.watch(sassPath, ['sass']);
  }
);

gulp.task('default', ['help']);
