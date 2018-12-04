import changes from './changes.js'

export default (initial = {}) => changes
  .scan((all, change) => {
    const key = change.element.getAttribute('data-key')
    const type = change.element.getAttribute('data-control')

    return {
      ...all,
      [key]: {
        type: type,
        value: change.value
      }
    }
  }, initial)
