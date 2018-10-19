import createREGL from 'regl'

export default {
  params: {
    count: 1000 / 1000,
    instances: 1 / 80,
    scaleMin: 1 / 1,
    scaleMax: 1 / 2,
    phaseBase: 1 / 5,
    phaseInstance: 0 / 10,
    phaseMove: 0 / 0.2,
    dash: true,
    length: 0.5
  },

  handler
}

function handler (canvas) {
  const regl = createREGL({ canvas })
  const vertices = Array(1000).fill().map((v, i) => [i, 0, 0])

  const draw = regl({
    vert: `
      precision mediump float;
      attribute vec3 position;
      uniform float tick;
      uniform float phase;
      uniform float m;
      uniform float n;
      uniform float scale;
      varying float t;

      void main () {
        t = tick / 10.0 + position.x / 100.0;

        float x = sin(n * t);
        float y = sin(m * t + phase);

        vec2 pos = vec2(x, y) * scale;

        gl_PointSize = 2.0;
        gl_Position = vec4(pos, 0, 1);
      }
    `,

    frag: `
      precision mediump float;
      varying float t;
      uniform bool dash;
      uniform float length;

      void main () {
        float alpha = float(!dash) + smoothstep(0.5, 0.51, sin(t * length));
        gl_FragColor = vec4(vec3(1.0) * alpha, 1.0);
      }
    `,

    attributes: {
      position: vertices
    },

    uniforms: {
      tick: (context, props) => context.time * 10,
      phase: regl.prop('phase'),
      dash: regl.prop('dash'),
      length: regl.prop('length'),
      m: 4,
      n: 3,
      scale: regl.prop('scale')
    },

    count: regl.prop('count'),

    primitive: 'line strip'
  })

  let phaseStep = 0

  return params => {
    regl.poll()

    regl.clear({
      color: [0, 0, 0, 0]
    })

    const instances = 1 + Math.ceil(params.instances * 80)
    const count = Math.floor(params.count * 1000)

    const phaseBase = 1 + params.phaseBase * 5
    const phaseInstance = Math.pow(params.phaseInstance, 2) * 10
    const phaseMove = Math.pow(params.phaseMove * 0.2, 2)

    const scaleMin = params.scaleMin
    const scaleMax = params.scaleMax * 2

    const dash = params.dash
    const length = Math.ceil(Math.pow(params.length * 50, 2))

    Array(instances).fill().forEach((v, i) => {
      const phase = phaseBase + phaseStep + (i / instances) * phaseInstance
      const scale = (i / instances) * scaleMax + scaleMin

      draw({ count, phase, scale, dash, length })
    })

    phaseStep += phaseMove
  }
}
