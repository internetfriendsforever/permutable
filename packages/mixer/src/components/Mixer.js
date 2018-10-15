import { css } from 'emotion'
import wires from '../wires'
import program from './program'
import channel from './channel'

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

styles.channels = receiving => `${styles.content} ${css`
  ${receiving && `
    background: #222;
  `}
`}`

export default function mixer ({ programs, channels, master }) {
  const { wire, next } = wires('mixer')

  return wire`
    <div className=${styles.container}>
      <div className=${styles.programsPanel}>
        <h1 className=${styles.heading}>
          Programs
        </h1>

        <div className=${styles.content}>
          ${Object.keys(programs).map(name => program({ name, wires: next }))}
        </div>
      </div>

      <div className=${styles.panel}>
        <h1 className=${styles.heading}>
          Channels
        </h1>

        <div data-channels className=${styles.channels(channels.receiving)}>
          ${channels.items.map(item => channel({ item, wires: next }))}
        </div>
      </div>

      <div className=${styles.masterPanel}>
        <h1 className=${styles.heading}>
          Master
        </h1>

        <div className=${styles.content}>

        </div>
      </div>
    </div>
  `
}
