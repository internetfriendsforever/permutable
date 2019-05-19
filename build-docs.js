const fs = require('fs')
const marked = require('marked')
const hljs = require('highlight.js')

marked.setOptions({
  highlight: function(code, lang) {
    if (lang) {
      return hljs.highlight(lang, code).value
    } else {
      return code
    }
  }
})

const readme = fs.readFileSync('README.md', 'utf-8')
const docs = marked(readme)

const html = `
  <!doctype html>
  <html lang="en">
    <head>
      <title>Permutable</title>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <meta charset="utf-8" />
      <link rel="stylesheet" href="assets/highlight/dracula.css" />
      <link rel="stylesheet" href="assets/styles.css" />
    </head>
    <body>
      ${docs}
    </body>
  </html>
`

fs.writeFileSync('index.html', html)
