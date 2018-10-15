import { merge, combine } from 'kefir'
import events from '../events'

const inFloat = event => event.target.closest(`[data-control=float]`)
const inSlider = event => inFloat(event) && event.target.closest(`[data-slider]`)

const target = events.mousedown.map(inFloat)

const active = merge([
  events.mousedown.filter(inSlider).map(event => 1),
  events.mouseup.map(event => 0)
])

const x = events.mousemove.map(event => event.clientX)
const xx = x.slidingWindow(2, 2)

const delta = combine([active, xx], (active, [prev, next]) => (
  active * (next - prev)
)).filter()

const output = combine(
  [delta],
  [target],
  (delta, target) => ({
    element: target,
    attributes: target.attributes,
    value: parseFloat(target.getAttribute('data-value'), 10) + delta * 0.0025
  })
)

export default output
