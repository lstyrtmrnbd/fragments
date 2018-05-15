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
uniform float time;
uniform sampler2D noise;
uniform vec2 touch;

void main( void )
{
  vec2 res = resolution;
  vec2 p = -1.0 + 2.0 * gl_FragCoord.xy / res;

  //true touch
  vec2 tt = -1.0 + 2.0 * touch.xy / res;


     p.x /= 2.;

     p.xy = p.yx *1.5;

     //p*=tt*4.;

  float r = dot(p,p)*4.;
  if(r > 1.5) discard;

  float rt = dot(tt,tt)*4.;

  float f = (1. - sqrt(1.0-r))/(r);
  float ft= (1. - sqrt(1.0-rt))/(rt);

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
     dap -= sin(time/1028.);

     vec4 tex2 = texture2D(noise, dap);

     tex2.b *= 4.;
     tex.r /= 2.;


     vec2 p2 = vec2(sin(sqrt(tex2.x/1028.)));
     p2.y -= sin(time/256.);
     vec4 tex3 = texture2D(noise, p2);




  vec4 color = 1. - tex - tex2 + tex3/2.;
  color.r *= .5;
  color.g -= .4;
  color.b *= 2.;
  gl_FragColor = color;
}
