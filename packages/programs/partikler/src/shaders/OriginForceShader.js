import SimulationShader from './SimulationShader'

const fragment = `
  varying vec2 coord;
  uniform sampler2D positionSampler;
  uniform sampler2D originSampler;
  uniform float strength;

  void main() {
    vec2 center = vec2(0.5, 0.5);
    vec3 position = texture2D(positionSampler, coord).rgb;
    vec3 origin = texture2D(originSampler, coord).rgb;

    vec3 diff = origin - position;
    vec3 force = diff * strength;

    gl_FragColor = vec4(force, 0);
  }
`

export default function CenterForceShader() {
  return new SimulationShader(fragment)
}
