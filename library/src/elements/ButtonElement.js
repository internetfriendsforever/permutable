import css from '@happycat/css'

const styles = css(`
  display: block;
  font: inherit;
  letter-spacing: inherit;
  text-transform: inherit;
  cursor: pointer;
  border: 0;
  margin: 0;
  padding: 0;
  outline: 0;
  white-space: nowrap;
  text-align: left;
  background: #222;
  color: #aaa;

  :hover {
    background: #333;
    color: white;
  }

  :active {
    background: #111;
  }

  &[active] {
    background: #ccc;
    color: #222;

    :hover {
      background: white;
      color: black;
    }

    :active {
      background: #aaa;
    }
  }
`)

export default class ButtonElement extends HTMLButtonElement {
  constructor () {
    super()
    this.classList.add(styles)
  }
}

customElements.define('p-button', ButtonElement, {
  extends: 'button'
})
