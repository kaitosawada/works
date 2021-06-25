import p5 from "p5";
// @ts-ignore
import frag from "./assets/test3.frag";
// @ts-ignore
import vert from "./assets/test3.vert";

const WIDTH = 1024;
const HEIGHT = 576;

let shader;

export const sketch = (p: p5) => {
  p.setup = () => {
    p.createCanvas(WIDTH, HEIGHT, p.WEBGL);
    p.noStroke();

    shader = p.createShader(vert, frag);
    p.shader(shader);
    p.quad(-1, -1, -1, 1, 1, 1, 1, -1);
    // p.resetShader();
    p.resetShader();
  };
  p.draw = () => {
    p.shader(shader);

    shader.setUniform("iResolution", [WIDTH, HEIGHT]);
    shader.setUniform("iFrame", p.frameCount);
    shader.setUniform("iMouse", [p.mouseX, p.map(p.mouseY, 0, p.height, p.height, 0)]);

    p.fill(0);
    p.rect(0, 0, WIDTH, HEIGHT);
  };
};