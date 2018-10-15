export default {
  params: {
    speed: { value: 0.5 },
    size: { value: 0.5 }
  },

  handler: (canvas, context) => {
    let t = 0

    return ({ speed, size }) => {
      t += speed.value

      context.fillStyle = 'yellow'
      context.fillRect(0, 0, canvas.width, canvas.height)

      context.save()
      context.translate(canvas.width / 2, canvas.height / 2)
      context.rotate(t / 10)

      const scaled = size.value * 200

      context.fillStyle = 'red'
      context.fillRect(-scaled, -scaled, scaled, scaled)
      context.restore()
    }
  }
}
