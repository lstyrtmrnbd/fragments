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

  vec3 color = vec3(0.5, 0.5, 0.5);
  
  FragColor = vec4(color, 1.0f);
}
