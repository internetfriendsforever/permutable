import css from '../libraries/css.js'
import button from './button.js'
import controls from './controls/index.js'

const container = css(`
  display: flex;
  border-bottom: 2px #aaa solid;
`)

const title = css(`
  flex: 1;
  padding: 0.75rem;
`)

const player = css(`
  flex 0;
  border: 0.5rem transparent solid;
`)

const controlsContainer = css(`
  flex 2;
  padding: 0.75rem;
`)

const remove = css(`
  flex: 0;
  padding: 0.75rem;
`)

export default function channel ({ key, item, wires }) {
  const { wire, next } = wires(key)

  return wire`
    <div className=${container} data-channel data-id=${key}>
      <div className=${title}>
        ${item.title}
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

      <div data-remove title='Remove'>
        ${button({
          className: remove,
          label: '×',
          wires: next
        })}
      </div>
    </div>
  `
}
