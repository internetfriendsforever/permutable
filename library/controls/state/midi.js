import { stream, combine, merge } from '../../kefir.js'
import events from '../../events.js'

const midi = stream(emitter => {
  if ('requestMIDIAccess' in navigator) {
    navigator.requestMIDIAccess().then(access => {
      for (const input of access.inputs.values()) {
        input.addEventListener('midimessage', event => {
          const [type, port, rawValue] = event.data
          const value = rawValue / 127
          emitter.value({ type, port, value, input })
        })
      }
    })
  }
})

const findInput = event => event.target.closest('[data-input]')
const isPending = element => element.getAttribute('data-pending') === 'true'

const clicks = events.click.map(findInput).filter()

const pending = clicks.map(element => ({
  element,
  mapping: {
    id: element.getAttribute('data-id'),
    pending: !isPending(element)
  }
}))

const elements = merge([clicks]).scan((set, element) => set.add(element), new Set())

const backspace = events.keydown.filter(event => event.keyCode === 8)

const remove = combine([backspace], [elements], (event, elements) => {
  const updates = []

  for (const element of elements) {
    if (isPending(element)) {
      updates.push({
        element,
        mapping: {
          id: null,
          pending: false
        }
      })
    }
  }

  return updates
}).flatten()

const input = combine([midi], [elements], (midi, elements) => {
  const { input, type, port, value } = midi

  const id = `${input.name} #${port}`
  const updates = []

  for (const element of elements) {
    if (isPending(element)) {
      const pending = false
      const mapping = { id, pending, value }

      updates.push({
        element,
        mapping,
        type,
        value
      })
    }

    if (element.getAttribute('data-id') === id) {
      updates.push({
        element,
        type,
        value
      })
    }
  }

  return updates
}).flatten()

export default merge([
  pending,
  remove,
  input
])
