import { stream } from '/node_modules/kefir/dist/kefir.esm.js'

export default stream(emitter => {
  let frame = 0

  function tick () {
    emitter.value(frame++)
    window.requestAnimationFrame(tick)
  }

  tick()
})
