import { render, html } from 'lighterhtml'
import css from '@happycat/css'
import baseStyles from './styles.js'
import button from './components/button.js'
import controls from './components/controls.js'
import program from './components/program.js'
import channel from './components/channel.js'

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

export default programs => {
  const container = document.createElement('div')

  document.body.appendChild(container)
  document.body.style.background = 'black'
  document.body.style.margin = 0

  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')

  const buffer = document.createElement('canvas')
  const bufferContext = buffer.getContext('2d')

  const channels = []

  const master = {
    outputs: [],
    filters: {
      params: {},
      mappings: {}
    }
  }

  render(container, () => html`
    <div className=${styles.container}>
      <div className=${styles.programs}>
        <h2 className=${styles.heading}>
          Programs
        </h2>

        <div className=${styles.content}>
          ${programs.map(({ name }) => program({
            name: name || 'no name'
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
            item: channels[key]
          }))}
        </div>
      </div>

      <div data-master>
        <h2 className=${styles.heading}>
          Master
        </h2>

        <div className=${styles.player}>
          ${canvas}

          ${button({
            key: 'open-output',
            id: 'open-output',
            label: 'Open output window'
          })}

          ${controls({
            params: master.filters.params,
            mappings: master.filters.mappings
          })}
        </div>
      </div>
    </div>
  `)
}



// import { ui, size, animation } from './state/index.js'

// import { combine, constant } from 'kefir'
// import rafLimit from '../../rafLimit.js'
// import frame from '../../frame.js'
// import channels from './channels/controllable.js'
// import outputs from './outputs.js'
// import filters from './filters.js'
//
// const master = combine({
//   outputs,
//   filters
// }).toProperty()
//
// export const ui = rafLimit(combine({
//   channels,
//   master
// }))
//
// export const animation = combine({ frame }, {
//   channels,
//   master
// })
//
// const width = constant(1280)
// const height = constant(720)
//
// export const size = rafLimit(combine({
//   width,
//   height,
//   channels,
//   master
// }))


//
// const container = document.createElement('div')
//
// window.addEventListener('load', function () {
//   document.body.appendChild(container)
//   document.body.style.background = 'black'
//   document.body.style.margin = 0
// })
//
// ui.onValue(value => {
//   bind(container)`${mix(value)}`
// })
//
// size.onValue(({ width, height, channels, master }) => {
//   Object.values(channels).forEach(channel => {
//     updateCanvasSize(channel.canvas, width, height)
//     channel.canvas.style.width = `${width / 8}px`
//   })
//
//   updateCanvasSize(master.canvas, width, height)
//   updateCanvasSize(master.buffer, width, height)
//
//   master.canvas.style.width = `${width / 2}px`
//
//   master.outputs.forEach(output => {
//     if (!output.win.closed) {
//       updateCanvasSize(output.canvas, width, height)
//     }
//   })
// })
//
// animation.skipDuplicates().onValue(({ width, height, channels, master }) => {
//   master.context.globalCompositeOperation = 'screen'
//   master.context.clearRect(0, 0, master.canvas.width, master.canvas.height)
//
//   Object.values(channels).forEach(channel => {
//     const { handler, params } = channel
//     const { play, mix } = params
//
//     if (play.value) {
//       handler(params)
//     }
//
//     if (mix.value) {
//       master.context.globalAlpha = mix.value
//       master.context.drawImage(channel.canvas, 0, 0)
//     }
//   })
//
//   const feedback = 0.5 * Math.log(master.filters.params.feedback.value) + 1
//
//   master.context.drawImage(master.buffer, 0, 0)
//   master.bufferContext.globalCompositeOperation = 'source-over'
//   master.bufferContext.drawImage(master.canvas, 0, 0)
//   master.bufferContext.globalCompositeOperation = 'multiply'
//   master.bufferContext.fillStyle = `hsl(0, 0%, ${feedback * 100}%)`
//   master.bufferContext.fillRect(0, 0, master.buffer.width, master.buffer.height)
//
//   master.context.globalCompositeOperation = 'source-over'
//   master.context.globalAlpha = 1 - master.filters.params.brightness.value
//   master.context.fillStyle = 'black'
//   master.context.fillRect(0, 0, master.canvas.width, master.canvas.height)
//
//   master.outputs.forEach(output => {
//     if (!output.win.closed) {
//       output.context.clearRect(0, 0, master.canvas.width, master.canvas.height)
//       output.context.drawImage(master.canvas, 0, 0)
//     }
//   })
// })
//
// function updateCanvasSize (canvas, width, height) {
//   if (canvas.width !== width) canvas.width = width
//   if (canvas.height !== height) canvas.height = height
// }

// Warn reload
// window.addEventListener('beforeunload', function (event) {
//   event.preventDefault()
//   event.returnValue = ''
// })
