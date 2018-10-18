import { combine, merge } from 'kefir'
import events from '../events'
import midi from '../midi'

const findInput = event => event.target.closest('[data-input]')
const isPending = element => element.getAttribute('data-pending') === 'true'

const clicks = events.click.map(findInput).filter()

const pending = clicks.map(element => ({
  element,
  mapping: {
    pending: !isPending(element)
  }
}))

const elements = merge([clicks]).scan((set, element) => set.add(element), new Set())

const input = combine([midi], [elements], (midi, elements) => {
  const { input, port, value } = midi
  const id = `${input.id}-${port}`
  const updates = []

  for (const element of elements) {
    if (isPending(element)) {
      const pending = false
      const mapping = { id, pending, input, port, value }

      updates.push({
        element,
        mapping,
        value
      })
    }

    if (element.getAttribute('data-mapping-id') === id) {
      updates.push({
        element,
        value
      })
    }
  }

  return updates
}).flatten()

export default merge([
  pending,
  input
])
