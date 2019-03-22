import css from '@happycat/css'
import './elements/ButtonElement.js'

const styles = {
  container: css(`
    display: flex;
    border-bottom: 2px #aaa solid;
  `),

  title: css(`
    flex: 1;
    padding: 0.75rem;
  `),

  canvas: css(`
    flex 0;
    border: 0.5rem transparent solid;
  `),

  params: css(`
    flex 2;
    padding: 0.75rem;
  `),

  remove: css(`
    flex: 0;
    padding: 0.75rem;
  `)
}

class Channel {
  constructor ({ program }) {
    this.program = program
    this.element = document.createElement('div')
    this.element.innerHTML = `
      <div class=${styles.container}>
        <div class=${styles.title}>
          ${program.name}
        </div>

        <div data-params class=${styles.params}>
        </div>

        <div data-canvas class=${styles.canvas}>
        </div>

        <div title='Remove'>
          <button data-remove is='p-button' class=${styles.remove}>
            ×
          </button>
        </div>
      </div>
    `

    this.remove = this.remove.bind(this)
    this.removeButton = this.element.querySelector('[data-remove]')
    this.removeButton.addEventListener('click', this.remove)

    this.paramsContainer = this.element.querySelector('[data-params]')
    this.paramsContainer.appendChild(program.paramsElement)

    this.canvasContainer = this.element.querySelector('[data-canvas]')
    this.canvasContainer.appendChild(program.canvasElement)
  }

  remove () {
    this.removeButton.removeEventListener('click', this.remove)
    this.program.remove()
    this.element.remove()
  }
}

export default (...args) => new Channel(...args)
