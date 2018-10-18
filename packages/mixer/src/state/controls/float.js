import { merge, combine } from 'kefir'
import events from '../events'

const inFloat = event => event.target.closest(`[data-control=float]`)
const inSlider = event => inFloat(event) && event.target.closest(`[data-slider]`)

const mouseTarget = events.mousedown.map(inFloat).filter()

const draggingActive = merge([
  events.mousedown.filter(inSlider).map(event => 1),
  events.mouseup.map(event => 0)
])

const draggingDelta = events.mousemove
  .map(event => event.clientX)
  .slidingWindow(2, 2)
  .map(([prev, next]) => next - prev)
  .toProperty(() => 0)
  .filter()

const draggingValue = combine(
  [draggingDelta],
  [draggingActive, mouseTarget],
  (delta, active, element) => {
    const prev = parseFloat(element.getAttribute('data-value'), 10)
    return active * Math.min(1, Math.max(0, prev + delta * 0.0025))
  }
).filter()

export default merge([
  combine({ value: draggingValue }, { element: mouseTarget })
])
