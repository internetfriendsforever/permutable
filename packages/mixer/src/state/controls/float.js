import { merge, combine } from 'kefir'
import events from '../events'
import midi from './midi'

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

const midiUpdates = midi
  .filter(input => findFloat(input.element))
  .map(input => {
    const updates = { ...input }

    updates.element = findFloat(input.element)

    if (updates.value) {
      if (input.type === 144) updates.value = 1
      if (input.type === 128) updates.value = 0
    }

    return updates
  })

const draggingUpdates = combine({ value: draggingValue }, { element: mouseElement })

export default merge([
  draggingUpdates,
  midiUpdates
])
