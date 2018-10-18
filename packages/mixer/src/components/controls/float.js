import { css } from 'emotion'
import input from './input'

const container = css`
  margin: 2px 0;
`

const slider = css`
  position: relative;
  flex: auto;
  cursor: ew-resize;
  display: flex;
  padding: 0.1rem 0.2rem;

  :hover,
  :active {
    color: white;
  }
`

const indicator = css`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  background: #333;
`

const nameContainer = css`
  position: relative;
  flex: auto;
  margin-right: 0.75rem;
`

const valueContainer = css`
  position: relative;
  flex: 0;
`

const inputContainer = css`
  width: 1px;
`

export default function control ({ value, mapping, key, wires }) {
  const { wire, next } = wires(key)
  const style = `width: ${value * 100}%`

  return wire`
    <tr className=${container} data-control='float' data-key=${key} data-value=${value}>
      <td className=${slider} data-slider>
        <div className=${indicator} style=${style}></div>
        <div className=${nameContainer}>${key}</div>
        <div className=${valueContainer}>${value.toFixed(2)}</div>
      </td>

      <td className=${inputContainer}>${input({ mapping, wires: next })}</td>
    </tr>
  `
}
