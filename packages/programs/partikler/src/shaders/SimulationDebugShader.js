import lightgl from '../../libs/lightgl'

const vertex = `
  varying vec2 coord;

  void main() {
    coord = gl_Vertex.xy;

    gl_Position = vec4(coord, 0.0, 1.0) + vec4(-0.5, -0.5, 0.0, -0.5);
  }
`

const fragment = `
  uniform sampler2D sampler;
  varying vec2 coord;

  void main() {
    gl_FragColor = texture2D(sampler, coord);
  }
`

export default function SimulationDebugShader() {
  return new lightgl.Shader(vertex, fragment)
}
