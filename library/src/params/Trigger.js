import './Midi'

export default class Trigger extends HTMLTableRowElement {
  static get observedAttributes() {
    return ['key', 'active']
  }

  constructor () {
    super()

    this.onMouseDown = this.onMouseDown.bind(this)
    this.onMouseUp = this.onMouseUp.bind(this)
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

    this.update()
  }

  connectedCallback () {
    this.button.addEventListener('mousedown', this.onMouseDown)
    this.button.addEventListener('mouseup', this.onMouseUp)
    this.midiInput.addEventListener('input', this.onMidiInput)
  }

  disconnectedCallback () {
    this.button.removeEventListener('mousedown', this.onMouseDown)
    this.button.removeEventListener('mouseup', this.onMouseUp)
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

  onMouseDown (event) {
    this.value = true
  }

  onMouseUp (event) {
    this.value = false
  }

  onMidiInput (event) {
    const { type, value } = event.detail

    if (type === 144) {
      this.value = true
    } else if (type === 128) {
      this.value = false
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

customElements.define('permutable-trigger-param', Trigger, {
  extends: 'tr'
})
