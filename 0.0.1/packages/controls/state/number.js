import { merge, combine } from '../../../libraries/kefir.js'
import events from '../../events/index.js'
import midi from './midi.js'

const findNumber = element => element.closest(`[data-control=number]`)
const findSlider = element => findNumber(element) && element.closest(`[data-slider]`)
const target = event => event.target

const mouseElement = events.mousedown.map(target).map(findNumber).filter()

// const draggingActive = merge([
//   events.mousedown.map(target).filter(findSlider).map(event => 1),
//   events.mouseup.map(event => 0)
// ])

// const draggingDelta = events.mousemove
//   .map(event => event.clientX)
//   .slidingWindow(2, 2)
//   .map(([prev, next]) => next - prev)
//   .toProperty(() => 0)
//   .filter()
//
// const draggingValue = combine(
//   [draggingDelta],
//   [draggingActive, mouseElement],
//   (delta, active, element) => {
//     const prev = parseFloat(element.getAttribute('data-value'), 10)
//     return active * Math.min(1, Math.max(0, prev + delta * 0.0025))
//   }
// ).filter()

const draggingActive = merge([
  events.mousedown.map(target).filter(findSlider).map(event => true),
  events.mouseup.map(event => false)
])

const midiUpdates = midi
  .filter(input => findNumber(input.element))
  .map(input => {
    const updates = { ...input }

    updates.element = findNumber(input.element)

    if (updates.value) {
      if (input.type === 144) updates.value = 1
      if (input.type === 128) updates.value = 0
    }

    return updates
  })

const mouseUpdates = combine([
  draggingActive,
  events.mousemove
], [
  mouseElement
], (active, event, element) => {
  if (active && element) {
    const slider = element.querySelector('[data-slider]')

    const rect = slider.getBoundingClientRect()
    const position = (event.clientX - Math.floor(rect.left)) / Math.floor(rect.width)

    return {
      element,
      position
    }
  }

  return null
})
  .filter(value => value !== null)

export default merge([
  midiUpdates,
  mouseUpdates
]).map(({ element, position }) => {
  const slider = element.querySelector('[data-slider]')
  const min = parseFloat(slider.getAttribute('data-min'), 10)
  const max = parseFloat(slider.getAttribute('data-max'), 10)
  const step = parseFloat(slider.getAttribute('data-step'), 10)
  const range = (max - min)
  const value = Math.min(max, min + Math.floor((position * range) / step) * step)

  return {
    element,
    min,
    max,
    step,
    value
  }
})
  .skipDuplicates((a, b) => a.value === b.value)
