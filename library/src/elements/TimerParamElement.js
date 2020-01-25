export default class TimerParamElement extends HTMLTableRowElement {
  static get observedAttributes() {
    return ['key']
  }

  constructor () {
    super()

    this.value = 0

    this.update = this.update.bind(this)

    this.innerHTML = `
      <td class="name">Name</td>
      <td class="value"><span>-</span></td>
    `

    this.nameElement = this.querySelector('.name')
    this.valueElement = this.querySelector('.value')
  }

  connectedCallback () {
    this.queueUpdate()
  }

  disconnectedCallback () {
    clearInterval(this.interval)
    window.cancelAnimationFrame(this.updateRequest)
  }

  update (time) {
    this.value = parseFloat((time / 1000).toFixed(2), 10)
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

customElements.define('permutable-timer-param', TimerParamElement, {
  extends: 'tr'
})
