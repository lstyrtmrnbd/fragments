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

     uv *= 20.;
     uv.y *= 20.;

     float r = dot(uv+sin(time),uv-sin(time));


     vec3 color = vec3(.7, - r, .9*sin(r)*sin(time));

     r > .5 ? color *= cos(r): color *= sin(r);

     color.r *= .3;
     color.b *= .9;
     color.g = sin(r);

  gl_FragColor = vec4( color, 1.0 );
}
