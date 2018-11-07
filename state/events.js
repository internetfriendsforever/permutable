import { fromEvents } from '../libraries/kefir.js'

const streams = {}

const events = [
  'mousedown',
  'mouseup',
  'mousemove',
  'click',
  'dragstart',
  'dragover',
  'dragleave',
  'drop',
  'keydown'
]

events.forEach(event => {
  streams[event] = fromEvents(document.body, event)
})

export default streams
