import css from '@happycat/css'
import ButtonElement from './ButtonElement'

const styles = css(`
  padding: 0.4rem 0.3rem 0.15rem 0.3rem;
`)

export default class MidiInput extends HTMLElement {
  static get observedAttributes() {
    return ['pairing', 'name']
  }

  constructor () {
    super()

    this.onMidiMessage = this.onMidiMessage.bind(this)

    this.innerHTML = `
      <button is="p-button" class=${styles}>
        Midi
      </button>
    `

    this.button = this.querySelector('button')
  }

  connectedCallback () {
    this.addEventListener('click', this.onClick)

    navigator.requestMIDIAccess().then(access => {
      this.access = access

      for (const input of this.access.inputs.values()) {
        input.addEventListener('midimessage', this.onMidiMessage)
      }
    })
  }

  disconnectedCallback () {
    this.removeEventListener('click', this.onClick)

    if (this.access) {
      for (const input of this.access.inputs.values()) {
        console.log(input)
        input.removeEventListener('midimessage', this.onMidiMessage)
      }
    }
  }

  onClick () {
    if (this.toggleAttribute('pairing')) {
      for (const input of this.access.inputs.values()) {
        console.log('Available for pairing:', input.name)
      }
    }
  }

  onMidiMessage (event) {
    const { id, name } = event.currentTarget
    const [type, port, value] = event.data

    if (this.hasAttribute('pairing')) {
      this.setAttribute('id', id)
      this.setAttribute('name', name)
      this.setAttribute('port', port)
      this.removeAttribute('pairing')
    }

    if (this.getAttribute('id') == id && this.getAttribute('port') == port) {
      const normalValue = value / 127

      this.dispatchEvent(new CustomEvent('input', {
        detail: {
          type: type,
          port: port,
          value: normalValue
        }
      }))
    }
  }

  attributeChangedCallback () {
    const pairing = this.hasAttribute('pairing')
    const name = this.getAttribute('name')
    const port = this.getAttribute('port')

    this.button.toggleAttribute('active', pairing)
    this.button.innerText = name && port ? `${name.split(' ')[0]}#${port}` : 'Midi'
  }
}

customElements.define('p-midi-input', MidiInput)
