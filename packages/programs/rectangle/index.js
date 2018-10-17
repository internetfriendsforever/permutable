module.exports = {
  params: {
    speed: 0.5,
    size: 0.5
  },

  handler: canvas => {
    const context = canvas.getContext('2d')

    let t = 0

    return ({ speed, size }) => {
      t += speed

      context.clearRect(0, 0, canvas.width, canvas.height)

      context.save()
      context.translate(canvas.width / 2, canvas.height / 2)
      context.rotate(t / 10)

      const scaled = size * 200

      context.strokeStyle = 'white'
      context.strokeRect(-scaled, -scaled, scaled, scaled)
      context.restore()
    }
  }
}
