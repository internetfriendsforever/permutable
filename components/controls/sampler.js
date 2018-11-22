import css from '../../libraries/css.js'

const container = css(`
  margin: 2px 0;
`)

const select = css(`
  appearance: none;
  font: inherit;
  color: inherit;
  border: 0;
  background: 0;
  padding: 0.1rem 0.2rem;

  :hover {
    color: white;
  }

  :active {
    color: gold;
  }
`)

const inputContainer = css(`
  width: 1px;
`)

export default function control ({ value, mapping, key, channels, wires }) {
  const { wire } = wires('key')

  return wire`
    <tr className=${container} data-control='select' data-key=${key} data-value=${value}>
      <td>
        <select className=${select}>
          <option>Select ${key}...</option>
          ${Object.keys(channels).map(key => (
            `<option>${channels[key].title}</option>`
          ))}
        </select>
      </td>

      <td className=${inputContainer}></td>
    </tr>
  `
}
