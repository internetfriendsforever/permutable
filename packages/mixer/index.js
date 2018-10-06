import { bind, wire } from 'https://unpkg.com/hyperhtml@2.14.0/esm/index.js'
import throttle from 'https://unpkg.com/raf-throttle@2.0.3/rafThrottle.js'
import state from './state.js'

const count = change => state => {
  state.count += change
}

state.listen(throttle(values => {
  bind(document.body)`
    <h1>Count ${values.count}</h1>
    <button onclick=${() => state.update(count(-3))}>-3</button>
    <button onclick=${() => state.update(count(-2))}>-2</button>
    <button onclick=${() => state.update(count(1))}>+1</button>
    <button onclick=${() => state.update(count(7))}>+7</button>
  `
}))

state.update(() => ({
  count: 0
}))
