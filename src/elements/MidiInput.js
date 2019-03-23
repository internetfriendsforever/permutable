import css from '@happycat/css'
import ButtonElement from './ButtonElement'

const styles = css(`
  padding: 0.4rem 0.3rem 0.15rem 0.3rem;
`)

export default class MidiInput extends HTMLElement {
  static get observedAttributes() {
    return ['pairing']
  }

  constructor () {
    super()

    this.innerHTML = `
      <button is="p-button" class=${styles}>
        Midi
      </button>
    `

    this.button = this.querySelector('button')
  }

  connectedCallback () {
    this.addEventListener('click', this.onClick)
  }

  disconnectedCallback () {
    this.removeEventListener('click', this.onClick)
  }

  onClick () {
    this.toggleAttribute('pairing')
  }

  attributeChangedCallback () {
    this.button.toggleAttribute('active', this.hasAttribute('pairing'))
  }
}

customElements.define('p-midi-input', MidiInput)
