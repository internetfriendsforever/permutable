import css from '@happycat/css'
import baseStyles from '../../styles.js'
import wires from '../../wires.js'
import button from '../../button.js'
import controls from '../../controls/components/index.js'
import program from './program.js'
import channel from './channel.js'

const styles = {
  container: css(baseStyles, `
    display: flex;
    min-height: 100vh;
    max-height: 100vh;
    border: 2px #aaa solid;
    box-sizing: border-box;
    -webkit-overflow-scrolling: touch;
  `),

  panel: css(`
    flex: 1;
    display: flex;
    flex-direction: column;
    border-right: 2px #aaa solid;

    &:last-child {
      border-right: 0;
    }
  `),

  heading: css(`
    flex: 0;
    padding: 0.75rem;
    border-bottom: 2px #aaa solid;
    font-size: 1em;
    font-weight: normal;
    margin: 0;
  `),

  content: css(`
    flex: 1;
    overflow: auto;

    &:last-child {
      border-right: 0;
    }
  `)
}

Object.assign(styles, {
  programs: css(styles.panel, `
    flex: 0;
  `),

  master: css(styles.panel, `
    flex: 0;
  `),

  player: css(styles.panel, `
    padding: 0.5rem;
  `)
})

export default function mix ({ programs, channels, master }) {
  const { wire, next } = wires('mix')

  return wire`
    <div className=${styles.container}>
      <div className=${styles.programs}>
        <h2 className=${styles.heading}>
          Programs
        </h2>

        <div className=${styles.content}>
          ${programs.map(({ name }) => program({
            name: name || 'no name',
            wires: next
          }))}
        </div>
      </div>

      <div className=${styles.panel}>
        <h2 className=${styles.heading}>
          Channels
        </h2>

        <div data-channels className=${styles.content}>
          ${Object.keys(channels).map(key => channel({
            key,
            channels: channels,
            item: channels[key],
            wires: next
          }))}
        </div>
      </div>

      <div data-master>
        <h2 className=${styles.heading}>
          Master
        </h2>

        <div className=${styles.player}>
          ${master.canvas}

          ${button({
            key: 'open-output',
            id: 'open-output',
            label: 'Open output window',
            wires: next
          })}

          ${controls({
            params: master.filters.params,
            mappings: master.filters.mappings,
            wires: next
          })}
        </div>
      </div>
    </div>
  `
}
