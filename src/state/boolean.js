import { merge } from 'kefir'
import events from './events.js'
import midi from './midi.js'

const findBoolean = element => element.closest('[data-control=boolean]')
const findToggle = element => findBoolean(element) && element.closest(`[data-toggle]`)

const target = event => event.target

const getValue = element => element.getAttribute('data-value') === 'true'

const toggleUpdates = events.click
  .map(target)
  .filter(findToggle)
  .map(findBoolean)
  .map(element => ({
    element: element,
    value: !getValue(element)
  }))

const midiUpdates = midi
  .filter(input => findBoolean(input.element))
  .map(input => {
    const updates = { ...input }

    updates.element = findBoolean(input.element)

    if (input.value) {
      if (input.type === 144) {
        updates.value = !getValue(updates.element)
      } else if (input.type === 128) {
        delete updates.value
      } else {
        updates.value = input.value > 0.5
      }
    }

    return updates
  })

export default merge([
  toggleUpdates,
  midiUpdates
]).log()
