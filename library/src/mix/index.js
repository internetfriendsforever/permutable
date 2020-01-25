import styles from '../styles.css'
import Program from '../Program'
import Params from '../params/Params'
import Channel from './Channel'
import defaultCompositor from './defaultCompositor'

export default (descriptions, options = {}) => {
  document.body.innerHTML = `
    <style scoped>
      ${styles}
    </style>

    <div class="permutable mix">
      <div class="programs panel"}>
        <div class="heading">
          <h2>Programs</h2>
        </div>

        <div class="content" data-programs></div>
      </div>

      <div class="channels panel">
        <div class="heading">
          <h2>Channels</h2>
        </div>

        <div class="content">
          <table data-channels></table>
        </div>
      </div>

      <div class="master panel">
        <div class="heading">
          <h2>Master</h2>
          <button data-open-output>
            Open output window
          </button>
        </div>

        <div class="canvas">
          <canvas data-canvas />
        </div>

        <table class="params" data-master-params></table>
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

  const masterParams = new Params(compositor.params)

  const programList = document.querySelector('[data-programs]')
  const channelList = document.querySelector('[data-channels]')
  const outputButton = document.querySelector('[data-open-output]')
  const masterParamsContainer = document.querySelector('[data-master-params]')

  masterParamsContainer.appendChild(masterParams.element)
  masterParamsContainer.addEventListener('change', queueRender)

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

    const button = document.createElement('button')

    button.classList.add(styles.programButton)
    button.innerText = description.name

    button.addEventListener('click', () => {
      const program = new Program(description, { autoRender: false })
      const channel = new Channel(program, compositor.channelParams)

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

    compose(channels, masterParams.values)

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
