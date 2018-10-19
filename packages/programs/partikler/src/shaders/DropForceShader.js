import SimulationShader from './SimulationShader'

const fragment = `
  varying vec2 coord;
  uniform sampler2D positionSampler;
  uniform vec3 dropPosition;
  uniform float strength;

  void main() {
    vec3 position = texture2D(positionSampler, coord).rgb;

    float dropDistance = distance(position, dropPosition);
    vec3 dropDiff = position - dropPosition;

    vec3 force = dropDiff / pow(dropDistance, 2.4) * strength * 0.001;

    gl_FragColor = vec4(force, 0);
  }
`

export default function DropForceShader() {
  return new SimulationShader(fragment)
}
