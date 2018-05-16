#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform vec2 resolution;
uniform float time;

float sdTorus( vec3 p, vec2 t )
{
  vec2 q = vec2(length(p.xz)-t.x,p.y);
  return length(q)-t.y;
}

void main( void )
{
  float rmEpsilon = 0.5;

  vec2 uv = -1.0 + 2.0 * gl_FragCoord.xy/resolution.xy;

  uv *= 2.0;

  vec3 eye = vec3(0, -abs(sin(time)), 0);
  vec3 up = vec3(0, 0, 1);
  vec3 right = vec3(1, 0, 0);
  vec3 forw = vec3(0, 1, 0);

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
    //float d = length(max(abs(p) - .5, 0.0));
    float d = sdTorus(p, vec2(1.0, 0.5));
    
    if (d < rmEpsilon) {
      color.b = 1.0 - float(i*8)/float(maxSteps);
      color.g = 0.4;
      break;
    }
    t += d;
   }
  
  gl_FragColor = color;
}
