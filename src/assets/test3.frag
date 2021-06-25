// http://glslsandbox.com/e#49090.4

#ifdef GL_ES
precision mediump float;
#endif

uniform int iFrame;
uniform vec2 iMouse;
uniform vec2 iResolution;

float linearstep(float edge0, float edge1, float x) {
  return min(max((x - edge0) / (edge1 - edge0) * 2.0, 0.0), 1.0);
}

vec2 rotate(vec2 v, float a) {
  float s = sin(a);
  float c = cos(a);
  mat2 m = mat2(c, -s, s, c);
  return m * v;
}

vec2 circle(vec2 uv, float radius) {
  return vec2(length(uv), radius); // .x = distance, .y = offset
}

float object(vec2 uv, float time, float k, float t, float freq) {
  vec2 repeatedUv = uv;
  repeatedUv -= 0.5;
  for (int i = 0; i < 16; i++) {
    repeatedUv += sin(time + uv.x * 30.0) * sin(time * freq + float(i)) *
                  exp(sin(time * 8.0)) * t;
    repeatedUv += sin(time + uv.y * 30.0) * sin(time * freq + float(i)) *
                  exp(sin(time * 8.0)) * t;
    repeatedUv = rotate(repeatedUv, float(i) * k);
  }

  vec2 distanceAndOffset = circle(repeatedUv, 1.0);
  return linearstep(distanceAndOffset.x - 2.0, distanceAndOffset.x + 2.0,
                    distanceAndOffset.y);
}

void main(void) {

  float time = float(iFrame) * 0.01;
  vec2 uv = (gl_FragCoord.xy / max(iResolution.x, iResolution.y) - 0.8) * 2.0;

  float changingOffset = object(uv, time, 0.5, 0.3, 5.0);
  float changingOffset2 = object(uv - vec2(1.0, 1.0), time, 0.5, 0.3, 5.0);
  float mixed = mix(changingOffset, changingOffset2, 0.5);
  vec3 color = vec3(mixed);

  gl_FragColor = vec4(color, 1.0);
}