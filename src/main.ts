import { Shader } from "./Shader";
import { defaultFrag, defaultVert } from "./shaders";
import { VAO } from "./VAO";
import { VBO } from "./VBO";

const points = [10, 20, 80, 20, 10, 30, 10, 30, 80, 20, 80, 30];

const canvas = document.querySelector("#canvas") as HTMLCanvasElement;
const gl = canvas.getContext("webgl2") as WebGL2RenderingContext;

//program tj. program skladajacy sie z 2 shaderow, takich funkcji
const shaderProgram = new Shader(gl, defaultVert, defaultFrag);

const vao = new VAO(gl);
vao.bind();

const vbo = new VBO(gl, points);

vao.linkAttrib(vbo, 0, 2, gl.FLOAT, 0, 0); //link position
vao.linkAttrib(vbo, 1, 2, gl.FLOAT, 0, 0); //link resolution

vao.unbind();
vbo.unbind();

gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

gl.clearColor(0, 0, 0, 0);
gl.clear(gl.COLOR_BUFFER_BIT);

shaderProgram.active();
vao.bind();

const uid = gl.getUniformLocation(shaderProgram.ID, "uResolution");

if (uid) {
  gl.uniform2f(uid, gl.canvas.width, gl.canvas.height);
}

const primitiveType = gl.TRIANGLES;
const count = 6;
gl.drawArrays(primitiveType, 0, count);

vao.delete();
vbo.delete();
shaderProgram.delete();
