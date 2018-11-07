import css from '../../libraries/css.js'
import floatControl from './float.js'
import booleanControl from './boolean.js'

const container = css(`
  width: 100%;
  margin: calc(-0.1rem - 2px) -0.2rem;
`)

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
