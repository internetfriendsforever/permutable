import { css } from 'emotion'

const container = css`
  display: flex;
  align-items: center;
`

const slider = css`
  flex: auto;
  cursor: ew-resize;
  display: flex;

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
    <div className=${container} data-control='float' data-key=${key} data-value=${item.value}>
      <div className=${slider} data-slider>
        <div className=${nameContainer}>${key}</div>
        <div className=${valueContainer}>${item.value.toFixed(2)}</div>
      </div>
    </div>
  `
}
