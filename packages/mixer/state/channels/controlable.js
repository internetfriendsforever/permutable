import items from './items.js'
import changes from '/node_modules/@permutable/controls/state/changes.js'

export default changes
  .filter(({ element }) => element.closest('[data-channels]'))
  .toProperty(() => null)
  .combine(items, (control, items) => {
    if (control) {
      const { element, value, mapping } = control
      const channel = items[element.closest('[data-channel]').getAttribute('data-id')]
      const key = element.getAttribute('data-key')

      if (channel) {
        if (value !== undefined) {
          channel.params[key].value = value
        }

        if (mapping !== undefined) {
          channel.mappings[key] = mapping
        }
      }
    }

    return items
  })
  .toProperty(() => {})
