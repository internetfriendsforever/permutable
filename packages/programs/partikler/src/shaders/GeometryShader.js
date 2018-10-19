import lightgl from '../../libs/lightgl'

const vertex = `
  attribute vec2 texcoord;
  uniform vec2 position;
  varying vec3 coord;

  void main() {
    coord = gl_Vertex.xyz;

    gl_Position = vec4(texcoord.xy, 0.0, 1.0) + vec4(-0.5, -0.5, 0.0, -0.5);
  }
`

const fragment = `
  varying vec3 coord;

  void main() {
    gl_FragColor = vec4(coord, 0.0);
  }
`

export default function SimulationDebugShader() {
  return new lightgl.Shader(vertex, fragment)
}
