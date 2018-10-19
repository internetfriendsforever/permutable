import lightgl from '../../libs/lightgl'

import vertex from './simulation-vertex.glsl'

export default function SimulationShader(fragment) {
  return new lightgl.Shader(vertex, fragment)
}
