import { stream } from 'kefir'

export default stream(emitter => {
  navigator.requestMIDIAccess().then(access => {
    for (const input of access.inputs.values()) {
      input.addEventListener('midimessage', event => {
        const [type, port, rawValue] = event.data
        const value = rawValue / 127
        emitter.value({ type, port, value, input })
      })
    }
  })
})
