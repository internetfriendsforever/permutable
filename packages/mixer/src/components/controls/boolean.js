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

export default function control ({ item, key, wires }) {
  const { wire } = wires(key)

  return wire`
    <div className=${container} data-control='boolean' data-key=${key} data-value=${item.value}>
      <div className=${nameContainer}>${key}</div>
      <div className=${valueContainer}>${item.value ? 'yes' : 'no'}</div>
    </div>
  `
}
