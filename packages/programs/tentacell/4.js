import SimplexNoise from 'simplex-noise'

const simplex = new SimplexNoise(Math.random)

export default {
  params: {
    speed: 0.3,
    noiseSize: 0.3,
    length: 0.5
  },

  handler: canvas => {
    const context = canvas.getContext('2d')

    const size = 180
    const tentacles = []

    function getPosition (col, row) {
      return {
        x: col * size,
        y: row * size
      }
    }

    let cols = 0
    let rows = 0
    let width = 0
    let height = 0
    let time = 0

    return values => {
      if (width !== canvas.width || height !== canvas.height || !tentacles.length) {
        width = canvas.width
        height = canvas.height

        cols = Math.ceil(width / size)
        rows = Math.ceil(height / size)

        tentacles.splice(0, tentacles.length)

        for (let col = 0; col < cols; col++) {
          for (let row = 0; row < rows; row++) {
            const count = Math.round(Math.random() * 10 + 2)

            tentacles.push(Array(count).fill().map(i => ({
              x: 0,
              y: 0,
              long: Math.random() * 50 + 10
            })))
          }
        }
      }

      const noiseSize = values.noiseSize * 70
      const length = values.length * 20

      time += values.speed * 5

      context.fillStyle = 'rgba(0, 0, 0, 0.5)'
      context.fillRect(0, 0, canvas.width, canvas.height)

      context.save()

      for (let col = 0; col < cols; col++) {
        for (let row = 0; row < rows; row++) {
          const tentacle = tentacles[row + col * rows]

          const angle = simplex.noise3D(col / noiseSize, row / noiseSize, time / 1000) * Math.PI * 2
          const angle2 = simplex.noise3D(col / noiseSize / 5, row / noiseSize / 5, time / 3000) * Math.PI * 2

          const start = getPosition(col, row)
          const end = {
            x: Math.cos(angle) * angle2 * length,
            y: Math.sin(angle) * angle2 * length
          }

          context.strokeStyle = `white`
          context.save()

          context.translate(start.x + (size / 2), start.y + size / 2)

          tentacle.forEach((current, i) => {
            const prev = tentacle[i - 1]

            if (!prev) {
              current.x = end.x
              current.y = end.y
            } else {
              const a = Math.atan2(current.y - prev.y, current.x - prev.x)

              current.x += ((prev.x + Math.cos(a) * current.long) - current.x) * 1
              current.y += ((prev.y + Math.sin(a) * current.long) - current.y) * 1
            }

            context.strokeRect(current.x, current.y, 3, 3)
          })

          context.beginPath()

          tentacle.forEach((segment, i) => {
            context[i === 0 ? 'moveTo' : 'lineTo'](segment.x, segment.y)
          })

          context.stroke()
          context.restore()
        }
      }

      context.restore()
    }
  }
}
