import Program from '../Program'
import styles from '../styles.css'

export default function run (
  description,
  {
    container = document.body,
    width = null,
    height = null,
    ratio = window.devicePixelRatio
  } = {}
) {
  const program = new Program(description.default || description)
  const element = document.createElement('div')

  element.classList.add('permutable', 'run')

  const styleElement = document.createElement('style')

  styleElement.setAttribute('scoped', true)
  styleElement.innerHTML = styles

  container.appendChild(styleElement)

  const paramsTable = document.createElement('table')

  paramsTable.classList.add('params')
  paramsTable.appendChild(program.params.element)

  element.appendChild(program.canvasElement)
  element.appendChild(paramsTable)

  container.appendChild(element)

  if (width || height) {
    container.style.width = width
    container.style.height = height
    program.canvasElement.width = width * ratio
    program.canvasElement.height = height * ratio
  } else {
    async function resize () {
      const width = container.offsetWidth
      const height = container.offsetHeight
      program.canvasElement.width = width * ratio
      program.canvasElement.height = height * ratio
    }

    window.addEventListener('resize', () => {
      resize().then(program.render)
    })

    resize()
  }

  program.setup()
}
