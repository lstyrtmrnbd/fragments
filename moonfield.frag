#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform vec2 resolution;
uniform float time;
uniform sampler2D tex0;

void main( void ) {

  vec2 sp = gl_FragCoord.xy / resolution.xx;

  //adjust towards screen center
  sp.y -= .15; 
  sp.x -= .365;
  sp *= 5.0;
  
  vec2 p = -1. + 1.5 * sp;
  float dp = dot(p,p)+sin(p.y+time);
  vec2 mp = vec2(p.x + (dp+sin(time)),p.y + (dp-sin(time)));
  float or = dot(p,p);
  float r = dot(mp*p*p,mp*4.);
  //if(r > 1.0) discard;

  float f = (1.0 - sqrt(1.0-r))/(r);

  vec2 uv;
  uv.x = p.x*f;
  uv.y = p.y*f + (time/3.0);

  vec2 bv = uv;
  bv.x += .1;
  bv.y = p.y*f + (time/4.);

  vec2 rv = uv;
  rv.x -= .1;
  rv.y = p.y*f + (time/2.);

  vec2 ouv;
  ouv.x = -p.x*f;
  ouv.y = (p.x - 2.0)*f;

  vec2 orv;
  orv.y = p.y*f + (time/2.);
  orv.x = orv.y;

  vec4 back = texture2D(tex0,p);
  vec4 circ = vec4(texture2D(tex0, rv).r, texture2D(tex0, uv).g, texture2D(tex0, bv).b, 1.0);

  vec4 corc = vec4(texture2D(tex0,ouv));
  float cbreak = .5 * sin(uv.y*2.);

  circ.r -= cbreak;
  //circ.b -= -cos(uv.y*.5);

  vec4 cor = vec4(texture2D(tex0, orv));

  if(r > 1.0) {
    gl_FragColor = back * .3 ;
  } if (or > .5){
    gl_FragColor = cor - back;
  } else {
    gl_FragColor = (circ - cbreak) - (corc - cbreak/2.);
 }
}
