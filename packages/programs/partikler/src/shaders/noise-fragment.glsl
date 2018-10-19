varying vec2 coord;
uniform float strength;
uniform float time;
uniform float size;

vec3 random3(vec3 c) {
	float j = 4096.0 * sin(dot(c, vec3(17.0, 59.4, 15.0)));
	vec3 r;

  r.z = fract(512.0 * j);
	j *= .125;
	r.x = fract(512.0 * j);
	j *= .125;
	r.y = fract(512.0 * j);

	return r - 0.5;
}

const float F3 =  0.3333333;
const float G3 =  0.1666667;

float simplex3d(vec3 p) {
  vec3 s = floor(p + dot(p, vec3(F3)));
  vec3 x = p - s + dot(s, vec3(G3));

  vec3 e = step(vec3(0.0), x - x.yzx);
  vec3 i1 = e * (1.0 - e.zxy);
  vec3 i2 = 1.0 - e.zxy * (1.0 - e);

  vec3 x1 = x - i1 + G3;
  vec3 x2 = x - i2 + 2.0 * G3;
  vec3 x3 = x - 1.0 + 3.0 * G3;

  vec4 w, d;

  w.x = dot(x, x);
  w.y = dot(x1, x1);
  w.z = dot(x2, x2);
  w.w = dot(x3, x3);

  w = max(0.6 - w, 0.0);

  d.x = dot(random3(s), x);
  d.y = dot(random3(s + i1), x1);
  d.z = dot(random3(s + i2), x2);
  d.w = dot(random3(s + 1.0), x3);

  w *= w;
  w *= w;
  d *= w;

  return dot(d, vec4(52.0));
}

float simplex3d_fractal(vec3 m) {
  return 0.5333333 * simplex3d(m)
		+ 0.2666667 * simplex3d(2.0 * m)
		+ 0.1333333 * simplex3d(4.0 * m)
		+ 0.0666667 * simplex3d(8.0 * m);
}

void main() {
	vec3 px = vec3(coord, time);
	vec3 py = vec3(coord, time + 3.14 * 2.0);

	float value;

  float s = size;

	float valuex = simplex3d_fractal(px * s + s);
	float valuey = simplex3d_fractal(py * s + s);

	float lightness = 0.0;
	float contrast = 0.01 * strength;

	// value = value;

	float x = lightness + contrast * valuex;
	float y = lightness + contrast * valuey;

	gl_FragColor = vec4(0.0, y, x, 1.0);
}
