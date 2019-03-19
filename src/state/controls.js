import changes from './controlChanges.js'

export default (initial = {}) => changes
  .scan((all, change) => {
    const key = change.element.getAttribute('data-key')
    const type = change.element.getAttribute('data-control')

    return {
      ...all,
      [key]: {
        ...all[key],
        type: type,
        ...change
      }
    }
  }, initial)
