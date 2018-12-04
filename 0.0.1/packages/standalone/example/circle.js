export const params = {
  radius: {
    type: 'float',
    value: 0.5
  },

  hue: {
    type: 'float',
    value: 0
  }
}

export const context = '2d'

export function render (canvas, context, params) {
  const { width, height } = canvas

  context.fillStyle = `hsl(${params.hue.value * 360}, 50%, 50%)`
  context.fillRect(0, 0, width, height)

  const x = width / 2
  const y = height / 2
  const scale = Math.min(width, height) * 0.45
  const radius = params.radius.value * scale

  context.fillStyle = 'black'
  context.beginPath()
  context.arc(x, y, radius, 0, Math.PI * 2)
  context.fill()
}
