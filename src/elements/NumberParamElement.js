import css from '@happycat/css'
import './MidiInput.js'

const styles = {
  container: css(`
    line-height: 1.8rem;
  `),

  slider: css(`
    position: relative;
    flex: auto;
    cursor: ew-resize;
    display: flex;
    padding: 0 0.5rem;
    background: rgba(255, 255, 255, 0.15);
    border-left: 1px solid #ddd;

    :hover {
      color: white;
    }
  `),

  indicator: css(`
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    background: white;
    mix-blend-mode: difference;
  `),

  name: css(`
    position: relative;
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

    this.classList.add(styles.container)

    this.innerHTML = `
      <td class="slider ${styles.slider}">
        <div class="name ${styles.name}"></div>
        <div class="indicator ${styles.indicator}"></div>
      </td>
      <td class="value ${styles.value}"></td>
      <td class="input ${styles.input}">
        <p-midi-input />
      </td>
    `

    this.sliderElement = this.querySelector('.slider')
    this.nameElement = this.querySelector('.name')
    this.indicatorElement = this.querySelector('.indicator')
    this.valueElement = this.querySelector('.value')
    this.midiInput = this.querySelector('p-midi-input')
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

  get range () {
    return this.max - this.min
  }

  onMouseDown (event) {
    const onDrag = event => {
      const rect = this.sliderElement.getBoundingClientRect()
      const position = (event.clientX - Math.floor(rect.left)) / Math.floor(rect.width)
      const stepped = this.min + Math.floor((position * this.range) / this.step) * this.step
      this.value = Math.max(this.min, Math.min(this.max, stepped))
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
    this.value = this.min + this.range * event.detail.value
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

customElements.define('p-number-param', NumberParamElement, {
  extends: 'tr'
})
