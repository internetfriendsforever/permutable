import css from '../node_modules/@happycat/css/esm.js'
import input from './input.js'

const styles = {
  container: css(`
    margin: 2px 0;
  `),

  slider: css(`
    position: relative;
    flex: auto;
    cursor: ew-resize;
    display: flex;
    padding: 0.1rem 0.2rem;

    :hover {
      color: white;
    }

    :active {
      color: gold;
    }
  `),

  indicator: css(`
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    background: #333;
  `),

  name: css(`
    position: relative;
    flex: auto;
    margin-right: 0.75rem;
  `),

  value: css(`
    position: relative;
    flex: 0;
  `),

  input: css(`
    width: 1px;
  `)
}

export default function float ({ value, mapping, key, wires }) {
  const { wire, next } = wires(key)
  const style = `width: ${value * 100}%`

  return wire`
    <tr className=${styles.container} data-control='float' data-key=${key} data-value=${value}>
      <td className=${styles.slider} data-slider>
        <div className=${styles.indicator} style=${style}></div>
        <div className=${styles.name}>${key}</div>
        <div className=${styles.value}>${value.toFixed(2)}</div>
      </td>

      <td className=${styles.input}>${input({ mapping, wires: next })}</td>
    </tr>
  `
}
