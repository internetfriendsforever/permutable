import { html } from 'lighterhtml'
import css from '@happycat/css'
import number from './number.js'
import boolean from './boolean.js'
import sampler from './sampler.js'

const styles = {
  container: css(`
    width: 100%;
    border-collapse: collapse;
    color: inherit;
  `)
}

export default function controls ({ key, params, mappings, channels }) {
  return html`
    <table className=${styles.container}>
      ${Object.keys(params).map(key => {
        const props = {
          key,
          ...params[key],
          mapping: mappings[key],
          channels: channels
        }

        switch (props.type) {
          case 'number':
            return number(props)
          case 'boolean':
            return boolean(props)
          case 'sampler':
            return sampler(props)
        }

        return null
      }).filter(v => v)}
    </table>
  `
}
