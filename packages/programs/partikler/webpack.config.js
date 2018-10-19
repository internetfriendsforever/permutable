const path = require('path')
const debug = process.env.NODE_ENV !== 'production'
const devtool = debug && 'eval'

module.exports = {
  devtool: devtool,

  entry: path.join(__dirname, 'src/index.js'),

  output: {
    path: path.join(__dirname, 'lib'),
    libraryTarget: 'commonjs2',
    libraryExport: 'default',
    filename: 'index.js',
    publicPath: '/'
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /(libs|node_modules)/,
        query: {
          presets: ['es2015', 'stage-0']
        }
      },

      {
        test: /\.glsl$/,
        loader: 'raw'
      },

      {
        test: /\.json$/,
        loader: 'url'
      },

      {
        test: /libs\/lightgl\.js$/,
        loader: 'exports?GL'
      }
    ]
  }
}
