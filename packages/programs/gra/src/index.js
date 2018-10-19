import createREGL from 'regl'

export default {
  params: {
    verticalBar: 0,
    verticalPoint: 0,
    horizontalBars: 0,
    floatingPoint: 0,
    distortDirection: 0,
    distortAmount: 0,
    feedback: 0
  },
  handler: canvas => {
    const regl = createREGL({
      extensions: ['OES_texture_float'],
      canvas
    })

    const createFramebuffer = (width, height) => regl.framebuffer({
      color: regl.texture({
        width,
        height,
        type: 'float'
      }),
      depthStencil: false
    })

    const states = []
    const environmentBuffer = createFramebuffer(1000, 1000)

    const quad = regl({
      vert: require('./shaders/quad.vert'),

      attributes: {
        position: [
          0, 0,
          0, 1,
          1, 0,
          1, 1
        ]
      },

      elements: [
        [0, 1, 2],
        [1, 2, 3]
      ]
    })

    const currentSimulationBuffer = ({ tick }) => states[tick % 2]
    const previousSimulationBuffer = ({ tick }) => states[1 - tick % 2]

    const environment = regl({
      frag: require('./shaders/environment.frag'),
      framebuffer: environmentBuffer
    })

    const simulate = regl({
      frag: require('./shaders/simulate.frag'),
      framebuffer: currentSimulationBuffer,
      uniforms: {
        resolution: regl.prop('resolution'),
        state: previousSimulationBuffer,
        time: ({ time }) => time,
        midiA: regl.prop('midiA'),
        midiB: regl.prop('midiB')
      }
    })

    const render = regl({
      frag: require('./shaders/render.frag'),
      uniforms: {
        resolution: regl.prop('resolution'),
        environment: environmentBuffer,
        state: currentSimulationBuffer,
        time: ({ time }) => time
      }
    })

    quad(() => {
      environment()
    })

    let width = 0
    let height = 0

    return values => {
      if (width !== canvas.width || height !== canvas.height || states.length < 2) {
        width = canvas.width
        height = canvas.height

        states.splice(0, states.length, ...(
          Array(2).fill().map(() => createFramebuffer(width, height))
        ))
      }

      regl.poll()

      regl.clear({
        color: [0, 0, 0, 1],
        depth: 1
      })

      const resolution = [width, height]

      quad(() => {
        simulate({
          resolution,
          midiA: [
            values.verticalBar,
            values.verticalPoint,
            values.horizontalBars,
            values.floatingPoint
          ],
          midiB: [
            values.distortDirection,
            values.distortAmount,
            values.feedback,
            0
          ]
        })

        render({
          resolution
        })
      })
    }
  }
}
