#version 330 core

out vec4 FragColor;

uniform float time;
//uniform float osc;
uniform float hz;
uniform vec2 resolution;
uniform sampler2D tex0;

float PI = 3.141592;

float plot(vec2 st, float pct) {
  
  return  step( pct - 0.02, st.y) - step( pct + 0.02, st.y);
}

void main() {

  float osc = sin(time * (PI * 2.0) * hz / 2.0) / 2.0 + 0.5;

  float osc2 = sin(time * (PI * 2.0) * hz / 4.0) / 2.0 + 0.5;

  float osc3 = sin(time * (PI * 2.0) * hz / 8.0) / 2.0 + 0.5;

  vec2 uv = gl_FragCoord.xy / max(resolution.x, resolution.y);

  uv.y -= .25;

  uv /= 2.0;

  vec2 rv = uv;

  vec2 gv = uv;

  vec2 bv = uv;
  
  rv.x += sin(rv.y * time / 16.0) + time / 64.0;

  bv.x += cos(bv.y * time / 32.0) + time / 128.0;

  gv.x += time / 64.0;
  
  vec4 color = vec4(texture2D(tex0, rv * 12.0).r, texture2D(tex0, gv * 6.0).g, texture(tex0, bv * 6.0).b, 1.0);
  
  color.g = smoothstep(0.0, 1.0, uv.y);
  
  float ribbons = sin(fract(uv.x * 16.0) + time);

  float y = sin(mod(uv.x * 16.0 + time, 0.5 * sin(uv.y * 512.0)));
  
  vec4 py = plot(uv * 6.0, y) * vec4(.2, osc, .5, 1.0);

  vec4 pny = plot(uv * 6.0, y * -1.0) * vec4(.2, osc2, .5, 1.0);
  
  vec4 pr = plot(uv * 12.0, ribbons) * vec4(.2, osc3, .5, 1.0);
  
  vec4 pnr = plot(uv * 12.0, ribbons * -1.0) * vec4(.2, osc2, .5, 1.0);
  
  FragColor = (color * vec4( osc3, osc, osc2, 1.0) + py + pr + pny + pnr) / vec4(1.5, 1.5, 3.0, 1.0);
}
