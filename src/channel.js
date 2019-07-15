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
    padding: 0.7rem;
    width: 1%;
  `),

  params: css(`
    padding: 0.4rem;

    table {
      border-collapse: collapse;
    }
  `),

  canvas : css(`
    position: relative;
    width: 1%;
    padding: 0.35rem;
  `),

  removeButton: css(`
    position: absolute;
    top: 0.35rem;
    right: 0.35rem;
    width: 1.8rem;
    height: 1.8rem;
    text-align: center;
  `)
}

class Channel {
  constructor (program, params) {
    this.program = program

    this.element = document.createElement('tr')
    this.element.classList.add(styles.row)

    this.params = createParams(params)

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
