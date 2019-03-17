import changes from './controlChanges.js'

export default changes
  .filter(({ element }) => element.closest('[data-master]'))
  .scan((controls, updates) => {
    const key = updates.element.getAttribute('data-key')

    if (updates.value) {
      controls.params[key].value = updates.value
    }

    if (updates.mapping) {
      controls.mappings[key] = updates.mapping
    }

    return controls
  }, {
    params: {
      feedback: {
        type: 'number',
        value: 0
      },
      brightness: {
        type: 'number',
        value: 1
      }
    },
    mappings: {}
  })
