module.exports = function(config) {
  config.addPassthroughCopy({ 'src/_assets': 'assets' })

  return {
    templateFormats: ['mustache'],
    dir: {
      input: 'src',
      output: 'dist'
    }
  }
}
