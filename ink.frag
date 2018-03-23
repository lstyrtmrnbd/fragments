#version 330 core

out vec4 FragColor;

uniform float time;
uniform float osc;
uniform float hz;
uniform vec2 resolution;
uniform sampler2D tex2;
uniform sampler2D tex1;

void main() {

  //float osc = (sin(time / 2.0) / 2.0) + .5;

  float osc4 = osc / 4.0;

  float oscs = osc / hz / 8.0;
  
  vec2 uv = gl_FragCoord.xy / max(resolution.x, resolution.y);

  vec2 sd = uv * 4.0;

  sd.x += sin((sd.y + sin(sd.x + sin(sd.y + sin(sd.x + sd.y + sd.x * 8.0)))) + oscs);

  sd.x += time / 2.0;

  sd *= 1.5;
  
  vec4 color = texture2D(tex1, sd);

  uv.y = sin(sd.x);
  
  color -= texture2D(tex2, uv * 2.0);
  
  FragColor = color * vec4( .4, .3, 0.5 + oscs * 2.0, 1.0);
}
