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
    max-width: 200px;
    border-collapse: collapse;
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

  const paramsTable = document.createElement('table')

  program.canvasElement.classList.add(styles.canvas)
  paramsTable.classList.add(styles.params)

  paramsTable.appendChild(program.params.element)

  document.body.appendChild(program.canvasElement)
  document.body.appendChild(paramsTable)

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
