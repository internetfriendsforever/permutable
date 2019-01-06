import { fromEvents } from './kefir.js'

const streams = {}

const events = [
  'mousedown',
  'mouseup',
  'mousemove',
  'mouseleave',
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
