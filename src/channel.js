import css from '@happycat/css'
import createParams from './params'
import './elements/ButtonElement.js'

const styles = {
  row: css(`
    border-bottom: 2px #aaa solid;

    td {
      vertical-align: top;
    }
  `),

  title: css(`
    padding: 0.9rem;
    width: 1%;
  `),

  params: css(`
    padding: 0.5rem 0.5em;

    table {
      border-collapse: collapse;
    }
  `),

  canvas : css(`
    position: relative;
    width: 1%;
    padding: 0.5rem;
  `),

  removeButton: css(`
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    width: 1.5em;
    height: 1.5em;
    text-align: center;
  `)
}

class Channel {
  constructor (program) {
    this.program = program

    this.element = document.createElement('tr')
    this.element.classList.add(styles.row)

    this.params = createParams({
      mix: {
        type: 'number',
        value: 0
      }
    })

    this.element.innerHTML = `
      <td class=${styles.title}>${program.name}</td>
      <td class=${styles.params}>
        <table data-params></table>
      </td>
      <td data-canvas class=${styles.canvas}>
        <button data-remove is='p-button' class=${styles.removeButton}>
          ×
        </button>
      </td>
    `

    this.remove = this.remove.bind(this)
    this.removeButton = this.element.querySelector('[data-remove]')
    this.removeButton.addEventListener('click', this.remove)

    this.paramsElement = this.element.querySelector('[data-params]')
    this.paramsElement.appendChild(this.params.element)
    this.paramsElement.appendChild(program.params.element)

    program.params.element.style.width = '100%'

    this.canvasContainer = this.element.querySelector('[data-canvas]')
    this.canvasContainer.appendChild(program.canvasElement)
  }

  remove () {
    this.element.dispatchEvent(new CustomEvent('remove'))
    this.removeButton.removeEventListener('click', this.remove)
    this.program.remove()
    this.element.remove()
  }
}

export default (...args) => new Channel(...args)
