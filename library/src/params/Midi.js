export default class Midi extends HTMLElement {
  static get observedAttributes() {
    return ['pairing', 'name', 'port']
  }

  constructor () {
    super()

    this.onKeyDown = this.onKeyDown.bind(this)
    this.onMidiMessage = this.onMidiMessage.bind(this)
    
    this.innerHTML = `<button class="midi">Midi</button>`
    
    this.button = this.querySelector('button')
  }

  connectedCallback () {
    document.addEventListener('keydown', this.onKeyDown)

    this.addEventListener('click', this.onClick)

    try {
      navigator.requestMIDIAccess().then(access => {
        this.access = access

        for (const input of this.access.inputs.values()) {
          input.addEventListener('midimessage', this.onMidiMessage)
        }
      })
    } catch (error) {
      console.error(error)
      this.button.disabled = true
      this.button.title = 'Midi not available (see console for more info)'
    }
  }

  disconnectedCallback () {
    document.removeEventListener('keydown', this.onKeyDown)

    this.removeEventListener('click', this.onClick)

    if (this.access) {
      for (const input of this.access.inputs.values()) {
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

  onKeyDown (event) {
    if ([46, 8].includes(event.keyCode) && this.hasAttribute('pairing')) {
      event.preventDefault()
      this.removeAttribute('id')
      this.removeAttribute('name')
      this.removeAttribute('port')
      this.removeAttribute('pairing')
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

    this.button.classList.toggle('active', pairing)
    this.button.innerText = name && port ? `${name.split(' ')[0]}#${port}` : 'Midi'
  }
}

customElements.define('permutable-midi-input', Midi)
