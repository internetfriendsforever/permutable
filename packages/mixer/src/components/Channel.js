import html from 'nanohtml'
import { css } from 'emotion'
import map from 'lodash/map'
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
  display: flex;
  align-items: center;
`

const controlsContainer = css`
  flex 2;
  padding: 0.75rem;
`

export default function channel ({ item }) {
  const { id } = item

  return html`
    <div id='channel-${item.id}' className=${container} data-channel data-id=${item.id}>
      <h2 className=${title}>
        ${item.title}
      </h2>

      <div className=${controlsContainer}>
        ${map(item.values, (item, key) => controls({ id: `control-${id}-${key}`, item, key }))}
      </div>

      <div className=${player}>
        ${item.canvas}
      </div>
    </div>
  `
}
