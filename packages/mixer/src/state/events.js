import { fromEvents } from 'kefir'

const streams = {}

const events = [
  'mousedown',
  'mouseup',
  'mousemove',
  'click',
  'dragover',
  'dragleave',
  'drop'
]

events.forEach(event => {
  streams[event] = fromEvents(document.body, event)
})

export default streams
