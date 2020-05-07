export default class File extends HTMLTableRowElement {
  static get observedAttributes() {
    return ['key', 'accept', 'multiple']
  }

  constructor () {
    super()

    this.innerHTML = `
      <td>
        <span class="name">Name</span>
        <input type="file" />
      </td>
      <td class="value"></td>
    `

    this.nameElement = this.querySelector('.name')
    this.fileElement = this.querySelector('input[type=file]')
    this.valueElement = this.querySelector('.value')

    this.fileElement.addEventListener('change', this.onChange.bind(this))
  }

  onChange (event) {
    Array.from(event.currentTarget.files).forEach(file => {
      console.log(file)
    })
  }

  // onLoad (stream) {
  // }

  // onError (error) {
  //   console.warn('Could not get file', error)
  // }

  // update () {
  //   this.dispatchEvent(new CustomEvent('change', { bubbles: true }))
  // }

  attributeChangedCallback (name, oldValue, newValue) {
    switch (name) {
      case 'key':
        return this.nameElement.innerText = this.getAttribute('key')
      case 'accept':
        return this.fileElement.setAttribute('accept', newValue)
      case 'multiple':
        if (newValue === 'true') {
          return this.fileElement.setAttribute('multiple', '')
        } else {
          return this.fileElement.removeAttribute('multiple')
        }
    }
  }
}

customElements.define('permutable-file-param', File, {
  extends: 'tr'
})
