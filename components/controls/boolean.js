import css from '../../libraries/css.js'
import input from './input.js'

const container = css(`
  margin: 2px 0;
`)

const toggle = css(`
  position: relative;
  flex: auto;
  cursor: pointer;
  display: flex;
  padding: 0.1rem 0.2rem;

  :hover {
    color: white;
  }

  :active {
    color: gold;
  }
`)

const nameContainer = css(`
  flex: auto;
  margin-right: 0.75rem;
`)

const valueContainer = css(`
  flex: 0;
`)

const inputContainer = css(`
  width: 1px;
`)

export default function control ({ value, mapping, key, wires }) {
  const { wire, next } = wires('key')

  return wire`
    <tr className=${container} data-control='boolean' data-key=${key} data-value=${value}>
      <td className=${toggle} data-toggle>
        <div className=${nameContainer}>${key}</div>
        <div className=${valueContainer}>${value ? 'yes' : 'no'}</div>
      </td>

      <td className=${inputContainer}>
        ${input({ mapping, wires: next })}
      </td>
    </tr>
  `
}
