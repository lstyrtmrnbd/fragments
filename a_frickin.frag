#version 330 core

out vec4 FragColor;

uniform float time;
uniform float osc;
uniform float hz;
uniform vec2 resolution;
uniform sampler2D tex0;
uniform sampler2D tex1;
uniform sampler2D tex2;

float PI = 3.141579;

void main() {

  float o = (sin((time * hz * 16.0) / (2.0 * PI)) / 2.0) + .5;

  float fosc = osc * 12.0;
  
  vec2 uv = gl_FragCoord.xy / max(resolution.x, resolution.y);

  //uv.x += osc * 0.0 / 2.0;

  vec2 sd = uv * 4.0;

  sd.x -= 2.0;
 
  vec2 dd = sd;
   
  uv *= 16.0;

  vec2 sx = uv;

  sx.y +=sin(uv.x / 2.0 + o) * 2.0;
 
  uv.x += sin(uv.y / 4.0 + o) * 8.0;
  
  vec4 color = texture2D(tex0, sd * 8.0);

  color *= texture2D(tex1, uv / 2.0 - texture2D(tex0, sd).r / 8.0);

  vec4 circle = texture2D(tex2, sx);

  if(sd.y * 2.25 + o < dot(sd,sd) + sin(o)) color = circle;
  
  FragColor = color * vec4( .3 - o / 4.0, o / 4.0, 0.6 - o / 8.0, 1.0);
}
