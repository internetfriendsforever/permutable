import { bind } from 'hyperhtml'
import mixer from './components/mixer'
import { ui, size, animation } from './state'

const root = document.getElementById('root')

ui.onValue(value => {
  bind(root)`${mixer(value)}`
})

size.onValue(({ width, height, channels, master }) => {
  Object.values(channels.items).forEach(channel => {
    updateCanvasSize(channel.canvas, width, height)
    channel.canvas.style.width = `${width / 8}px`
  })

  updateCanvasSize(master.canvas, width, height)

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

  Object.values(channels.items).forEach(channel => {
    const { play, mix } = channel.values

    if (play) {
      const { handler, values } = channel
      handler(values)
    }

    if (mix) {
      master.context.globalAlpha = mix
      master.context.drawImage(channel.canvas, 0, 0)
    }
  })

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
