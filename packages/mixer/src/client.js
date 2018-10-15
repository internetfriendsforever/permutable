import morph from 'nanomorph'
import mixer from './components/mixer'
import { ui, animation, size } from './state'

const root = document.getElementById('root')

ui.onValue(value => {
  morph(root, mixer(value))
})

size.onValue(({ width, height, channels }) => {
  channels.items.forEach(channel => {
    const { canvas } = channel
    canvas.width = width
    canvas.height = height
    canvas.style.width = `${width / 8}px`
  })
})

animation.onValue(({ width, height, channels }) => {
  channels.items.forEach(channel => {
    const play = channel.values.play.value

    if (play) {
      const { handler, values } = channel
      handler(values)
    }
  })
})

// Warn reload
// window.addEventListener('beforeunload', function (event) {
//   event.preventDefault()
//   event.returnValue = ''
// })
