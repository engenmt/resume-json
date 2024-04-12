const { src, dest, watch, series } = require('gulp')
const pug = require('gulp-pug')
const sass = require('gulp-sass')(require('sass'))

const bs = require('browser-sync').create()

const fs = require('fs')
const helper = require('./assets/helper.js')

let resumeFile
const i = process.argv.indexOf("--resume")
if (i > -1) {
  resumeFile = process.argv[i + 1]
} else {
  resumeFile = './resume.json'
}

function css() {
  return src('./assets/styles.scss')
    .pipe(sass())
    .pipe(dest('./assets'))
}

function html() {
  const resume = JSON.parse(fs.readFileSync(resumeFile, 'utf-8'))

  return src('./assets/index.pug')
    .pipe(pug({ data: { resume, helper } }))
    .pipe(dest('./public'))
}

function serve() {
  bs.init({
    server: {
      baseDir: './public',
      index: 'index.html'
    },
    ui: false,
    open: false
  })

  watch('./assets/**/*.scss', series(css, html))
  watch(['./assets/**/*.pug', resumeFile], html)
  bs.watch('./public/*.html').on('change', bs.reload)
}

exports.css = css
exports.default = series(css, html, serve)
