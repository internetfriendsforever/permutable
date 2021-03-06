export const name = 'circle'

export const params = {
  radius: {
    type: 'number',
    min: 50,
    max: 200,
    step: 1,
    value: 100
  },

  hue: {
    type: 'number',
    value: 0
  }
}

export function setup (canvas) {
  const context = canvas.getContext('2d')

  return function render ({ hue, radius }) {
    const { width, height } = canvas

    context.fillStyle = `hsl(${hue * 360}, 50%, 50%)`
    context.fillRect(0, 0, width, height)

    const x = width / 2
    const y = height / 2

    context.fillStyle = 'black'
    context.beginPath()
    context.arc(x, y, radius, 0, Math.PI * 2)
    context.fill()
  }
}
