export default {
  params: {
    speed: 0.5
  },

  handler: canvas => {
    const context = canvas.getContext('2d')

    let t = 0

    return ({ speed }) => {
      t += speed * 0.1

      context.clearRect(0, 0, canvas.width, canvas.height)

      context.save()
      context.translate(canvas.width / 2, canvas.height / 2)

      const r = (Math.sin(t) + 1) * 100

      context.strokeStyle = 'white'
      context.beginPath()
      context.arc(0, 0, r, 0, Math.PI * 2)
      context.stroke()
      context.restore()
    }
  }
}
