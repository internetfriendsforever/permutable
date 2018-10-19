import mat4 from 'gl-mat4'
import createREGL from 'regl'

export default {
  params: {
    speed: 0.1,
    distance: 0.6,
    fov: 0.5
  },

  handler: canvas => {
    const regl = createREGL({
      canvas
    })

    const cube = {
      vertices: [
        [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1], // Back
        [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1] // Front
      ],

      edges: [
        [0, 1], [1, 2], [2, 3], [3, 0], // Back
        [4, 5], [5, 6], [6, 7], [7, 4], // Front
        [0, 4], [1, 5], [2, 6], [3, 7] // Sides
      ]
    }

    const resolution = 12
    const count = resolution - 1

    const strings = []

    Array(resolution).fill().forEach((v, a) => {
      Array(resolution).fill().forEach((v, b) => {
        const [ax, ay, az] = [a / count * 2 - 1, -1, b / count * 2 - 1]
        const [bx, by, bz] = [-1, b / count * 2 - 1, a / count * 2 - 1]
        strings.push([ax, ay, az])
        strings.push([bx, by, bz])
      })
    })

    Array(resolution).fill().forEach((v, a) => {
      Array(resolution).fill().forEach((v, b) => {
        const [ax, ay, az] = [-1 + a / count * 2, 1, -1 + b / count * 2]
        const [bx, by, bz] = [1, -1 + b / count * 2, -1 + a / count * 2]
        strings.push([ax, ay, az])
        strings.push([bx, by, bz])
      })
    })

    const lines = regl({
      vert: `
        precision mediump float;
        attribute vec3 position;
        uniform mat4 projection, view;

        void main() {
          gl_Position = projection * view * vec4(position, 1);
      }`,

      frag: `
        precision mediump float;

        void main() {
          gl_FragColor = vec4(1.0);
      }`,

      attributes: {
        position: regl.prop('position')
      },

      uniforms: {
        view: (context, props) => {
          const t = props.time / 1500
          const r = t
          const distance = props.distance
          const eye = [Math.sin(r) * distance, 0, Math.cos(r) * distance]
          const center = [0, 0, 0]
          const up = [0, 1, 0]
          return mat4.lookAt([], eye, center, up)
        },

        projection: ({viewportWidth, viewportHeight}, props) => {
          return mat4.perspective([], Math.PI / props.fov, viewportWidth / viewportHeight, 0.1, 20)
        }
      },

      count: regl.prop('count'),

      primitive: 'line strip'
    })

    let time = 0

    return values => {
      regl.poll()

      regl.clear({
        color: [0, 0, 0, 1]
      })

      time += values.speed * 10

      const props = {
        time,
        fov: values.fov * 10 + 1,
        distance: values.distance * 10
      }

      lines([{
        position: cube.vertices,
        count: cube.vertices.length,
        ...props
      }, {
        position: strings,
        count: strings.length,
        ...props
      }])
    }
  }
}
