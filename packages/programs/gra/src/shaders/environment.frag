precision mediump float;

varying vec2 uv;

void main () {
  vec3 color = vec3(distance(vec2(0.5, 0.5), uv));
  gl_FragColor = vec4(color, 1);
}
