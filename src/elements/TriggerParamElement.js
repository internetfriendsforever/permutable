import css from '@happycat/css'
import './ButtonElement'

const styles = {
  container: css(`
    display: table-row;
  `),

  name: css(`
    position: relative;
    padding: 0;
  `),

  button: css(`
    display: block;
    padding: 0.4rem 0.3rem 0.15rem 0.3rem;
    width: 100%;
  `),

  value: css(`
    position: relative;
    padding: 0.4rem 0.3rem 0.15rem 0.5rem;
    width: 1%;
    text-align: right;
  `)
}

class Trigger extends HTMLTableRowElement {
  static get observedAttributes() {
    return ['key', 'active']
  }

  constructor () {
    super()

    this.onMouseDown = this.onMouseDown.bind(this)
    this.onMouseUp = this.onMouseUp.bind(this)
    this.className = styles.container

    this.innerHTML = `
      <td class="name ${styles.name}">
        <button is="p-button" class=${styles.button}></button>
      </td>
      <td class="value ${styles.value}"></td>
    `

    this.button = this.querySelector('button')
    this.nameElement = this.querySelector('.name')
    this.valueElement = this.querySelector('.value')

    this.update()
  }

  connectedCallback () {
    this.button.addEventListener('mousedown', this.onMouseDown)
    this.button.addEventListener('mouseup', this.onMouseUp)
  }

  disconnectedCallback () {
    this.button.removeEventListener('mousedown', this.onMouseDown)
    this.button.removeEventListener('mouseup', this.onMouseUp)
  }

  get value () {
    return this.hasAttribute('active')
  }

  onMouseDown (event) {
    this.toggleAttribute('active', true)
    this.dispatchEvent(new CustomEvent('change', { bubbles: true }))
  }

  onMouseUp (event) {
    this.toggleAttribute('active', false)
    this.dispatchEvent(new CustomEvent('change', { bubbles: true }))
  }

  attributeChangedCallback () {
    this.update()
  }

  update () {
    this.button.innerText = this.getAttribute('key')
    this.valueElement.innerText = this.value ? 'On' : 'Off'
  }
}

customElements.define('p-trigger-param', Trigger, {
  extends: 'tr'
})
