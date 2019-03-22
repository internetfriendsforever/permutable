import css from '@happycat/css'
import './elements/ButtonElement.js'

const styles = {
  row: css(`
    border-bottom: 2px #aaa solid;

    td {
      vertical-align: top;
    }
  `),

  title: css(`
    padding: 1rem;
    width: 1%;
  `),

  params: css(`
    padding: 0.75rem 0.5em;
  `),

  canvas : css(`
    position: relative;
    width: 1%;
    padding: 0.5em;
  `),

  removeButton: css(`
    position: absolute;
    top: 0;
    right: 0;
    width: 2em;
    height: 2em;
    text-align: center;
    background: black;
  `)
}

class Channel {
  constructor (program) {
    this.program = program

    this.element = document.createElement('tr')
    this.element.classList.add(styles.row)

    this.element.innerHTML = `
      <td class=${styles.title}>${program.name}</td>
      <td data-params class=${styles.params}></td>
      <td data-canvas class=${styles.canvas}>
        <button data-remove is='p-button' class=${styles.removeButton}>
          ×
        </button>
      </td>
    `

    this.remove = this.remove.bind(this)
    this.removeButton = this.element.querySelector('[data-remove]')
    this.removeButton.addEventListener('click', this.remove)

    this.paramsContainer = this.element.querySelector('[data-params]')
    this.paramsContainer.appendChild(program.paramsElement)

    program.paramsElement.style.width = '100%'

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
