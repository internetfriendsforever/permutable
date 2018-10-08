import { bind } from './libraries/hyperhtml.js'
import throttle from './libraries/rafThrottle.js'
import state from './state.js'
import css from './css.js'
import list from './sortable/list.js'
import item from './sortable/item.js'

const panels = css`
  display: flex;
`

const panel = css`

`

state.listen(throttle((state, update) => {
  bind(document.body)`
    <main className=${panels}>
      <section className=${panel}>
        <h2>Library</h2>
        ${list(
          state.library.map(app => item({
            item: app,
            children: app.label
          }))
        )}
      </section>

      <section className=${panel}>
        <h2>Channels</h2>
        ${list(
          state.channels.map(channel => item({
            item: channel,
            children: channel.label
          }))
        )}
      </section>

      <section className=${panel}>
        <h2>Output</h2>
      </section>
    </main>
  `
}))

state.update(() => ({
  library: [
    { label: 'One' },
    { label: 'Two' }
  ],

  channels: [
    { label: 'One' },
    { label: 'Two' }
  ],

  sorting: null
}))
