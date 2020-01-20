const fs = require('fs')
const child = require('child_process')
const util = require('util')
const path = require('path')
const marked = require('marked')
const hljs = require('highlight.js')
const pretty = require('pretty')
const write = require('write')
const libraryPackage = require('../library/package.json')

const exec = util.promisify(child.exec)

console.time('Build')

marked.setOptions({
  highlight: function(code, lang) {
    if (lang) {
      return hljs.highlight(lang, code).value
    } else {
      return code
    }
  }
})

const readme = fs.readFileSync(path.join(__dirname, 'src/introduction.md'), 'utf-8')
const docs = marked(readme)

const html = pretty(`
  <!doctype html>
  <html lang="en">
    <head>
      <title>Permutable</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charset="utf-8" />
      <link rel="stylesheet" href="assets/highlight/dracula.css" />
      <link rel="stylesheet" href="assets/styles.css" />
    </head>
    <body>
      ${docs.replace('{{VERSION}}', libraryPackage.version)}
    </body>
  </html>
`, {
  ocd: true
})

write(path.join(__dirname, 'public/index.html'), html)

console.timeEnd('Build')
