import wires from '../wires'
import { css } from 'emotion'
import program from './program'
import channel from './channel'
import button from './button'
import controls from './controls'

const styles = {
  container: css`
    display: flex;
    min-height: 100vh;
    max-height: 100vh;
    border: 2px #aaa solid;
    box-sizing: border-box;
    -webkit-overflow-scrolling: touch;
  `,

  panel: css`
    flex: 1;
    display: flex;
    flex-direction: column;
    border-right: 2px #aaa solid;

    &:last-child {
      border-right: 0;
    }
  `,

  heading: css`
    flex: 0;
    padding: 0.75rem;
    border-bottom: 2px #aaa solid;
  `,

  content: css`
    flex: 1;
    overflow: auto;

    &:last-child {
      border-right: 0;
    }
  `
}

styles.programsPanel = css`
  ${styles.panel}
  flex: 0;
`

styles.masterPanel = css`
  ${styles.panel}
  flex: 0;
`

styles.channels = receiving => css`
  ${styles.content}

  ${receiving && `
    background: #222;
  `}
`

styles.player = css`
  ${styles.content}
  padding: 0.5rem;
`

export default function mixer ({ programs, channels, master }) {
  const { wire, next } = wires('mixer')

  return wire`
    <div className=${styles.container}>
      <div className=${styles.programsPanel}>
        <h1 className=${styles.heading}>
          Programs
        </h1>

        <div className=${styles.content}>
          ${Object.keys(programs).map(name => program({
            name,
            wires: next
          }))}
        </div>
      </div>

      <div className=${styles.panel}>
        <h1 className=${styles.heading}>
          Channels
        </h1>

        <div data-channels className=${styles.channels(channels.receiving)}>
          ${Object.keys(channels).map(key => channel({
            key,
            item: channels[key],
            wires: next
          }))}
        </div>
      </div>

      <div className=${styles.masterPanel} data-master>
        <h1 className=${styles.heading}>
          Master
        </h1>

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
            values: master.filters.values,
            mappings: master.filters.mappings,
            wires: next
          })}
        </div>
      </div>
    </div>
  `
}
