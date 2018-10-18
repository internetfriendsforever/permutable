import { css } from 'emotion'
import floatControl from './float'
import booleanControl from './boolean'

const container = css`
  width: 100%;
`

export default function control ({ key, params, values, mappings, wires }) {
  const { wire, next } = wires(key || 'controls')

  return wire`
    <table className=${container}>
      ${params.map(key => {
        const props = {
          key,
          value: values[key],
          mapping: mappings[key],
          wires: next
        }

        switch (typeof props.value) {
        case 'number':
          return floatControl(props)
        default:
          return booleanControl(props)
        }
      })}
    </table>
  `
}
