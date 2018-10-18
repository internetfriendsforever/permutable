import { css } from 'emotion'
import midi from './midi'

const container = css`
  display: flex;
  align-items: center;
  margin: 2px 0;
`

const toggle = css`
  position: relative;
  flex: auto;
  cursor: pointer;
  display: flex;
  padding: 0.1rem 0.2rem;

  :hover,
  :active {
    color: white;
  }
`

const nameContainer = css`
  flex: auto;
  margin-right: 0.75rem;
`

const valueContainer = css`
  flex: 0;
`

export default function control ({ value, mapping, key, wires }) {
  const { wire, next } = wires('key')

  return wire`
    <div className=${container} data-control='boolean' data-key=${key} data-value=${value}>
      <div className=${toggle} data-toggle>
        <div className=${nameContainer}>${key}</div>
        <div className=${valueContainer}>${value ? 'yes' : 'no'}</div>
      </div>

      ${midi({ mapping, wires: next })}
    </div>
  `
}
