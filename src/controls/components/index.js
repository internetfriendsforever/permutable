import css from '../../css.js'
import numberControl from './number.js'
import booleanControl from './boolean.js'
import samplerControl from './sampler.js'

const styles = {
  container: css(`
    width: 100%;
    border-collapse: collapse;
    color: inherit;
  `)
}

export default function control ({ key, params, mappings, channels, wires }) {
  const { wire, next } = wires(key || 'controls')

  return wire`
    <table className=${styles.container}>
      ${Object.keys(params).map(key => {
        const props = {
          key,
          ...params[key],
          mapping: mappings[key],
          channels: channels,
          wires: next
        }

        switch (props.type) {
          case 'number':
            return numberControl(props)
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