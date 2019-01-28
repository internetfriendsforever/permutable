import remote from 'rollup-plugin-remote'

export default {
  input: './src/index.js',

  output: [
    {
      file: 'dist/cjs.js',
      format: 'cjs'
    },

    {
      file: 'dist/esm.js',
      format: 'esm'
    },

    {
      file: 'dist/iife.js',
      format: 'iife',
      name: 'permutable'
    }
  ],

  plugins: [
    remote()
  ]
}
