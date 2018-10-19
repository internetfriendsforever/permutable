import SimulationShader from './SimulationShader'

const fragment = `
  uniform float angle;
  uniform float strength;

  void main() {
    float scaledStrength = 0.01 * strength;

    float x = cos(angle) * scaledStrength;
    float y = sin(angle) * scaledStrength;

    vec2 force = vec2(x, y);

    gl_FragColor = vec4(force, 0, 0);
  }
`

export default function GravityForceShader() {
  return new SimulationShader(fragment)
}
