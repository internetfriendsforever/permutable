export default class Camera extends HTMLTableRowElement {
  static get observedAttributes() {
    return ['key']
  }

  constructor () {
    super()

    this.innerHTML = `
      <td class="name">Name</td>
      <td class="select"><select></select></td>
      <td class="video"><video></video></td>
    `

    this.nameElement = this.querySelector('.name')
    this.valueElement = this.querySelector('.value')
    this.selectElement = this.querySelector('select')
    this.videoElement = this.querySelector('video')

    this.videoElement.addEventListener('loadedmetadata', () => {
      this.videoElement.play()
    })

    this.value = this.videoElement

    this.selectElement.addEventListener('change', this.onSelectChange.bind(this))

    this.update = this.update.bind(this)
    this.onUserMedia = this.onUserMedia.bind(this)
    this.onUserMediaError = this.onUserMediaError.bind(this)

    navigator.mediaDevices.getUserMedia({ video: true })
      .then(this.onUserMedia)
      .catch(this.onUserMediaError)
  }

  onUserMedia (stream) {
    if (!this.stream) {
      navigator.mediaDevices.enumerateDevices()
        .then(this.onDevices.bind(this))
        .catch(this.onDevicesError.bind(this))
    }

    this.stream = stream
    this.videoElement.srcObject = stream

    this.selectElement.selectedIndex = [...this.selectElement.options].findIndex(option => {
      return option.text === stream.getVideoTracks()[0].label
    })

    this.start()
  }

  onUserMediaError (error) {
    console.warn('Could not get user media', error)
  }

  onDevices (devices) {
    this.selectElement.innerHTML = devices
      .filter(device => device.kind === 'videoinput')
      .map(device => `
        <option value="${device.deviceId}">
          ${device.label}
        </option>
      `)
  }

  onDevicesError (error) {
    console.warn('Could not get camera devices', error)
  }

  onSelectChange (event) {
    this.stop()

    const constraints = {
      audio: false,
      video: {
        deviceId: {
          exact: event.currentTarget.value
        }
      }
    }

    navigator.mediaDevices.getUserMedia(constraints)
      .then(this.onUserMedia)
      .catch(this.onUserMediaError)
  }

  start () {
    this.queueUpdate()
  }

  stop () {
    clearInterval(this.interval)
    window.cancelAnimationFrame(this.updateRequest)
    
    if (this.stream) {
      this.videoElement.pause()
      this.videoElement.srcObject = null
      this.stream.getTracks().forEach(track => track.stop())
    }
  }

  update () {
    this.dispatchEvent(new CustomEvent('change', { bubbles: true }))
    this.queueUpdate()
  }

  queueUpdate () {
    this.updateRequest = window.requestAnimationFrame(this.update)
  }

  attributeChangedCallback (name, oldValue, newValue) {
    switch (name) {
      case 'key':
        return this.nameElement.innerText = this.getAttribute('key')
    }
  }
}

customElements.define('permutable-camera-param', Camera, {
  extends: 'tr'
})
