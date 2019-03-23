import css from '@happycat/css'
import baseStyles from './styles.js'
import createProgram from './program'
import createChannel from './channel'
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
    flex: 0;
    padding: 0.8rem;
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
    if (!description.params) {
      description.params = {}
    }

    const button = document.createElement('button', { is: 'p-button' })

    button.classList.add(styles.programButton)
    button.innerText = description.name

    button.addEventListener('click', () => {
      const program = createProgram(description)
      const channel = createChannel(program)

      program.canvasElement.width = canvas.width
      program.canvasElement.height = canvas.height
      program.canvasElement.style.width = canvas.width / 8

      channels.push(channel)
      channelList.appendChild(channel.element)

      channel.element.addEventListener('change', queueRender)
      channel.element.addEventListener('remove', function onRemove () {
        channels.splice(channels.indexOf(channel), 1)
        channel.element.removeEventListener('change', queueRender)
        channel.element.removeEventListener('remove', onRemove)
        queueRender()
      })
    })

    programList.appendChild(button)
  })

  let renderRequest

  function render () {
    renderRequest = null

    context.globalAlpha = 1
    context.fillRect(0, 0, canvas.width, canvas.height)

    channels.forEach(channel => {
      context.globalAlpha = channel.params.values.mix
      context.drawImage(channel.program.canvasElement, 0, 0)
    })
  }

  function queueRender () {
    if (!renderRequest) {
      renderRequest = window.requestAnimationFrame(render)
    }
  }
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
