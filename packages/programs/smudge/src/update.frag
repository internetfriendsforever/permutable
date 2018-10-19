precision mediump float;

#pragma glslify: snoise3 = require(glsl-noise/simplex/3d)

uniform sampler2D buffer;
uniform vec2 dims;
uniform float time;
uniform float horizontal;
uniform float vertical;
uniform float directionMix;
uniform float alpha;
uniform float life;
uniform float zoom;
varying vec2 uv;

void main() {
  float noise = 0.0;

  noise += snoise3(vec3(uv * zoom * 10.0, time)) / 2.0;
  noise += snoise3(vec3(uv * zoom * 20.0, time + 10.0)) / 2.0;

  float n1 = texture2D(buffer, uv + vec2((horizontal - 0.5) * -100.0, 0) / dims).r;
  float n2 = texture2D(buffer, uv + vec2(0, (vertical - 0.5) * -100.0) / dims).r;

  // noise += n1;
  // noise += n2;

  noise = noise - floor(noise);

  noise += n1;
  noise += n2;

  noise /= 2.0;
  noise *= alpha;

  float l = 0.0;
  float n = 0.0;
  float s = texture2D(buffer, uv).r;

  for(int x = -1; x <= 1; ++x) {
    for(int y = -1; y <= 1; ++y) {
      n += texture2D(buffer, uv + vec2(x, y) / dims).r * life;
    }
  }

  if(n < (3.0) + s && n > (3.0)) {
    l += 1.0;
  }

  gl_FragColor = vec4(vec3(noise + l), 1);
}
