#version 330 core

out vec4 FragColor;

uniform float time;
uniform vec2 resolution;
uniform sampler2D tex0;

void main() {

  //coords & transforms
  vec2 uv = gl_FragCoord.xy / min(resolution.x, resolution.y);

  vec2 vv = vec2(1.0) - uv;
  
  uv *= 2.0;
  uv -= 1.0;

  vv *= 4.0;
  vv -= 2.0;

  vv.x += 4.0;

  float offx = 2.0 * sin(uv.x + time / 4.0);

  float offy = sin(vv.x + time / 4.0) / 4.0;
  
  vv.x -= offx;
  vv.y += offy;
  
  //shapes
  float circ = dot(uv, uv);

  float mcirc = dot(vv, vv);

  //color
  vec3 sun = vec3(circ, circ, 0.0);

  sun = vec3(1.0) - sun;

  vec3 moon = vec3(mcirc, mcirc, mcirc);

  //moon = vec3(1.0) / moon;
  
  vec3 sky = vec3(0.0, 0.0, 0.25);

  sun.b = 0.0;
  moon.b = 0.0;
  
  vec3 color = sky + sun;
  
  FragColor = vec4(color, 1.0f);
}
