import lightgl from '../../libs/lightgl'

const vertex = `
  uniform sampler2D positionSampler;
  uniform sampler2D velocitySampler;
  varying vec3 position;
  varying vec3 velocity;

  void main() {
    position = texture2D(positionSampler, gl_Vertex.xy).rgb;
    velocity = texture2D(velocitySampler, gl_Vertex.xy).rgb;

    gl_PointSize = 2.0;
    gl_Position = gl_ModelViewProjectionMatrix * vec4(position.xyz, 1.0);
  }
`

const fragment = `
  uniform float brightness;
  varying vec3 velocity;

  void main() {
    float speed = length(velocity) * 400.0 + brightness;

    gl_FragColor = vec4(speed, speed, speed, 1.0);
  }
`

export default function ParticleDisplayShader() {
  return new lightgl.Shader(vertex, fragment)
}
