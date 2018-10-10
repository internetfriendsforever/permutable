export default {
  params: ['speed'],
  handler: (canvas, context) => {
    return time => {
      context.fillStyle = 'yellow'
      context.fillRect(0, 0, canvas.width, canvas.height)

      context.save()
      context.translate(canvas.width / 2, canvas.height / 2)
      context.rotate(time / 1000)

      context.fillStyle = 'red'
      context.fillRect(-200, -200, 200, 200)
      context.restore()
    }
  }
}
