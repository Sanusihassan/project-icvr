/**
 * Build html from templates
 */
'use strict';

const gulp = require('gulp');
const fileinclude = require('gulp-file-include');
// needed to minify html
const htmlmin = require('gulp-htmlmin');
module.exports = function (options) {
  return () => {
    return gulp
      .src(`./${options.templates}/**/*.html`)
      .pipe(
        fileinclude({
          prefix: '@@',
          basepath: `./${options.templates}`,
          indent: true,
        })
      )
      .pipe(htmlmin({ collapseWhitespace: true }))
      .pipe(gulp.dest(options.dest));
  };
};
