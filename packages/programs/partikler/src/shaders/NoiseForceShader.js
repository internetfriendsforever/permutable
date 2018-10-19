import SimulationShader from './SimulationShader'

import fragment from './noise-fragment.glsl'

export default function CenterForceShader() {
  return new SimulationShader(fragment)
}
