import { merge, combine } from 'kefir'
import events from '../events'
import input from './input'

const findFloat = element => element.closest(`[data-control=float]`)
const findSlider = element => findFloat(element) && element.closest(`[data-slider]`)
const target = event => event.target

const mouseElement = events.mousedown.map(target).map(findFloat).filter()

const draggingActive = merge([
  events.mousedown.map(target).filter(findSlider).map(event => 1),
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
  [draggingActive, mouseElement],
  (delta, active, element) => {
    const prev = parseFloat(element.getAttribute('data-value'), 10)
    return active * Math.min(1, Math.max(0, prev + delta * 0.0025))
  }
).filter()

const inputUpdates = input
  .filter(input => findFloat(input.element))
  .map(input => ({
    ...input,
    element: findFloat(input.element)
  }))

const draggingUpdates = combine({ value: draggingValue }, { element: mouseElement })

export default merge([
  draggingUpdates,
  inputUpdates
])
