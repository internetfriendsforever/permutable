import { produce } from 'https://unpkg.com/immer@1.7.2/dist/immer.module.js'

const history = 1

const states = []

const events = new EventTarget()

function latest () {
  return states[states.length - 1]
}

function update (handler) {
  states.push(produce(latest(), handler))

  if (states.length > history) {
    states.shift()
  }

  events.dispatchEvent(new Event('change'))
}

function listen (handler) {
  events.addEventListener('change', () => handler(latest()))
}

export default {
  update,
  listen
}
