export default {
  params: ['speed'],
  handler: (canvas, context) => {
    return time => {
      context.fillStyle = 'blue'
      context.fillRect(0, 0, canvas.width, canvas.height)

      context.save()
      context.translate(canvas.width / 2, canvas.height / 2)

      const r = (Math.sin(time / 1000) + 1) * 100

      context.fillStyle = 'yellow'
      context.beginPath()
      context.arc(0, 0, r, 0, Math.PI * 2)
      context.fill()
      context.restore()
    }
  }
}
