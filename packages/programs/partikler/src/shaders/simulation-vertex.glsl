varying vec2 coord;

void main() {
  coord = gl_Vertex.xy;

  vec4 offset = vec4(-0.5, -0.5, 0.0, -0.5);

  gl_Position = vec4(coord, 0.0, 1.0) + offset;
}
