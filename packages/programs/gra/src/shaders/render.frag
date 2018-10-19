precision mediump float;

varying vec2 uv;
uniform float resolution;
uniform float time;
uniform sampler2D state;
uniform sampler2D environment;

void main () {
  vec3 color = vec3(0.0);

  // Calculate normal
  float height = texture2D(state, uv).x;
  vec3 e = vec3(vec2(1.0) / resolution, 0);
  vec2 q = uv;

  float s11 = height;
  float s01 = texture2D(state, q - e.zy).x;
  float s21 = texture2D(state, q - e.xz).x;
  float s10 = texture2D(state, q + e.xz).x;
  float s12 = texture2D(state, q + e.zy).x;

  vec2 size = vec2(2.5, 0.0);

  vec3 va = normalize(vec3(size.xy, s21 - s01));
  vec3 vb = normalize(vec3(size.yx, s12 - s10));

  vec3 normal = vec4(cross(va, vb), s11).rgb;
  vec3 eye = vec3(0.0, 0.0, 1.0);

  // Calculate lighting
  vec3 modelPosition = vec3(uv, 0.0);

  // Add environment
  vec3 r = reflect(eye, normal);
  float m = 0.5 * sqrt(pow(r.x, 1.5) + pow(r.y, 1.5) + pow(r.z, 1.5));
  vec2 vN = r.xy / m + 0.5;

  color += texture2D(environment, vN).rgb;

  // Add specular
  color += vec3(
    pow(clamp(dot(
      eye,
      reflect(-normalize(modelPosition - vec3(0.5, -2.0, -20.0)), normal.rgb)
    ), 0.0, 1.0), 1024.0)
  ) * vec3(0.0, 0.0, 1.0);

  color += vec3(
    pow(clamp(dot(
      eye,
      reflect(-normalize(modelPosition - vec3(2.5, 0.5, -10.0)), normal.rgb)
    ), 0.0, 1.0), 1024.0)
  ) * vec3(1.0, 0.0, 0.0);

  gl_FragColor = vec4(color, 1);
}
