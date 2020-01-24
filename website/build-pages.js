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

const page = ({ title, content }) => pretty(`
  <!doctype html>
  <html lang="en">
    <head>
      <title>${title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charset="utf-8" />
      <link rel="stylesheet" href="assets/highlight/dracula.css" />
      <link rel="stylesheet" href="assets/styles.css" />
    </head>
    <body>
      ${content.replace('{{VERSION}}', libraryPackage.version)}

      <footer>
        <p>Happy coding! ♥ <a href="https://internetfriendsforever.com">internetfriendsforever</a></p>
        <p>Supported by funding from <a href="https://www.grafill.no/">Grafill</a></p>
      </footer>
    </body>
  </html>
`)

write(path.join(__dirname, 'public/index.html'), page({
  title: 'Permutable',
  content: marked(fs.readFileSync(path.join(__dirname, 'src/introduction.md'), 'utf-8'))
}))

write(path.join(__dirname, 'public/api.html'), page({
  title: 'API – Permutable',
  content: marked(fs.readFileSync(path.join(__dirname, 'src/api.md'), 'utf-8'))
}))

console.timeEnd('Build')
