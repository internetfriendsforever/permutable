import css from '@happycat/css'

const styles = {
  name: css(`
    position: relative;
    padding: 0.4rem 0.3rem 0.15rem 0.5rem;
  `),

  value: css(`
    padding: 0.4rem 0.3rem 0.15rem 0.5rem;
    position: relative;
    width: 1%;
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
    this.setAttribute('value', (time / 1000).toFixed(2))
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
