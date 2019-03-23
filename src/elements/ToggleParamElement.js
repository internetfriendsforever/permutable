import css from '@happycat/css'
import './ButtonElement'

const styles = {
  container: css(`
    line-height: 1.8rem;
  `),

  name: css(`
    position: relative;
    padding: 0;
  `),

  button: css(`
    display: block;
    padding: 0 0.5rem;
    width: 100%;
  `),

  value: css(`
    position: relative;
    padding: 0 0.4rem;
    width: 1%;
    text-align: right;
  `),

  input: css(`
    width: 1%;
    padding: 0;
  `)
}

export default class ToggleParamElement extends HTMLTableRowElement {
  static get observedAttributes() {
    return ['key', 'active']
  }

  constructor () {
    super()

    this.onClick = this.onClick.bind(this)
    this.onMidiInput = this.onMidiInput.bind(this)
    this.classList.add(styles.container)

    this.innerHTML = `
      <td class="name ${styles.name}">
        <button is="p-button" class=${styles.button}></button>
      </td>
      <td class="value ${styles.value}"></td>
      <td class="input ${styles.input}">
        <p-midi-input />
      </td>
    `

    this.button = this.querySelector('button')
    this.nameElement = this.querySelector('.name')
    this.valueElement = this.querySelector('.value')
    this.midiInput = this.querySelector('p-midi-input')

    this.update()
  }

  connectedCallback () {
    this.nameElement.addEventListener('click', this.onClick)
    this.midiInput.addEventListener('input', this.onMidiInput)
  }

  disconnectedCallback () {
    this.nameElement.removeEventListener('click', this.onClick)
    this.midiInput.removeEventListener('input', this.onMidiInput)
  }

  set value (value) {
    this.toggleAttribute('active', value)
    this.dispatchEvent(new CustomEvent('change', {
      bubbles: true
    }))
  }

  get value () {
    return this.hasAttribute('active')
  }

  onClick (event) {
    this.value = !this.value
  }

  onMidiInput (event) {
    const { type, value } = event.detail

    if (type === 144) {
      this.value = !this.value
    } else if (type !== 128) {
      this.value = value > 0.5
    }
  }

  attributeChangedCallback () {
    this.update()
  }

  update () {
    this.button.innerText = this.getAttribute('key')
    this.valueElement.innerText = this.value ? 'On' : 'Off'
  }
}

customElements.define('p-toggle-param', ToggleParamElement, {
  extends: 'tr'
})
