#version 330 core

out vec4 FragColor;

uniform float time;
uniform vec2 resolution;
uniform sampler2D tex0;
uniform sampler2D tex1;

void main() {

  float osc = (sin(time / 2.0) / 2.0) + .5;
  
  vec2 uv = gl_FragCoord.xy / max(resolution.x, resolution.y);

  vec2 sd = uv * 4.0;
  
  uv *= 64.0;

  uv.x += sin(uv.y + osc);
  
  vec4 color = texture2D(tex0, sd);

  color *= texture2D(tex1, uv);
  
  FragColor = color * vec4( .3, osc, 0.6, 1.0);
}
