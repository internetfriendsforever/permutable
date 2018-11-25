import css from '../node_modules/@happycat/css/esm.js'
import input from './input.js'

const styles = {
  container: css(`
    margin: 2px 0;
  `),

  toggle: css(`
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
  `),

  name: css(`
    flex: auto;
    margin-right: 0.75rem;
  `),

  value: css(`
    flex: 0;
  `),

  input: css(`
    width: 1px;
  `)
}

export default function boolean ({ value, mapping, key, wires }) {
  const { wire, next } = wires('key')

  return wire`
    <tr className=${styles.container} data-control='boolean' data-key=${key} data-value=${value}>
      <td className=${styles.toggle} data-toggle>
        <div className=${styles.name}>${key}</div>
        <div className=${styles.value}>${value ? 'yes' : 'no'}</div>
      </td>

      <td className=${styles.input}>
        ${input({ mapping, wires: next })}
      </td>
    </tr>
  `
}
