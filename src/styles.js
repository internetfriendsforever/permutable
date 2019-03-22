import css from '@happycat/css'
import plex from './plex'

export default css(`
  font-family: 'IBM Plex Mono', monospace;
  margin: 0;
  background: black;
  color: #aaa;
  user-select: none;
  text-transform: uppercase;
  line-height: 1.2;

  @font-face {
    font-family: 'IBM Plex Mono';
    font-weight: normal;
    font-style: normal;
    src: url(${plex}) format('woff2')
  }
`)
