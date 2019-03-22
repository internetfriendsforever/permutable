import css from '@happycat/css'

const styles = {
  container: css(`
    display: table-row;
  `),

  slider: css(`
    position: relative;
    flex: auto;
    cursor: ew-resize;
    display: flex;
    padding: 0.15rem 0.4rem;

    :hover {
      color: white;
    }
  `),

  indicator: css(`
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    background: gold;
    border-left: 1px solid gold;
    mix-blend-mode: difference;
  `),

  name: css(`
    position: relative;
    flex: auto;
  `),

  value: css(`
    position: relative;
    flex: 0;
  `)
}

class NumberParamElement extends HTMLTableRowElement {
  static get observedAttributes() {
    return ['key', 'value']
  }

  constructor () {
    super()

    this.setAttribute('min', 0)
    this.setAttribute('max', 1)
    this.setAttribute('step', 0.01)
    this.setAttribute('value', 0.5)

    this.onMouseDown = this.onMouseDown.bind(this)
    this.className = styles.container

    this.innerHTML = `
      <td class="slider ${styles.slider}">
        <div class="name ${styles.name}"></div>
        <div class="indicator ${styles.indicator}"></div>
      </td>
      <td class="value ${styles.name}"></td>
    `

    this.sliderElement = this.querySelector('.slider')
    this.nameElement = this.querySelector('.name')
    this.indicatorElement = this.querySelector('.indicator')
    this.valueElement = this.querySelector('.value')
  }

  connectedCallback () {
    this.sliderElement.addEventListener('mousedown', this.onMouseDown)
  }

  disconnectedCallback () {
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

  get range () {
    return this.max - this.min
  }

  onMouseDown (event) {
    const onDrag = event => {
      const rect = this.sliderElement.getBoundingClientRect()
      const position = (event.clientX - Math.floor(rect.left)) / Math.floor(rect.width)
      const stepped = this.min + Math.floor((position * this.range) / this.step) * this.step
      const value = Math.max(this.min, Math.min(this.max, stepped))
      this.setAttribute('value', value)
      this.dispatchEvent(new CustomEvent('change', { bubbles: true }))
    }

    const onEnd = () => {
      document.removeEventListener('mousemove', onDrag)
      document.removeEventListener('mouseup', onEnd)
    }

    onDrag(event)

    document.addEventListener('mousemove', onDrag)
    document.addEventListener('mouseup', onEnd)
  }

  attributeChangedCallback (name) {
    switch (name) {
      case 'key':
        this.nameElement.innerText = this.getAttribute('key')
      break
      case 'value':
        const percent = ((this.value - this.min) / this.range) * 100
        const decimals = (this.step.toString().split('.')[1] || '').length
        const displayValue = this.value.toFixed(decimals)
        this.indicatorElement.style.width = `${percent}%`
        this.valueElement.innerText = displayValue
      break
    }
  }
}

customElements.define('p-number-param', NumberParamElement, {
  extends: 'tr'
})