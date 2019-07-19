import css from '@happycat/css'

const styles = {
  container: css(`
    line-height: 1.8rem;
  `),

  name: css(`
    position: relative;
    padding: 0 0.5rem;
  `),

  value: css(`
    padding: 0 0.4rem;
    position: relative;
    width: 1%;
  `)
}

export default class TimerParamElement extends HTMLTableRowElement {
  static get observedAttributes() {
    return ['key']
  }

  constructor () {
    super()

    this.value = 0
    this.classList.add(styles.container)

    this.update = this.update.bind(this)

    this.innerHTML = `
      <td class="name ${styles.name}">Name</td>
      <td class="value ${styles.value}">–</td>
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

customElements.define('p-timer-param', TimerParamElement, {
  extends: 'tr'
})
