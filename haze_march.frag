#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform vec2 resolution;
uniform float time;

float sphere(vec3 pos, float r) {

  return sqrt(pos.x * pos.x +
                   pos.y * pos.y +
                   pos.z * pos.z) - r;
}

float shape(vec3 p, float r) {

  return length(max(abs(p) - r, 0.0));
}

//transform point 'p' for repeating primitives
//repeat in steps defined by 'c'
vec3 opRep(vec3 p, vec3 c) {

  return mod(p, c) - .5 * c;
}

void main( void )
{
  float rmEpsilon = .4;

  vec2 uv = -1.0 + 2.0 * gl_FragCoord.xy/resolution.xy;

     vec3 eye = vec3(0, 0, -1);
     vec3 up = vec3(0, 1, 0);
     vec3 right = vec3(1, 0, 0);
     vec3 forw = vec3(0, 0, 1);

     //eye.x -= abs(sin(time));
     //forw.xz += sin(time)/2.;
     eye.z += time;
     //forw.y = -.6;

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

     float t = 0.;
     const int maxSteps = 12;
     for (int i = 0; i < maxSteps; ++i) {

       //vec3 p = ro + rd * t;

       vec3 p = rp + rd2 * t;

       //distance functions
       //for sphere of radius 0.5
       //float d = length(p) - 0.3;
       //float d = length(max(abs(p) - .3, 0.0));
       float grid0 = shape(opRep(p, vec3(2, 2, 4)), .1);
       float grid1 = shape(opRep(p, vec3(4, 3, 1)), .1);
       float grid2 = min(grid0, grid1);
       //float d = sphere(vec3(p), .5);
       //float d = min(sphere(vec3(p), .5), sphere(vec3(p.x,p.y+.5,p.z-.5), .7));

          float d = min(grid2, shape(opRep(p, vec3(1, 3, 4)), .1));

       if (d < rmEpsilon) {
         color = vec4(1.0 - float(i)*1.2/float(maxSteps));
         //color.r = uv.x;
         color.g += uv.y/2.;
         color /= 2.;
         break;
       }

       t += d;
      }

  gl_FragColor = color;
}
