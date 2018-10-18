import html from 'nanohtml'
import { css } from 'emotion'
import controls from './controls'

const container = css`
  display: flex;
  border-bottom: 2px #aaa solid;
`

const title = css`
  flex: 1;
  padding: 0.75rem;
`

const player = css`
  flex 0;
  border: 0.5rem transparent solid;
`

const controlsContainer = css`
  flex 2;
  padding: 0.75rem;
`

export default function channel ({ key, item }) {
  return html`
    <div id='channel-${key}' className=${container} data-channel data-id=${key}>
      <h2 className=${title}>
        ${item.title}
      </h2>

      <div className=${controlsContainer}>
        ${item.params.map(paramKey => controls({
          id: `control-${key}-${paramKey}`,
          value: item.values[paramKey],
          mapping: item.mapping[paramKey],
          key: paramKey
        }))}
      </div>

      <div className=${player}>
        ${item.canvas}
      </div>
    </div>
  `
}
