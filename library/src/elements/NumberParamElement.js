import './MidiInput.js'

class NumberParamElement extends HTMLTableRowElement {
  static get observedAttributes() {
    return ['key', 'value', 'min', 'max', 'step']
  }

  constructor () {
    super()

    this.setAttribute('min', 0)
    this.setAttribute('max', 1)
    this.setAttribute('step', 0.01)
    this.setAttribute('value', 0)

    this.onMidiInput = this.onMidiInput.bind(this)
    this.onMouseDown = this.onMouseDown.bind(this)

    this.innerHTML = `
      <td class="slider">
        <div class="name"></div>
        <div class="indicator"></div>
      </td>
      <td class="value"></td>
      <td class="input">
        <permutable-midi-input />
      </td>
    `

    this.sliderElement = this.querySelector('.slider')
    this.nameElement = this.querySelector('.name')
    this.indicatorElement = this.querySelector('.indicator')
    this.valueElement = this.querySelector('.value')
    this.midiInput = this.querySelector('permutable-midi-input')
  }

  connectedCallback () {
    this.midiInput.addEventListener('input', this.onMidiInput)
    this.sliderElement.addEventListener('mousedown', this.onMouseDown)
  }

  disconnectedCallback () {
    this.midiInput.removeEventListener('input', this.onMidiInput)
    this.sliderElement.removeEventListener('mousedown', this.onMouseDown)
  }

  get min () {
    return parseFloat(this.getAttribute('min'), 10)
  }

  get max () {
    return parseFloat(this.getAttribute('max'), 10)
  }

  get step () {
    return parseFloat(this.getAttribute('step'), 10)
  }

  get value () {
    return parseFloat(this.getAttribute('value'), 10)
  }

  set value (value) {
    this.setAttribute('value', value)
    this.dispatchEvent(new CustomEvent('change', {
      bubbles: true
    }))
  }

  set normalValue (normalValue) {
    const stepped = this.min + Math.round((normalValue * this.range) / this.step) * this.step
    const clamped = Math.max(this.min, Math.min(this.max, stepped))
    this.value = clamped
  }

  get range () {
    return this.max - this.min
  }

  onMouseDown (event) {
    const onDrag = event => {
      const rect = this.sliderElement.getBoundingClientRect()
      const position = (event.clientX - Math.floor(rect.left)) / Math.floor(rect.width)
      this.normalValue = position
    }

    const onEnd = () => {
      document.removeEventListener('mousemove', onDrag)
      document.removeEventListener('mouseup', onEnd)
    }

    onDrag(event)

    document.addEventListener('mousemove', onDrag)
    document.addEventListener('mouseup', onEnd)
  }

  onMidiInput (event) {
    this.normalValue = event.detail.value
  }

  attributeChangedCallback (name) {
    const percent = ((this.value - this.min) / this.range) * 100
    const decimals = (this.step.toString().split('.')[1] || '').length
    const displayValue = this.value.toFixed(decimals)

    this.indicatorElement.style.width = `${percent}%`
    this.nameElement.innerText = this.getAttribute('key')
    this.valueElement.innerText = displayValue
  }
}

customElements.define('permutable-number-param', NumberParamElement, {
  extends: 'tr'
})
