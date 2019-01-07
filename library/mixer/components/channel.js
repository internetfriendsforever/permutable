import css from '../../css.js'
import button from '../../button.js'
import controls from '../../controls/components/index.js'

const styles = {
  container: css(`
    display: flex;
    border-bottom: 2px #aaa solid;
  `),

  title: css(`
    flex: 1;
    padding: 0.75rem;
  `),

  player: css(`
    flex 0;
    border: 0.5rem transparent solid;
  `),

  controls: css(`
    flex 2;
    padding: 0.75rem;
  `),

  remove: css(`
    flex: 0;
    padding: 0.75rem;
  `)

}

export default function channel ({ key, item, channels, wires }) {
  const { wire, next } = wires(key)

  return wire`
    <div className=${styles.container} data-channel data-id=${key}>
      <div className=${styles.title}>
        ${item.title}
      </div>

      <div className=${styles.controls}>
        ${controls({
          params: item.params,
          mappings: item.mappings,
          channels: channels,
          wires: next
        })}
      </div>

      <div className=${styles.player}>
        ${item.canvas}
      </div>

      <div data-remove title='Remove'>
        ${button({
          className: styles.remove,
          label: '×',
          wires: next
        })}
      </div>
    </div>
  `
}
