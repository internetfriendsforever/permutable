import './Midi'

export default class Toggle extends HTMLTableRowElement {
  static get observedAttributes() {
    return ['key', 'active']
  }

  constructor () {
    super()

    this.onClick = this.onClick.bind(this)
    this.onMidiInput = this.onMidiInput.bind(this)

    this.innerHTML = `
      <td class="name">
        <button class="button"></button>
      </td>
      <td class="value"></td>
      <td class="input">
        <permutable-midi-input />
      </td>
    `

    this.button = this.querySelector('button')
    this.nameElement = this.querySelector('.name')
    this.valueElement = this.querySelector('.value')
    this.midiInput = this.querySelector('permutable-midi-input')
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
    this.setAttribute('active', value)
    this.dispatchEvent(new CustomEvent('change', {
      bubbles: true
    }))
  }

  get value () {
    return this.getAttribute('active') === 'true'
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

  attributeChangedCallback (name, oldValue, newValue) {
    this.button.innerText = this.getAttribute('key')
    this.valueElement.innerText = this.value ? 'On' : 'Off'
  }
}

customElements.define('permutable-toggle-param', Toggle, {
  extends: 'tr'
})
