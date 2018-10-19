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

    const resolution = 512

    const createFramebuffer = () => regl.framebuffer({
      color: regl.texture({
        radius: resolution,
        type: 'float',
        wrapS: 'mirror',
        wrapT: 'mirror'
      }),
      depthStencil: false
    })

    const simulationBuffers = Array(2).fill().map(() => createFramebuffer())
    const environmentBuffer = createFramebuffer()

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

    const currentSimulationBuffer = ({ tick }) => simulationBuffers[tick % 2]
    const previousSimulationBuffer = ({ tick }) => simulationBuffers[1 - tick % 2]

    const environment = regl({
      frag: require('./shaders/environment.frag'),
      framebuffer: environmentBuffer,
      uniforms: {
        resolution: resolution,
        time: ({ time }) => time
      }
    })

    const simulate = regl({
      frag: require('./shaders/simulate.frag'),
      framebuffer: currentSimulationBuffer,
      uniforms: {
        resolution: resolution,
        state: previousSimulationBuffer,
        time: ({ time }) => time,
        midiA: regl.prop('midiA'),
        midiB: regl.prop('midiB')
      }
    })

    const render = regl({
      frag: require('./shaders/render.frag'),
      uniforms: {
        resolution: resolution,
        environment: environmentBuffer,
        state: currentSimulationBuffer,
        time: ({ time }) => time
      }
    })

    quad(() => {
      environment()
    })

    return values => {
      regl.poll()

      regl.clear({
        color: [0, 0, 0, 1],
        depth: 1
      })

      quad(() => {
        simulate({
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

        render()
      })
    }
  }
}
