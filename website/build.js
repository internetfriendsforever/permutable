const fs = require('fs')
const child = require('child_process')
const util = require('util')
const path = require('path')
const marked = require('marked')
const hljs = require('highlight.js')
const write = require('write')
const page = require('./src/page')
const package = require('../library/package.json')

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

write(path.join(__dirname, 'public/index.html'), page({
  title: 'Permutable',
  content: marked(fs.readFileSync(path.join(__dirname, 'src/introduction.md'), 'utf-8')).replace(new RegExp('{{VERSION}}', 'g'), package.version)
}))

write(path.join(__dirname, 'public/api.html'), page({
  title: 'API – Permutable',
  content: marked(fs.readFileSync(path.join(__dirname, 'src/api.md'), 'utf-8'))
}))

console.timeEnd('Build')
