import css from '@happycat/css'
import ButtonElement from './ButtonElement'

const styles = {
  container: css(`
    line-height: 1.8rem;
  `),

  name: css(`
    position: relative;
    padding: 0 0.5rem;
  `),

  value: css(`
    position: relative;
    padding: 0 0.4rem;
    width: 1%;
    text-align: right;
  `),

  buttons: css(`
    display: flex;
    padding: 0;

    button {
      margin: 0;
      padding: 0 0.4rem;
      line-height: inherit;
    }
  `)
}

export default class BPMParamElement extends HTMLTableRowElement {
  static get observedAttributes() {
    return ['key', 'value']
  }

  constructor () {
    super()

    this.taps = []
    this.classList.add(styles.container)
    this.onTapClick = this.onTapClick.bind(this)
    this.onAddClick = this.onAddClick.bind(this)
    this.onSubtractClick = this.onSubtractClick.bind(this)
    this.value = 120

    this.innerHTML = `
      <td class="name ${styles.name}">Name</td>
      <td class="value ${styles.value}">${this.value}</td>
      <td class="${styles.buttons}">
        <button class="subtract" is="p-button">–</button>
        <button class="add" is="p-button">+</button>
        <button class="tap" is="p-button">Tap</button>
      </td>
    `

    this.nameElement = this.querySelector('.name')
    this.valueElement = this.querySelector('.value')
    this.tapElement = this.querySelector('.tap')
    this.addElement = this.querySelector('.add')
    this.subtractElement = this.querySelector('.subtract')
  }

  get key () {
    return this.getAttribute('key')
  }

  get value () {
    const value = this.getAttribute('value')

    if (value) {
      return parseFloat(this.getAttribute('value'), 10)
    } else {
      return null
    }
  }

  get step () {
    return parseFloat(this.getAttribute('step'), 10) || 0.5
  }

  set value (value) {
    const stepped = Math.round(value / this.step) * this.step
    this.setAttribute('value', stepped.toFixed(1))
    this.dispatchEvent(new CustomEvent('change', {
      bubbles: true
    }))
  }

  connectedCallback () {
    this.tapElement.addEventListener('mousedown', this.onTapClick)
    this.addElement.addEventListener('mousedown', this.onAddClick)
    this.subtractElement.addEventListener('mousedown', this.onSubtractClick)
  }

  disconnectedCallback () {
    this.tapElement.removeEventListener('mousedown', this.onTapClick)
    this.addElement.removeEventListener('mousedown', this.onAddClick)
    this.subtractElement.removeEventListener('mousedown', this.onSubtractClick)
  }

  onTapClick () {
    const current = performance.now()
    const previous = this.taps[0]
    const delta = current - previous

    if (delta > 2000) {
      this.taps = []
    }

    if (this.taps.length > 8) {
      this.taps.pop()
    }

    this.taps.unshift(current)

    const durations = Array(this.taps.length - 1).fill().map((v, i) => (
      this.taps[i] - this.taps[i + 1]
    ))

    if (durations.length) {
      const average = durations.reduce((a, b) => a + b, 0) / durations.length
      const bpm = 60000 / average
      this.value = bpm
    }
  }

  onAddClick () {
    this.value += this.step
  }

  onSubtractClick () {
    this.value -= this.step
  }

  attributeChangedCallback (name, oldValue, newValue) {
    switch (name) {
      case 'key':
        return this.nameElement.innerText = this.getAttribute('key')
      case 'value':
        return this.valueElement.innerText = newValue || '-'
    }
  }
}

customElements.define('p-bpm-param', BPMParamElement, {
  extends: 'tr'
})
