import { constant, combine } from '../node_modules/kefir/dist/kefir.esm.js'
import events from '../node_modules/@permutable/events/index.js'
// import items from '../channels/items.js'

const items = constant({})

const findSampler = element => element.closest('[data-control=sampler]')

const target = event => event.target

const changes = combine([
  events.change
    .map(target)
    .filter(findSampler)
    .map(findSampler)
    .map(element => ({
      element: element,
      key: element.getAttribute('data-key'),
      channel: element.querySelector('select').value
    }))
], [items], (change, items) => {
  return {
    element: change.element,
    key: change.key,
    value: change.channel ? items[change.channel].canvas : null
  }
})

export default changes
