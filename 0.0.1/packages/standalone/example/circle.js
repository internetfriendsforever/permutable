export const context = '2d'

export const params = {
  radius: {
    type: 'number',
    min: 50,
    max: 200,
    step: 10,
    value: 100
  },

  hue: {
    type: 'number',
    value: 0
  }
}

export function render (canvas, context, params) {
  const { width, height } = canvas

  context.fillStyle = `hsl(${params.hue.value * 360}, 50%, 50%)`
  context.fillRect(0, 0, width, height)

  const x = width / 2
  const y = height / 2
  const radius = params.radius.value

  context.fillStyle = 'black'
  context.beginPath()
  context.arc(x, y, radius, 0, Math.PI * 2)
  context.fill()
}