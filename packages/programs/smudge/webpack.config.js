const path = require('path')

module.exports = {
  entry: {
    main: './src/index.js'
  },

  output: {
    path: path.join(__dirname, 'lib'),
    libraryTarget: 'commonjs2',
    libraryExport: 'default',
    filename: 'index.js',
    publicPath: '/'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },

      {
        test: /\.(glsl|frag|vert)$/,
        loader: 'raw-loader',
        exclude: /node_modules/
      },

      {
        test: /\.(glsl|frag|vert)$/,
        loader: 'glslify-loader',
        exclude: /node_modules/
      }
    ]
  }
}
