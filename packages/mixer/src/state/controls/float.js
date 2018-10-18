import { merge, combine } from 'kefir'
import events from '../events'
// import midiInput from '../midi'

const inFloat = event => event.target.closest(`[data-control=float]`)
const inSlider = event => inFloat(event) && event.target.closest(`[data-slider]`)
const inMidi = event => inFloat(event) && event.target.closest(`[data-midi]`)

const element = events.mousedown.map(inFloat).filter()

const mapping = events.click
  .map(inMidi).filter()
  .map(target => target.getAttribute('data-mapping') !== 'true')
  .toProperty(() => false)

const sliding = merge([
  events.mousedown.filter(inSlider).map(event => 1),
  events.mouseup.map(event => 0)
])

const delta = events.mousemove
  .map(event => event.clientX)
  .slidingWindow(2, 2)
  .map(([prev, next]) => next - prev)
  .toProperty(() => 0)
  .filter()

const value = combine([delta], [sliding, element], (delta, sliding, element) => {
  const prev = parseFloat(element.getAttribute('data-value'), 10)
  return sliding * Math.min(1, Math.max(0, prev + delta * 0.0025))
}).filter()

export default merge([
  combine({ mapping }, { element }),
  combine({ value }, { element })
])
