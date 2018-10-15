import html from 'nanohtml'
import { css } from 'emotion'

const container = css`
  display: flex;
  align-items: center;
  cursor: pointer;

  :hover {
    color: white;
  }

  :active {
    color: gold;
  }
`

const nameContainer = css`
  flex: auto;
  margin-right: 0.75rem;
`

const valueContainer = css`
  flex: 0;
`

export default function control ({ id, item, key }) {
  return html`
    <div id=${id} className=${container} data-control='boolean' data-key=${key} data-value=${item.value}>
      <div className=${nameContainer}>${key}</div>
      <div className=${valueContainer}>${item.value ? 'yes' : 'no'}</div>
    </div>
  `
}
