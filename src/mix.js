// import { render, html } from 'lighterhtml'
// import { combine, constant } from 'kefir'
import css from '@happycat/css'
import baseStyles from './styles.js'
import createProgram from './program'
import createChannel from './channel'
import './elements/ButtonElement.js'
import './elements/allParams.js'
// import button from './components/button.js'
// import controls from './components/controls.js'
// import program from './components/program.js'
// import channel from './components/channel.js'
// import rafLimit from './state/rafLimit.js'
// import createFrameState from './state/frame.js'
// import createChannelsState from './state/channels.js'
// import createFiltersState from './state/filters.js'
// import createOutputsState from './state/outputs.js'

const styles = {
  container: css(`
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

  programs: css(`
    flex: 0;
  `),

  master: css(`
    flex: 0;
  `),

  canvas: css(`
    padding: 0.5rem;
  `),

  programButton: css(`
    width: 100%;
    padding: 0.8rem 0.8rem 0.6rem;
    border-bottom: 2px #aaa solid;
  `),

  heading: css(`
    flex: 0;
    padding: 0.8rem 0.8rem 0.6rem;
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
  `),

  channelsTable: css(`
    width: 100%;
    border-collapse: collapse;
  `)
}

export default (descriptions, options = {}) => {
  document.body.classList.add(baseStyles)
  document.body.innerHTML = `
    <div class=${styles.container}>
      <div class="${styles.panel} ${styles.programs}"}>
        <h2 class=${styles.heading}>
          Programs
        </h2>

        <div data-programs class=${styles.content}></div>
      </div>

      <div class=${styles.panel}>
        <h2 class=${styles.heading}>
          Channels
        </h2>

        <div class=${styles.content}>
          <table data-channels class=${styles.channelsTable}></table>
        </div>
      </div>

      <div class="${styles.panel} ${styles.master}">
        <h2 class=${styles.heading}>
          Master
        </h2>

        <div class=${styles.canvas}>
          <canvas data-canvas />
        </div>
      </div>
    </div>
  `

  const canvas = document.body.querySelector('[data-canvas]')
  const context = canvas.getContext('2d')

  canvas.width = options.width || 1280
  canvas.height = options.height || 720
  canvas.style.width = canvas.width / 2

  const channels = []
  const programList = document.querySelector('[data-programs]')
  const channelList = document.querySelector('[data-channels]')

  descriptions.forEach(description => {
    const button = document.createElement('button', { is: 'p-button' })

    button.classList.add(styles.programButton)
    button.innerText = description.name

    button.addEventListener('click', () => {
      const channel = createChannel(createProgram(description))

      channel.program.canvasElement.width = canvas.width
      channel.program.canvasElement.height = canvas.height
      channel.program.canvasElement.style.width = canvas.width / 8

      channels.push(channel)
      channelList.appendChild(channel.element)

      channel.element.addEventListener('render', queueRender)
      channel.element.addEventListener('remove', function onRemove () {
        channels.splice(channels.indexOf(channel), 1)
        channel.element.removeEventListener('render', queueRender)
        channel.element.removeEventListener('remove', onRemove)
        queueRender()
      })
    })

    programList.appendChild(button)
  })

  let renderRequest

  function render () {
    renderRequest = null

    context.fillRect(0, 0, canvas.width, canvas.height)

    channels.forEach(channel => {
      context.drawImage(channel.program.canvasElement, 0, 0)
    })
  }

  function queueRender () {
    if (!renderRequest) {
      renderRequest = window.requestAnimationFrame(render)
    }
  }

  // const container = document.createElement('div')
  //
  // document.body.appendChild(container)
  // document.body.style.background = 'black'
  // document.body.style.margin = 0
  //
  // const canvas = document.createElement('canvas')
  // const context = canvas.getContext('2d')
  //
  // const size = combine({
  //   width: constant(1280),
  //   height: constant(720)
  // })
  //
  // const channels = createChannelsState(programs)
  // const frame = createFrameState()
  // const filters = createFiltersState()
  // const outputs = createOutputsState()
  //
  // combine({
  //   size,
  //   channels,
  //   outputs
  // }).onValue(value => {
  //   const { width, height } = value.size
  //
  //   updateCanvasSize(canvas, width, height)
  //
  //   canvas.style.width = `${width / 2}px`
  //
  //   Object.values(value.channels).forEach(channel => {
  //     updateCanvasSize(channel.canvas, width, height)
  //     channel.canvas.style.width = `${width / 8}px`
  //   })
  //
  //   value.outputs.forEach(output => {
  //     if (!output.win.closed) {
  //       updateCanvasSize(output.canvas, width, height)
  //     }
  //   })
  // })
  //
  // channels.onValue(channels => {
  //   Object.values(channels).forEach(channel => {
  //     channel.render(channel.params)
  //   })
  // })
  //
  // rafLimit(
  //   combine({
  //     channels,
  //     filters,
  //     outputs
  //   }).skipDuplicates()
  // ).onValue(value => {
  //   context.clearRect(0, 0, canvas.width, canvas.height)
  //
  //   Object.values(value.channels).forEach(channel => {
  //     if (channel.params.mix.value) {
  //       context.globalAlpha = channel.params.mix.value
  //       context.drawImage(channel.canvas, 0, 0)
  //     }
  //   })
  //
  //   context.fillStyle = 'black'
  //   context.globalAlpha = 1 - value.filters.params.brightness.value
  //   context.fillRect(0, 0, canvas.width, canvas.height)
  //
  //   value.outputs.forEach(output => {
  //     if (!output.win.closed) {
  //       output.context.clearRect(0, 0, canvas.width, canvas.height)
  //       output.context.drawImage(canvas, 0, 0)
  //     }
  //   })
  // })
  //
  // rafLimit(
  //   combine({
  //     channels,
  //     filters
  //   })
  // ).onValue(value => {
  //   render(container, () => html`
  //     <div className=${styles.container}>
  //       <div className=${styles.programs}>
  //         <h2 className=${styles.heading}>
  //           Programs
  //         </h2>
  //
  //         <div className=${styles.content}>
  //           ${programs.map(({ name }) => program({
  //             name: name
  //           }))}
  //         </div>
  //       </div>
  //
  //       <div className=${styles.panel}>
  //         <h2 className=${styles.heading}>
  //           Channels
  //         </h2>
  //
  //         <div data-channels className=${styles.content}>
  //           ${Object.keys(value.channels).map(key => channel({
  //             key,
  //             channels: value.channels,
  //             item: value.channels[key]
  //           }))}
  //         </div>
  //       </div>
  //
  //       <div data-master>
  //         <h2 className=${styles.heading}>
  //           Master
  //         </h2>
  //
  //         <div className=${styles.player}>
  //           ${canvas}
  //
  //           ${button({
  //             key: 'open-output',
  //             id: 'open-output',
  //             label: 'Open output window'
  //           })}
  //
  //           ${controls({
  //             params: value.filters.params,
  //             mappings: value.filters.mappings
  //           })}
  //         </div>
  //       </div>
  //     </div>
  //   `)
  // })
}

function updateCanvasSize (canvas, width, height) {
  if (canvas.width !== width) {
    canvas.width = width
  }

  if (canvas.height !== height) {
    canvas.height = height
  }
}

// Warn reload
// window.addEventListener('beforeunload', function (event) {
//   event.preventDefault()
//   event.returnValue = ''
// })
