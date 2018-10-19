precision mediump float;

#pragma glslify: snoise2 = require(glsl-noise/simplex/2d)

varying vec2 uv;
uniform vec2 resolution;
uniform float time;
uniform vec4 midiA;
uniform vec4 midiB;
uniform sampler2D state;

void main () {
  vec3 e = vec3(vec2(1.0) / resolution, 0);
  vec2 q = gl_FragCoord.xy / resolution;

  vec4 c = texture2D(state, q);
  float direction = (snoise2(uv * 10.0 * midiB.x + vec2(time / 20.0)) - 0.5) * 3.1415926536;
  float distortion = smoothstep(0.0, 0.01, snoise2(uv * 5.0 + vec2(time / 7.0)));
  vec2 flow = vec2(sin(direction), cos(direction)) * distortion * midiB.y * 0.02;

  float self = c.y;

  float up = texture2D(state, q - e.zy).x;
  float left = texture2D(state, q - e.xz).x;
  float right = texture2D(state, q + e.xz).x;
  float down = texture2D(state, q + e.zy).x;

  float d = 0.0;

  float dy = mix(up, down, 0.5 + flow.x);
  float dx = mix(right, left, 0.5 + flow.y);

  d += -self + dy + dx;
  d *= 0.85 + midiB.z * 0.15;

  if (true) {
    d += (smoothstep(0.0, 0.01, uv.x - 0.5) - 1.0) * sin(time / sin(time / 3.0)) * 2.0 * midiA.x;
    d += (smoothstep(0.0, 0.01, distance(uv, vec2(0.5, 0.5 + sin(time / 2.0) * 0.5))) - 1.0) * 1.0 * midiA.y;
    d += (smoothstep(0.0, 0.01, sin(time * uv.y - 0.5)) - 1.0) * sin(time / sin(time / 10.0)) * 2.0 * midiA.z;
    d += (smoothstep(0.0, 0.01, distance(uv, vec2(sin(time / 3.5) * 1.0 + 0.5, cos(time / 2.0) * 0.5 + 0.5))) - 1.0) * 2.0 * midiA.w;
  }

  gl_FragColor = vec4(d, c.xyz);
}
