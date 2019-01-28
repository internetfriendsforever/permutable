import css from '../../css.js'
import input from './input.js'

const styles = {
  container: css(`
  `),

  slider: css(`
    position: relative;
    flex: auto;
    cursor: ew-resize;
    display: flex;
    padding: 0.4rem 0.5rem;

    :hover {
      color: white;
    }

    // :active {
    //   color: gold;
    // }
  `),

  indicator: css(`
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    background: gold;
    border-left: 1px solid gold;
    mix-blend-mode: difference;
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

export default function number ({ min = 0, max = 1, step = 0.01, value, mapping, key, wires }) {
  const { wire, next } = wires(key)

  const range = max - min
  const percent = ((value - min) / range) * 100
  const indicatorStyle = `width: ${percent}%`

  const decimals = (step.toString().split('.')[1] || '').length
  const displayValue = value.toFixed(decimals)
  const maxDigits = max.toString().length + (decimals ? decimals + 1 : 0)
  const valueStyle = `width: ${maxDigits}em`

  return wire`
    <tr className=${styles.container} data-control='number' data-key=${key}>
      <td className=${styles.slider} data-slider data-min=${min} data-max=${max} data-step=${step}>
        <div className=${styles.indicator} style=${indicatorStyle}></div>
        <div className=${styles.name}>${key}</div>
        <div className=${styles.value} style=${valueStyle}>${displayValue}</div>
        <div className=${styles.indicator} style=${indicatorStyle}></div>
      </td>

      <td className=${styles.input}>
        ${input({ mapping, wires: next })}
      </td>
    </tr>
  `
}
