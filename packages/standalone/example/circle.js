export const params = {
  radius: {
    type: 'float',
    value: 0.5
  }
}

export function handler (canvas) {
  const context = canvas.getContext('2d')

  context.fillStyle = 'black'
  context.strokeStyle = 'white'

  return function update (params) {
    const x = canvas.width / 2
    const y = canvas.height / 2
    const radius = params.radius.value * 100

    context.fillRect(0, 0, canvas.width, canvas.height)
    context.beginPath()
    context.arc(x, y, radius, 0, Math.PI * 2)
    context.stroke()
  }
}
