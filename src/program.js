class Program {
  constructor ({ name, params, setup }) {
    if (!name) {
      throw new Error('Program should have a name')
    }

    this.queueRender = this.queueRender.bind(this)

    this.name = name
    this.params = params

    this.canvasElement = document.createElement('canvas')
    this.paramsElement = document.createElement('table')

    this.paramsElement.addEventListener('change', this.queueRender)

    this.renderHandler = setup(this.canvasElement)

    for (let key in params) {
      const { type, ...props } = params[key]
      const element = document.createElement('tr', {
        is: `p-${type}-param`
      })

      element.setAttribute('key', key)

      for (let prop in props) {
        element.setAttribute(prop, props[prop])
      }

      this.paramsElement.appendChild(element)
    }

    this.queueRender()
  }

  remove () {
    this.paramsElement.removeEventListener('change', this.queueRender)
    this.paramsElement.remove()
    this.canvasElement.remove()
  }

  get values () {
    const values = {}

    for (let element of this.paramsElement.childNodes) {
      values[element.getAttribute('key')] = element.value
    }

    return values
  }

  queueRender () {
    if (!this.renderRequest) {
      this.renderRequest = window.requestAnimationFrame(async () => {
        this.renderRequest = null

        const render = await Promise.resolve(this.renderHandler)

        if (render) {
          render(this.values)
        }
      })
    }
  }
}

export default (...args) => new Program(...args)
