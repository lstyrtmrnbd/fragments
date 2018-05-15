#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform vec2 resolution;
uniform float time;
uniform sampler2D noise;
uniform vec3 rotation;

void main( void )
{
  vec2 res = resolution;
  vec2 p = -1.0 + 2.0 * gl_FragCoord.xy / res;
     vec2 p2 = p;

     p.x /= 2.;

     p.xy = p.yx *2.;

  float r = dot(p,p)*4.;
  if(r > 1.5) discard;

  float f = (1. - sqrt(1.0-r))/(r);

  f -= 1.;
  f *= f*f;

  vec2 uv;
  uv.x = p.x*f;
  uv.y = p.y*f*uv.y;

  uv.x -= time/196.;

  vec4 tex = texture2D(noise, uv*2.);

  tex.r+=p.x;
  tex.g-=p.y;
  tex.b-=p.x;

     vec2 dap = vec2(r,r) /256.;
     dap -= sin(time/256.);

     vec4 tex2 = texture2D(noise, dap);

     tex2.b *= 4.;
     tex.r /= 2.;


  gl_FragColor = 1. - tex - tex2;
}
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform vec2 resolution;
uniform float ftime;
uniform float time;

void main( void )
{
  vec2 uv = -1. + 2. * gl_FragCoord.xy/resolution.xy;

     uv *= 5.;
     uv.y *= 2.;

     float r = dot(uv+sin(uv.x),uv-sin(time));


     vec3 color = vec3(.7, - r, .9*sin(r)*sin(time));

     r > .5 ? color *= cos(r): color *= sin(r);

     color.r *= .3+sin(uv.y + time);
     uv.x > sin(time + uv.y) ? color.b *= 1.9 : color.b *= .9;
     color.b *= .3+cos(uv.y +time);
     color.g = sin(r+(uv.x+time));

  gl_FragColor = vec4( color, 1.0 );
}
