import pkg from './package.json'

export default {
  input: './src/index.js',

  external: [
    'kefir',
    'hyperhtml',
    '@happycat/css'
  ],

  output: [
    {
      file: 'dist/esm.js',
      format: 'esm',
      paths: id => {
        const version = pkg.dependencies[id]
        return `//unpkg.com/${id}@${version}?module`
      }
    },

    {
      file: 'dist/cjs.js',
      format: 'cjs'
    },

    {
      file: 'dist/iife.js',
      format: 'iife',
      name: 'permutable',
      globals: {
        'kefir': 'Kefir',
        'hyperhtml': 'hyperHTML',
        '@happycat/css': 'happycat.css'
      }
    }
  ]
}
