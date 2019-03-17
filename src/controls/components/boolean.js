import { html } from 'lighterhtml'
import css from '@happycat/css'
import input from './input.js'

const styles = {
  container: css(`
    border-top: 1px transparent solid;
  `),

  toggle: on => css(`
    position: relative;
    flex: auto;
    cursor: pointer;
    display: flex;
    padding: 0.15rem 0.4rem;

    :hover {
      color: white;
    }

    :active {
      color: gold;
    }

    ${on && `
      background: #333;
    `}
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

export default function boolean ({ value, mapping, key }) {
  return html`
    <tr className=${styles.container} data-control='boolean' data-key=${key} data-value=${value}>
      <td className=${styles.toggle(value)} data-toggle>
        <div className=${styles.name}>${key}</div>
        <div className=${styles.value}>${value ? 'yes' : 'no'}</div>
      </td>

      <td className=${styles.input}>
        ${input({
          mapping
        })}
      </td>
    </tr>
  `
}
