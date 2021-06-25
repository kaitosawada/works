// this is a port of "recursive noise experiment" by ompuco
// https://www.shadertoy.com/view/wllGzr
// casey conchinha - @kcconch ( https://github.com/kcconch )
// more p5.js + shader examples: https://itp-xstory.github.io/p5js-shaders/

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 iResolution;
uniform int iFrame;
uniform vec2 iMouse;

float noise(vec3 x) {
  vec3 p = floor(x);
  float n = p.x + p.y + p.z;
  return sin(n);
}

void main() {

  vec3 t = (float(iFrame) * vec3(1.0, 2.0, 3.0) / 1.0) / 100.0;

  // Normalized pixel coordinates (from 0 to 1)
  vec2 uv = gl_FragCoord.xy / iResolution.xy;
  uv = uv - 1.5;
  // uv -= iMouse.xy / iResolution.xy / 4.0;

  vec3 col = vec3(0.0);

  for (int i = 0; i < 32; i++) {
    float i2 = float(i) * 1.0 + 10.0;
    float i3 = sign(sin(i2 * 0.01));
    col.r += noise(uv.xyy + col.rgb + i3 * t);
    col.g += noise(uv.xyx + col.rgb + i3 * t);
    col.b += noise(uv.yyx + col.rgb + i3 * t);
  }
  
  col.rgb /= 32.0;
  col.rgb = mix(col.rgb, normalize(col.rgb) * 2.0, 1.0);
  col.rgb += .3;

  // Output to screen
  gl_FragColor = vec4(col, 1.0);
}