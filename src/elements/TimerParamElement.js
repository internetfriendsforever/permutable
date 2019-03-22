import css from '@happycat/css'

const styles = {
  container: css(`
    display: table-row;
  `),

  name: css(`
    position: relative;
    flex: auto;
    margin-right: 0.75rem;
  `),

  value: css(`
    position: relative;
    flex: 0;
  `)
}

class TimerParamElement extends HTMLTableRowElement {
  static get observedAttributes() {
    return ['key', 'value']
  }

  constructor () {
    super()

    this.setAttribute('value', 0)

    this.update = this.update.bind(this)
    this.className = styles.container

    this.innerHTML = `
      <td class="name ${styles.name}">Name</td>
      <td class="value ${styles.value}">Value</td>
    `

    this.nameElement = this.querySelector('.name')
    this.valueElement = this.querySelector('.value')
  }

  connectedCallback () {
    this.queueUpdate()
  }

  disconnectedCallback () {
    window.cancelAnimationFrame(this.updateRequest)
  }

  get value () {
    return parseFloat(this.getAttribute('value'), 10)
  }

  update (time) {
    this.setAttribute('value', time)
    this.dispatchEvent(new CustomEvent('change', { bubbles: true }))
    this.queueUpdate()
  }

  queueUpdate () {
    this.updateRequest = window.requestAnimationFrame(this.update)
  }

  attributeChangedCallback (name) {
    switch (name) {
      case 'key':
        return this.nameElement.innerText = this.getAttribute('key')
      case 'value':
        return this.valueElement.innerText = this.getAttribute('value')
    }
  }
}

customElements.define('p-timer-param', TimerParamElement, {
  extends: 'tr'
})