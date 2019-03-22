import css from '@happycat/css'

const styles = css(`
  display: block;
  font: inherit;
  text-transform: inherit;
  background: transparent;
  color: #aaa;
  cursor: pointer;
  border: 0;
  margin: 0;
  padding: 0;
  outline: 0;
  white-space: nowrap;
  text-align: left;

  [active] {
    color: gold;
  }

  :not([active]) {
    :hover {
      color: white;
    }

    :active {
      color: gold;
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
