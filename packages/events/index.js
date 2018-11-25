import { fromEvents } from './node_modules/kefir/dist/kefir.esm.js'

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
  'keydown',
  'change'
]

events.forEach(event => {
  streams[event] = fromEvents(document.body, event)
})

export default streams
