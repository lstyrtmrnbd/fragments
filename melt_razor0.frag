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
     color.g = tan(r+(uv.x+time));

  gl_FragColor = vec4( color, 1.0 );
}
