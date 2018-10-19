import SimulationShader from './SimulationShader'
import forces from '../forces'

const fragment = `
  varying vec2 coord;
  uniform sampler2D positionSampler;
  uniform sampler2D velocitySampler;
  uniform sampler2D targetSampler;
  uniform sampler2D dropForceSampler;
  uniform sampler2D noiseForceSampler;
  uniform float targetStrength;
  uniform bool reset;

  void main() {
    vec3 velocity = texture2D(velocitySampler, coord).rgb;
    vec3 position = texture2D(positionSampler, coord).rgb;
    vec3 target = texture2D(targetSampler, coord).rgb;

    if(reset) {
      velocity *= 0.0;
    } else {
      velocity += texture2D(dropForceSampler, coord).rgb;
      velocity += texture2D(noiseForceSampler, (position.yz / 3.0) + 0.5).rgb;

      vec3 targetDiff = target - position;
      vec3 force = targetDiff * targetStrength;

      velocity += force;

      velocity *= 0.92;
    }

    gl_FragColor = vec4(velocity, 0);
  }
`

export default function ParticleVelocityShader() {
  return new SimulationShader(fragment)
}
