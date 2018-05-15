#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform vec2 resolution;
uniform float ftime;
uniform float time;
uniform vec2 touch;

void main( void )
{
  vec2 uv = -1. + 2. * gl_FragCoord.xy/resolution.xy;

     uv *= 10.;
     uv.y *= 1.;

     float r = dot(uv+sin(time)*.2,uv-sin(time)*3.);


     vec3 color = vec3(.7, - r * .2, .9*sin(r)*sin(time));

     r > .5 ? color *= cos(r): color *= sin(r);

     color.r *= .3;
     color.b *= .9;
     color.g = sin(r) * .3;

     color += .5;

  gl_FragColor = vec4( color, 1.0 );
}
