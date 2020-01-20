import css from '@happycat/css'
import baseStyles from './styles.js'
import createProgram from './program'
import createChannel from './channel'
import createParams from './params'
import defaultCompositor from './compositor'
import './elements/ButtonElement.js'
import './elements/allParams.js'

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
    padding: 0.35rem;
  `),

  programButton: css(`
    width: 100%;
    padding: 0.8rem;
    border-bottom: 2px #aaa solid;
  `),

  heading: css(`
    flex-grow: 0;
    display: flex;
    border-bottom: 2px #aaa solid;

    h2 {
      flex: auto;
      font-size: 1em;
      font-weight: normal;
      padding: 0.8rem;
      margin: 0;
    }

    button {
      padding: 0 1rem;
      border-left: 2px #aaa solid;
    }
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
  `),

  params: css(`
    border-collapse: collapse;
    margin: 0 0.35rem;
  `)
}

export default (descriptions, options = {}) => {
  document.body.classList.add(baseStyles)

  document.body.innerHTML = `
    <div class=${styles.container}>
      <div class="${styles.panel} ${styles.programs}"}>
        <div class=${styles.heading}>
          <h2>Programs</h2>
        </div>

        <div data-programs class=${styles.content}></div>
      </div>

      <div class=${styles.panel}>
        <div class=${styles.heading}>
          <h2>Channels</h2>
        </div>

        <div class=${styles.content}>
          <table data-channels class=${styles.channelsTable}></table>
        </div>
      </div>

      <div class="${styles.panel} ${styles.master}">
        <div class=${styles.heading}>
          <h2>Master</h2>

          <button data-open-output is='p-button'>
            Open output window
          </button>
        </div>

        <div class=${styles.canvas}>
          <canvas data-canvas />
        </div>

        <table data-params class=${styles.params}></table>
      </div>
    </div>
  `

  const canvas = document.body.querySelector('[data-canvas]')

  const compositor = options.compositor || defaultCompositor
  const compose = compositor.setup(canvas)

  canvas.width = options.width || 1280
  canvas.height = options.height || 720

  const { width, height } = canvas

  const channels = []
  const outputs = []

  const params = createParams(compositor.params)

  const programList = document.querySelector('[data-programs]')
  const channelList = document.querySelector('[data-channels]')
  const outputButton = document.querySelector('[data-open-output]')
  const paramsContainer = document.querySelector('[data-params]')

  paramsContainer.appendChild(params.element)
  paramsContainer.addEventListener('change', queueRender)

  outputButton.addEventListener('click', event => {
    const name = `Output ${outputs.length + 1}`
    const options = `location=0,width=${width},height=${height}`
    const win = window.open('', name, options)
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    const output = { canvas, context }

    canvas.width = width
    canvas.height = height
    canvas.style.width = '100vw'
    canvas.style.height = '100vh'

    const setup = () => {
      const { body } = win.document
      win.document.title = name
      body.style.margin = 0
      body.style.background = 'black'
      body.appendChild(canvas)
    }

    if ('document' in win) {
      setup()
    } else {
      win.addEventListener('load', () => setup)
    }

    win.addEventListener('beforeunload', () => {
      outputs.splice(outputs.indexOf(output), 1)
    })

    outputs.push(output)

    queueRender()
  })

  descriptions.forEach(description => {
    if (!description.params) {
      description.params = {}
    }

    const button = document.createElement('button', { is: 'p-button' })

    button.classList.add(styles.programButton)
    button.innerText = description.name

    button.addEventListener('click', () => {
      const program = createProgram(description, { autoRender: false })
      const channel = createChannel(program, compositor.channelParams)

      program.canvasElement.width = canvas.width
      program.canvasElement.height = canvas.height
      program.canvasElement.style.width = canvas.width / 8
      program.setup()

      channels.push(channel)
      channelList.appendChild(channel.element)

      channel.element.addEventListener('change', queueRender)
      channel.element.addEventListener('remove', function onRemove () {
        channels.splice(channels.indexOf(channel), 1)
        channel.element.removeEventListener('change', queueRender)
        channel.element.removeEventListener('remove', onRemove)
        queueRender()
      })

      queueLayout()
      queueRender()
    })

    programList.appendChild(button)
  })

  let renderRequest

  function render () {
    channels.forEach(channel => {
      if (channel.program.dirty) {
        channel.program.render()
      }
    })

    compose(channels, params.values)

    outputs.forEach(output => {
      output.context.drawImage(canvas, 0, 0)
    })

    renderRequest = null
  }

  function queueRender () {
    if (!renderRequest) {
      renderRequest = window.requestAnimationFrame(render)
    }
  }

  let layoutRequest

  function layout () {
    const targets = [{
      canvas: canvas,
      ratio: 3
    }, ...channels.map(channel => ({
      canvas: channel.program.canvasElement,
      ratio: 6
    }))]

    targets.forEach(target => {
      let displayWidth = target.canvas.width

      while (displayWidth > window.innerWidth / target.ratio) {
        displayWidth = displayWidth / 2
      }

      target.canvas.style.width = displayWidth
    })

    layoutRequest = null

    queueRender()
  }

  function queueLayout () {
    if (!layoutRequest) {
      layoutRequest = window.requestAnimationFrame(layout)
    }
  }

  queueLayout()

  window.addEventListener('resize', queueLayout)
}