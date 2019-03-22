import css from '@happycat/css'
import createProgram from './program'
import baseStyles from './styles.js'
import './elements/allParams.js'

const styles = {
  params: css(`
    position: absolute;
    top: 0;
    left: 0;
    background: black;
    max-width: 250px;
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

  document.body.classList.add(baseStyles)
  document.body.style.background = 'black'
  document.body.style.margin = 0

  program.canvasElement.classList.add(styles.canvas)
  program.params.element.classList.add(styles.params)

  document.body.appendChild(program.canvasElement)
  document.body.appendChild(program.params.element)

  if (options.fullscreen !== false) {
    window.addEventListener('resize', resize)
  }

  function resize () {
    program.canvasElement.width = window.innerWidth * window.devicePixelRatio
    program.canvasElement.height = window.innerHeight * window.devicePixelRatio
    program.queueRender()
  }

  resize()
}
