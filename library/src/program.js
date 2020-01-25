import './elements/allParams.js'
import createParams from './params'

class Program {
  constructor ({
    name,
    params,
    setup
  } = {}, {
    autoRender = true
  } = {}) {
    if (!name) {
      throw new Error('Program should have a name')
    }

    this.name = name
    this.setupHandler = setup
    this.autoRender = autoRender
    this.dirty = true

    this.render = this.render.bind(this)
    this.queueRender = this.queueRender.bind(this)
    this.onChange = this.onChange.bind(this)

    this.canvasElement = document.createElement('canvas')
    this.params = createParams(params)

    this.params.element.addEventListener('change', this.onChange)
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
    this.dirty = false
    this.renderRequest = null

    if (this.renderHandler) {
      this.renderHandler(this.params.values)
    }
  }

  onChange () {
    this.dirty = true

    if (this.autoRender) {
      this.queueRender()
    }
  }

  queueRender () {
    if (!this.renderRequest) {
      this.renderRequest = window.requestAnimationFrame(this.render)
    }
  }
}

export default (...args) => new Program(...args)
