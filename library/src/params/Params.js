import './BPM'
import './Camera'
import './File'
import './Number'
import './Timer'
import './Toggle'
import './Trigger'

export default class Params {
  constructor (description) {
    this.element = document.createElement('tbody')

    for (let key in description) {
      const { type, ...props } = description[key]

      const element = document.createElement('tr', {
        is: `permutable-${type}-param`
      })

      element.props = props
      element.classList.add(type, 'param')
      element.setAttribute('key', key)

      for (let prop in props) {
        element.setAttribute(prop, props[prop])
      }

      this.element.appendChild(element)
    }
  }

  remove () {
    this.element.remove()
  }

  get values () {
    const values = {}

    for (let element of this.element.childNodes) {
      values[element.getAttribute('key')] = element.value
    }

    return values
  }
}
