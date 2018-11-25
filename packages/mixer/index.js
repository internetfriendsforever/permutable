import { bind } from '/node_modules/hyperhtml/esm.js'
import mixer from './components/mixer.js'
import { ui, size, animation } from './state/index.js'

const element = document.getElementById('mixer')

ui.onValue(value => {
  bind(element)`${mixer(value)}`
})

size.onValue(({ width, height, channels, master }) => {
  Object.values(channels).forEach(channel => {
    updateCanvasSize(channel.canvas, width, height)
    channel.canvas.style.width = `${width / 8}px`
  })

  updateCanvasSize(master.canvas, width, height)
  updateCanvasSize(master.buffer, width, height)

  master.canvas.style.width = `${width / 2}px`

  master.outputs.forEach(output => {
    if (!output.win.closed) {
      updateCanvasSize(output.canvas, width, height)
    }
  })
})

animation.onValue(({ width, height, channels, master }) => {
  master.context.globalCompositeOperation = 'screen'
  master.context.clearRect(0, 0, master.canvas.width, master.canvas.height)

  Object.values(channels).forEach(channel => {
    const { handler, params } = channel
    const { play, mix } = params

    if (play.value) {
      handler(params)
    }

    if (mix.value) {
      master.context.globalAlpha = mix.value
      master.context.drawImage(channel.canvas, 0, 0)
    }
  })

  const feedback = 0.5 * Math.log(master.filters.params.feedback.value) + 1
  master.context.drawImage(master.buffer, 0, 0)
  master.bufferContext.globalCompositeOperation = 'source-over'
  master.bufferContext.drawImage(master.canvas, 0, 0)
  master.bufferContext.globalCompositeOperation = 'multiply'
  master.bufferContext.fillStyle = `hsl(0, 0%, ${feedback * 100}%)`
  master.bufferContext.fillRect(0, 0, master.buffer.width, master.buffer.height)

  master.context.globalCompositeOperation = 'source-over'
  master.context.globalAlpha = 1 - master.filters.params.brightness.value
  master.context.fillStyle = 'black'
  master.context.fillRect(0, 0, master.canvas.width, master.canvas.height)

  master.outputs.forEach(output => {
    if (!output.win.closed) {
      output.context.clearRect(0, 0, master.canvas.width, master.canvas.height)
      output.context.drawImage(master.canvas, 0, 0)
    }
  })
})

function updateCanvasSize (canvas, width, height) {
  if (canvas.width !== width) canvas.width = width
  if (canvas.height !== height) canvas.height = height
}

// Warn reload
// window.addEventListener('beforeunload', function (event) {
//   event.preventDefault()
//   event.returnValue = ''
// })
