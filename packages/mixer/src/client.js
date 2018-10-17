import morph from 'nanomorph'
import mixer from './components/mixer'
import { ui, size, animation } from './state'

const root = document.getElementById('root')

ui.onValue(value => morph(root, mixer(value)))

size.onValue(({ width, height, channels, master }) => {
  channels.items.forEach(channel => {
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
  master.context.clearRect(0, 0, master.canvas.width, master.canvas.height)

  channels.items.forEach(channel => {
    const play = channel.values.play.value

    if (play) {
      const { handler, values } = channel
      handler(values)
    }

    master.context.globalAlpha = channel.values.mix.value
    master.context.drawImage(channel.canvas, 0, 0)
  })

  master.outputs.forEach(output => {
    if (!output.win.closed) {
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
