#version 330 core

out vec4 FragColor;

uniform float time;
uniform vec2 resolution;
uniform sampler2D tex0;

float onLine(vec2 uv, float width) {

  float l = step(width / 2, uv.x);
  
  return l;
}

void main() {

  vec2 uv = gl_FragCoord.xy / min(resolution.x, resolution.y);
  
  vec3 color = vec3(0.65, 0.75, 0.80);

  float lx = step(0.05, uv.y + sin(32.0 * uv.x + time / 1.0) / 10.0 - 0.1);

  float lxx = step(0.05, uv.y + sin(16.0 * uv.x + time / 1.0) / 10.0 - 0.2);

  float lxxx = step(0.05, uv.y + sin(8.0 * uv.x + time / 1.0) / 10.0 - 0.4);
  
  float ly = step(0.1, uv.x);
  
  color.b /= lx;
  color.r /= lxx;
  color.g /= lxxx;

  color.r -= 1.0 - lx;
  
  FragColor = vec4(color, 1.0f);
}
