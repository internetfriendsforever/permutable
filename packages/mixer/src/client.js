import morph from 'nanomorph'
import mixer from './components/mixer'
import { ui, animation, size } from './state'

const root = document.getElementById('root')

ui.onValue(value => {
  morph(root, mixer(value))
})

size.onValue(({ width, height, channels, master }) => {
  channels.items.forEach(channel => {
    const { canvas } = channel
    canvas.width = width
    canvas.height = height
    canvas.style.width = `${width / 8}px`
  })

  master.canvas.width = width
  master.canvas.height = height
  master.canvas.style.width = `${width / 2}px`
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
})

// Warn reload
// window.addEventListener('beforeunload', function (event) {
//   event.preventDefault()
//   event.returnValue = ''
// })
