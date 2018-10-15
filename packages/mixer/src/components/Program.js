import html from 'nanohtml'
import { css } from 'emotion'

const styles = css`
  cursor: grab;
  padding: 0.75rem;
  border-bottom: 2px #aaa solid;
  background: #222;

  &:hover {
    background: #aaa;
    color: black;
  }

  &:active {
    background: gold;
    color: black;
  }
`

export default function program ({ name, wires }) {
  return html`
    <div id='program-${name}' className=${styles} data-program data-name=${name} draggable=${true}>
      ${name}
    </div>
  `
}
