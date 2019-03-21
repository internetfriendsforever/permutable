import css from '@happycat/css'
import createProgram from './program'
import bodyStyles from './styles.js'
import './elements/index.js'

const styles = {
  params: css(`
    position: absolute;
    top: 0;
    left: 0;
    background: black;
  `),

  canvas: css(`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  `)
}

export default function run (description, options = {}) {
  const program = createProgram(description)

  document.body.classList.add(bodyStyles)
  document.body.style.background = 'black'
  document.body.style.margin = 0

  if (options.fullscreen !== false) {
    program.fullscreen()
  }

  program.canvasElement.classList.add(styles.canvas)
  program.paramsElement.classList.add(styles.params)

  document.body.appendChild(program.canvasElement)
  document.body.appendChild(program.paramsElement)
}
