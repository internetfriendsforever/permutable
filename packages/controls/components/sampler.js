import css from '../../../libraries/css.js'

const styles = {
  container: css(`
    margin: 2px 0;
  `),

  select: css(`
    appearance: none;
    font: inherit;
    color: inherit;
    border: 0;
    background: 0;
    padding: 0.1rem 0.2rem;
    cursor: pointer;

    :hover {
      color: white;
    }

    :active {
      color: gold;
    }
  `),

  input: css(`
    width: 1px;
  `)
}

export default function sampler ({ value, mapping, key, channels, wires }) {
  const { wire, next } = wires(key)

  return wire`
    <tr className=${styles.container} data-control='sampler' data-key=${key}>
      <td>
        <select className=${styles.select}>
          <option value='' selected>
            Select ${key}...
          </option>

          ${Object.keys(channels).map(key => (
            next(key).wire`<option value=${key}>
              ${channels[key].title}
            </option>`
          ))}
        </select>
      </td>

      <td className=${styles.input}></td>
    </tr>
  `
}
