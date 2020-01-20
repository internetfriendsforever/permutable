const fs = require('fs')
const path = require('path')
const marked = require('marked')
const hljs = require('highlight.js')
const pretty = require('pretty')
const package = require('./package.json')

const [major, minor] = package.version.split('.')

const docVersion = `${major}.${minor}`

marked.setOptions({
  highlight: function(code, lang) {
    if (lang) {
      return hljs.highlight(lang, code).value
    } else {
      return code
    }
  }
})

const readme = fs.readFileSync(path.join(__dirname, 'docs/introduction.md'), 'utf-8')
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
      ${docs.replace('{{VERSION}}', docVersion)}
    </body>
  </html>
`, {
  ocd: true
})

fs.writeFileSync('public/index.html', html)
