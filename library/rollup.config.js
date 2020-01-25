import { string } from 'rollup-plugin-string'

export default {
  input: './src/index.js',

  output: [
    {
      file: 'dist/esm.js',
      format: 'esm'
    },

    {
      file: 'dist/cjs.js',
      format: 'cjs'
    },

    {
      file: 'dist/iife.js',
      format: 'iife',
      name: 'permutable'
    }
  ],

  plugins: [
    string({
      include: '**/*.css'
    })
  ],

  watch: {
    clearScreen: false
  }
}
