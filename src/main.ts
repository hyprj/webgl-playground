import { Shader } from "./Shader";
import { defaultFrag, defaultVert } from "./shaders";
import { VAO } from "./VAO";
import { VBO } from "./VBO";

const points = [
  0, 0, 0.9, 0.0, 0.0, 100, 100, 0.0, 0.9, 0.0, 0, 100, 0.0, 0.0, 1.0,
];

const canvas = document.querySelector("#canvas") as HTMLCanvasElement;
const gl = canvas.getContext("webgl2") as WebGL2RenderingContext;

const shaderProgram = new Shader(gl, defaultVert, defaultFrag);

const vao = new VAO(gl);
vao.bind();

const vbo = new VBO(gl, points);

vao.linkAttrib(vbo, 0, 2, gl.FLOAT, 5 * 4, 0); //link position
vao.linkAttrib(vbo, 1, 3, gl.FLOAT, 5 * 4, 8); //link color

vao.unbind();
vbo.unbind();

gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

gl.clearColor(0, 0, 0, 0);
gl.clear(gl.COLOR_BUFFER_BIT);

shaderProgram.active();
vao.bind();

const uRes = gl.getUniformLocation(shaderProgram.ID, "uResolution");

if (uRes) {
  gl.uniform2f(uRes, gl.canvas.width, gl.canvas.height);
}

const primitiveType = gl.TRIANGLES;
const count = 3;
gl.drawArrays(primitiveType, 0, count);

vao.delete();
vbo.delete();
shaderProgram.delete();
