import events from '../events'

const inBoolean = event => event.target.closest('[data-control=boolean]')

export default events.click
  .map(inBoolean)
  .filter()
  .map(target => ({
    element: target,
    key: target.getAttribute('data-key'),
    value: !(target.getAttribute('data-value') === 'true')
  }))
