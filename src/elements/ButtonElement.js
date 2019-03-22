import css from '@happycat/css'

const styles = css(`
  display: block;
  font: inherit;
  text-transform: inherit;
  background: #222;
  color: #aaa;
  cursor: pointer;
  border: 0;
  margin: 0;
  padding: 0;
  outline: 0;
  white-space: nowrap;
  text-align: left;

  [active] {
    color: white;
  }

  :not([active]) {
    :hover {
      color: white;
    }

    :active {
      background: #111;
    }
  }
`)

class ButtonElement extends HTMLButtonElement {
  constructor () {
    super()
    this.classList.add(styles)
  }
}

customElements.define('p-button', ButtonElement, {
  extends: 'button'
})
