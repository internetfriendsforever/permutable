import pkg from './package.json'

const external = [
  'kefir',
  'hyperhtml',
  '@happycat/css'
]

const unpkg = id => {
  const version = pkg.dependencies[id]
  return `//unpkg.com/${id}@${version}?module`
}

export default [
  {
    input: './src/index.js',

    external: external,

    output: [
      {
        file: 'dist/esm.js',
        format: 'esm',
        paths: unpkg
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
]
