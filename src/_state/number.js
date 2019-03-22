import { merge, combine } from 'kefir'
import events from './events.js'
import midi from './midi.js'

const findNumber = element => element.closest(`[data-control=number]`)
const findSlider = element => element.closest(`[data-slider]`)
const target = event => event.target

const mouseElement = events.mousedown.map(target).map(findNumber).filter()

const mouseActive = merge([
  events.mousedown.map(target).filter(findSlider).map(() => true),
  events.mouseup.map(target).filter(findSlider).map(() => false),
  events.mousemove.map(event => event.buttons === 1).filter(value => !value)
]).skipDuplicates()

const mouseUpdates = combine([
  events.mousemove,
  mouseActive
], [
  mouseElement
], (event, active, element) => {
  if (active && element) {
    const slider = element.querySelector('[data-slider]')
    const rect = slider.getBoundingClientRect()
    const position = (event.clientX - Math.floor(rect.left)) / Math.floor(rect.width)
    const min = parseFloat(slider.getAttribute('data-min'), 10)
    const max = parseFloat(slider.getAttribute('data-max'), 10)
    const step = parseFloat(slider.getAttribute('data-step'), 10)
    const range = (max - min)
    const stepped = min + Math.floor((position * range) / step) * step
    const value = Math.max(min, Math.min(max, stepped))

    return {
      element,
      value
    }
  }

  return null
})
  .filter(value => value !== null)
  .skipDuplicates((a, b) => a.value === b.value)

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

export default merge([
  midiUpdates,
  mouseUpdates
])