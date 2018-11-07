import controls from './controls/index.js'

export default controls
  .filter(({ element }) => element.closest('[data-master]'))
  .scan((controls, updates) => {
    const key = updates.element.getAttribute('data-key')

    if (updates.value) {
      controls.values[key] = updates.value
    }

    if (updates.mapping) {
      controls.mappings[key] = updates.mapping
    }

    return controls
  }, {
    params: [
      'feedback',
      'brightness'
    ],
    values: {
      feedback: 0,
      brightness: 1
    },
    mappings: {}
  })
