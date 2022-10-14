const gulp = require('gulp');
const svgSprite = require('gulp-svg-sprite'),
  svgmin = require('gulp-svgmin'),
  cheerio = require('gulp-cheerio'),
  replace = require('gulp-replace');

module.exports = function (options) {
  return () => {
    return (
      gulp
        .src(`./${options.src}/icon-svg/*.svg`)
        // minify svg
        .pipe(
          svgmin({
            js2svg: {
              pretty: true,
            },
          })
        )
        // remove all fill, style and stroke declarations in out shapes
        .pipe(
          cheerio({
            run: function ($) {
              $('[style]').removeAttr('style');
            },
            parserOptions: { xmlMode: true },
          })
        )
        // cheerio plugin create unnecessary string '&gt;', so replace it.
        .pipe(replace('&gt;', '>'))
        // build svg sprite
        .pipe(
          svgSprite({
            mode: {
              symbol: {
                sprite: '../sprite.html',
                render: {
                  scss: {
                    dest: '../../../scss/base/sprite.scss',
                    template: `./${options.src}/scss/abstracts/sprite-template.scss`,
                  },
                },
              },
            },
          })
        )
        .pipe(gulp.dest(`./${options.src}/html/partials`))
    );
  };
};
