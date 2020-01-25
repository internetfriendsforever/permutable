import Params from './params/Params'

export default class Program {
  constructor (description = {}, {
    autoRender = true
  } = {}) {
    if (!description.name) {
      throw new Error('Program should have a name')
    }

    this.name = description.name
    this.setupHandler = description.setup
    this.autoRender = autoRender
    this.dirty = true

    this.render = this.render.bind(this)
    this.queueRender = this.queueRender.bind(this)
    this.onChange = this.onChange.bind(this)

    this.canvasElement = document.createElement('canvas')
    this.params = new Params(description.params)

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
