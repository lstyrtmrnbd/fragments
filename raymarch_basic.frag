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

void main( void )
{
  float rmEpsilon = .2;

  vec2 uv = -1.0 + 2.0 * gl_FragCoord.xy/resolution.xy;

     vec3 eye = vec3(0, 0, -1);
     vec3 up = vec3(0, 1, 0);
     vec3 right = vec3(1, 0, 0);
     vec3 forw = vec3(0, 0, 1);

     //eye.z -= abs(sin(time));

     vec3 ro = eye + right * uv.x + up * uv.y;
     vec3 rd = normalize(cross(right, up));

     // focal length, distance bw eye and
     // image plane along forw vector
     float f = 1.;

     // perspective formula for point on image plane
     vec3 rp = eye + forw * f + right * uv.x + up * uv.y;

     // ray direction
     vec3 rd2 = rp - eye;

     vec4 color = vec4(0.0);

     float t = 0.0;
     const int maxSteps = 32;
     for (int i = 0; i < maxSteps; ++i) {

       //vec3 p = ro + rd * t;

       vec3 p = rp + rd2 * t;

       //distance function for sphere of radius 0.5
       //float d = length(p) - 0.3;
       float d = length(max(abs(p) - .5, 0.0));

       if (d < rmEpsilon) {
         color = vec4(1.0 - float(i)/float(maxSteps));
         break;
       }

       t += d;
      }

  gl_FragColor = color;
}
