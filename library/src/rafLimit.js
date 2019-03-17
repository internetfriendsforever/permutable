export default stream => {
  let value
  let frame

  return stream.withHandler((emitter, event) => {
    if (event.type === 'end') {
      emitter.end()
    }

    if (event.type === 'value') {
      value = event.value

      if (!frame) {
        frame = window.requestAnimationFrame(() => {
          frame = null
          emitter.emit(value)
        })
      }
    }
  })
}
