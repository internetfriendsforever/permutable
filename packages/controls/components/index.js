import css from '../../../libraries/css.js'
import floatControl from './float.js'
import booleanControl from './boolean.js'
import samplerControl from './sampler.js'

const styles = {
  container: css(`
    width: 100%;
    margin: calc(-0.1rem - 2px) -0.2rem;
  `)
}

export default function control ({ key, params, mappings, channels, wires }) {
  const { wire, next } = wires(key || 'controls')

  return wire`
    <table className=${styles.container}>
      ${Object.keys(params).map(key => {
        const props = {
          key,
          type: params[key].type,
          value: params[key].value,
          mapping: mappings[key],
          channels: channels,
          wires: next
        }

        switch (props.type) {
          case 'float':
            return floatControl(props)
          case 'boolean':
            return booleanControl(props)
          case 'sampler':
            return samplerControl(props)
        }

        return null
      }).filter(v => v)}
    </table>
  `
}
