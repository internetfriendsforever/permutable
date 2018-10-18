import events from '../events'

const inBoolean = event => event.target.closest('[data-control=boolean]')
const inToggle = event => inBoolean(event) && event.target.closest(`[data-toggle]`)

export default events.click
  .filter(inToggle)
  .map(inBoolean)
  .map(target => ({
    element: target,
    key: target.getAttribute('data-key'),
    value: !(target.getAttribute('data-value') === 'true')
  }))
