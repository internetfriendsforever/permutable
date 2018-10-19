import { css } from 'emotion'
import button from './button'
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

export default function channel ({ key, item, wires }) {
  const { wire, next } = wires(key)

  return wire`
    <div className=${container} data-channel data-id=${key}>
      <div className=${title}>
        ${item.title}
        <div data-remove title='Remove'>
          ${button({
            label: '×',
            wires: next
          })}
        </div>
      </div>

      <div className=${controlsContainer}>
        ${controls({
          params: item.params,
          values: item.values,
          mappings: item.mappings,
          wires: next
        })}
      </div>

      <div className=${player}>
        ${item.canvas}
      </div>
    </div>
  `
}
