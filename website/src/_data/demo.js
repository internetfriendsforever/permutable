const version = require('./version')

const program = `{
  name: 'radial',

  params: {
    radius: { type: 'number', value: 3, max: 10 },
    count: { type: 'number', value: 120, min: 10, max: 500, step: 1 },
    turn: { type: 'number', value: 0.25 },
    scale: { type: 'number', value: 2, min: 0.2, max: 5 }
  },

  setup (canvas) {
    const context = canvas.getContext('2d')

    return function render ({ radius, count, turn, scale }) {
      context.fillStyle = 'black'
      context.fillRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < count; i++) {
        const x = canvas.width / 2 + Math.sin(i * turn) * i * scale
        const y = canvas.height / 2 + Math.cos(i * turn) * i * scale

        context.fillStyle = 'white'
        context.beginPath()
        context.arc(x, y, radius, 0, Math.PI * 2)
        context.fill()
      }
    }
  }
}`

const code = `<script type="module">
  import { run } from 'https://unpkg.com/permutable@${version}?module'

  run(${program.split('\n').join('\n  ')})
</script>`

module.exports = {
  program,
  code
}
