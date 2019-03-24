import css from '@happycat/css'

const styles = {
  params: css(`
    border-collapse: collapse;
  `)
}

class Params {
  constructor (description) {
    this.element = document.createElement('tbody')
    this.element.classList.add(styles.params)

    for (let key in description) {
      const { type, ...props } = description[key]

      const element = document.createElement('tr', {
        is: `p-${type}-param`
      })

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

export default (...args) => new Params(...args)
