#version 330 core

out vec4 FragColor;

uniform float time;
uniform vec2 resolution;
uniform sampler2D tex0;

float circ(vec2 uv, float radius) {

  vec2 dist = uv - vec2(0.5);

  return 1. - smoothstep(radius - (radius * 0.01),
                         radius + (radius * 0.01),
                         dot(dist, dist) * 4.0);
}

float sinwave(vec2 uv, float mag, float off) {

  return step(0.05, uv.y + sin(mag * uv.x + time / 1.0) / 10.0 - off);
}

void main() {

  vec2 uv = gl_FragCoord.xy / min(resolution.x, resolution.y);

  uv.x -= 0.35;
  
  vec3 color = vec3(0.65, 0.75, 0.80);

  float lx = sinwave(uv, 32.0, 0.1);

  float rx = sinwave(1.0 - uv, 32.0, 0.1);
  
  float lxx = sinwave(uv, 16.0, 0.2);

  float rxx = sinwave(1.0 - uv, 16.0, 0.2);
  
  float lxxx = sinwave(uv, 8.0, 0.4);

  float rxxx = sinwave(1.0 - uv, 8.0, 0.4);
  
  float ly = step(0.1, uv.x);
  
  color.b *= lx;
  color.r *= lxx;
  color.g /= lxxx;

  color.r *= rx;
  color.b *= rxx;
  color.g -= rxxx;
  
  color.b += circ(uv, sinwave(uv, 32.0, 0.2));

  vec2 vu = 1.0 - uv.yx;
  color.r += circ(1.0 - vu, sinwave(vu, 24.0, 0.45));
  
  FragColor = vec4(color, 1.0f);
}
