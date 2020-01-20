import pkg from './package.json'

const external = [
  '@happycat/css'
]

const unpkg = id => {
  const version = pkg.dependencies[id]
  return `https://unpkg.com/${id}@${version}?module`
}

export default {
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
        '@happycat/css': 'happycat.css'
      }
    }
  ],

  watch: {
    clearScreen: false
  }
}
