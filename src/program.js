import css from '@happycat/css'
import createParams from './params'

const styles = {
  params: css(`
    border-collapse: collapse;
  `),

  canvas: css(`
    display: block;
  `)
}

class Program {
  constructor ({
    name,
    params,
    setup
  }, {
    autoRender = true
  } = {}) {
    if (!name) {
      throw new Error('Program should have a name')
    }

    this.name = name
    this.setupHandler = setup

    this.render = this.render.bind(this)
    this.queueRender = this.queueRender.bind(this)
    this.autoRender = autoRender

    this.canvasElement = document.createElement('canvas')
    this.canvasElement.classList.add(styles.canvas)

    this.params = createParams(params)

    if (this.autoRender) {
      this.params.element.addEventListener('change', this.queueRender)
    }
  }

  setup () {
    Promise.resolve(this.setupHandler(this.canvasElement)).then(renderHandler => {
      this.renderHandler = renderHandler

      if (this.autoRender) {
        this.queueRender()
      }
    })
  }

  remove () {
    this.params.element.removeEventListener('change', this.queueRender)
    this.params.remove()
    this.canvasElement.remove()
  }

  render () {
    this.renderRequest = null

    if (this.renderHandler) {
      this.renderHandler(this.params.values)
    }
  }

  queueRender () {
    if (!this.renderRequest) {
      this.renderRequest = window.requestAnimationFrame(this.render)
    }
  }
}

export default (...args) => new Program(...args)
