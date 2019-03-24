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
  `),

  fullscreen: css(`
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
    window.addEventListener('resize', () => resize().then(program.queueRender))
    program.canvasElement.classList.add(styles.fullscreen)
  }

  async function resize (initial) {
    const ratio = options.ratio || window.devicePixelRatio
    const width = options.width || window.innerWidth * ratio
    const height = options.height || window.innerHeight * ratio
    program.canvasElement.width = width
    program.canvasElement.height = height
    program.canvasElement.style.width = options.fullscreen ? '100%' : width / ratio
    program.canvasElement.style.height = options.fullscreen ? '100%' : height / ratio
  }

  resize()
  program.setup()
}
