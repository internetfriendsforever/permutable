import { stream } from 'kefir'

export default () => stream(emitter => {
  let frame = 0

  function tick () {
    emitter.value(frame++)
    window.requestAnimationFrame(tick)
  }

  tick()
})