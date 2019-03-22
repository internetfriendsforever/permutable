import css from '@happycat/css'

const styles = {
  params: css(`
    border-collapse: collapse;
  `),

  canvas: css(`
    display: block;
  `)
}

class Program {
  constructor ({ name, params, setup }) {
    if (!name) {
      throw new Error('Program should have a name')
    }

    this.render = this.render.bind(this)
    this.queueRender = this.queueRender.bind(this)

    this.name = name
    this.params = params

    this.canvasElement = document.createElement('canvas')
    this.canvasElement.classList.add(styles.canvas)

    this.paramsElement = document.createElement('table')
    this.paramsElement.classList.add(styles.params)
    this.paramsElement.addEventListener('change', this.queueRender)

    Promise.resolve(setup(this.canvasElement)).then(renderHandler => {
      this.renderHandler = renderHandler
    })

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

  render () {
    this.renderRequest = null

    if (this.renderHandler) {
      this.renderHandler(this.values)
      this.canvasElement.dispatchEvent(new CustomEvent('render', {
        bubbles: true
      }))
    }
  }

  queueRender () {
    if (!this.renderRequest) {
      this.renderRequest = window.requestAnimationFrame(this.render)
    }
  }
}

export default (...args) => new Program(...args)
