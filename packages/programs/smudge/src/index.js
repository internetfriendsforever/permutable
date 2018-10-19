import createREGL from 'regl'
import frag from './update.frag'

export default {
  params: {
    horizontal: 0.5,
    vertical: 0.5,
    directionMix: 0.0,
    alpha: 0.5,
    life: 0.0,
    zoom: 0.03,
    timeScale: 0.2
  },

  handler: canvas => {
    const regl = createREGL({
      canvas
    })

    const states = []

    const update = regl({
      vert: `
        attribute vec2 position;
        varying vec2 uv;

        void main() {
          uv = position;
          gl_Position = vec4(position * 2.0 - 1.0, 0, 1);
        }
      `,

      frag,

      uniforms: {
        horizontal: regl.prop('horizontal'),
        vertical: regl.prop('vertical'),
        directionMix: regl.prop('directionMix'),
        alpha: regl.prop('alpha'),
        life: regl.prop('life'),
        zoom: regl.prop('zoom'),
        time: regl.prop('time'),
        dims: regl.prop('dims'),
        buffer: ({ tick }) => states[tick % 2]
      },

      attributes: {
        position: [
          [0, 0],
          [0, 1],
          [1, 1],
          [1, 0]
        ]
      },

      elements: [
        [0, 1, 2],
        [2, 3, 0]
      ],

      framebuffer: ({ tick }) => states[(tick + 1) % 2]
    })

    const image = regl({
      vert: `
        attribute vec2 position;
        varying vec2 uv;

        void main() {
          uv = position;
          gl_Position = vec4(position * 2.0 - 1.0, 0, 1);
        }
      `,

      frag: `
        precision mediump float;
        uniform sampler2D buffer;
        varying vec2 uv;

        void main() {
          float state = texture2D(buffer, uv).r;
          gl_FragColor = vec4(vec3(state), 1);
          // gl_FragColor = vec4(1.0, uv, 1);
        }
      `,

      attributes: {
        position: [
          [0, 0],
          [0, 1],
          [1, 1],
          [1, 0]
        ]
      },

      uniforms: {
        buffer: ({ tick }) => states[tick % 2]
      },

      depth: {
        enable: false
      },

      elements: [
        [0, 1, 2],
        [2, 3, 0]
      ]
    })

    let width = 0
    let height = 0
    let time = 0

    return values => {
      if (width !== canvas.width || height !== canvas.height || states.length < 2) {
        width = canvas.width
        height = canvas.height

        states.splice(0, states.length, ...Array(2).fill().map(() => regl.framebuffer({
          depthStencil: false,
          color: regl.texture({
            width: width,
            height: height
          })
        })))
      }

      time += Math.pow(values.timeScale, 2) * 0.05

      const dims = [canvas.width, canvas.height]

      regl.poll()

      image()
      update({
        ...values,
        time,
        dims
      })
    }
  }
}
