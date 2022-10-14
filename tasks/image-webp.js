/**
 * Convert image
 */
'use strict';

const gulp = require('gulp');
const newer = require('gulp-newer');
const imagemin = require('gulp-imagemin');
const imageminWebp = require('imagemin-webp');
const rename = require('gulp-rename');
//const changed = require('gulp-changed');

module.exports = function (options) {
  return () => {
    return (
      gulp
        .src(`./${options.src}/images/**/*.{jpg,png}`)
        .pipe(newer({ dest: `./${options.dest}/images/`, ext: '.webp' }))
        //.pipe(changed(`./${options.dest}/images/`, { extension: '.webp' }))
        .pipe(imagemin([imageminWebp({ quality: 80 })]))
        .pipe(
          rename({
            extname: '.webp',
          })
        )
        .pipe(gulp.dest(`./${options.dest}/images/`))
    );
  };
};
