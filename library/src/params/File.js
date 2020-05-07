export default class File extends HTMLTableRowElement {
  static get observedAttributes() {
    return ['key', 'accept', 'multiple']
  }

  constructor () {
    super()

    this.value = null

    this.innerHTML = `
      <td colspan="3">
        <div class="flex">
          <span class="name">Name</span>
          <input type="file" />
        </div>
      </td>
    `

    this.nameElement = this.querySelector('.name')
    this.fileElement = this.querySelector('input[type=file]')
    this.valueElement = this.querySelector('.value')

    this.fileElement.addEventListener('change', this.onChange.bind(this))
  }

  async onChange (event) {
    const passThrough = file => file
    const process = this.props.process || passThrough
    const files = Array.from(event.currentTarget.files)

    if (this.props.multiple) {
      this.value = await process(files)
    } else {
      this.value = await process(files[0])
    }

    this.dispatchEvent(new CustomEvent('change', { bubbles: true }))
  }

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
