import { ShaderProgram } from "./ShaderProgram";
import { defaultFrag, defaultVert } from "./shaders";
import { Texture } from "./Texture";
import { VAO } from "./VAO";
import { VBO } from "./VBO";

const points = [
  0, 0, 0.9, 0.0, 0.0, 0.0, 1.0, 100, 100, 0.0, 0.9, 0.0, 1.0, 0.0, 0, 100, 0.0,
  0.0, 1.0, 1.0, 1.0,
];

const canvas = document.querySelector("#canvas") as HTMLCanvasElement;
const gl = canvas.getContext("webgl2") as WebGL2RenderingContext;

async function main() {
  const shaderProgram = new ShaderProgram(gl, defaultVert, defaultFrag);

  const vao = new VAO(gl);
  vao.bind();

  const vbo = new VBO(gl, points);

  vao.linkAttrib(vbo, 0, 2, gl.FLOAT, 7 * 4, 0); //link position
  vao.linkAttrib(vbo, 1, 3, gl.FLOAT, 7 * 4, 2 * 4); //link color
  vao.linkAttrib(vbo, 2, 2, gl.FLOAT, 7 * 4, 5 * 4); //link texture

  vao.unbind();
  vbo.unbind();

  const catTexture = new Texture(
    gl,
    "../assets/cat.png",
    gl.TEXTURE_2D,
    gl.TEXTURE0,
    gl.RGBA,
    gl.UNSIGNED_BYTE
  );

  await catTexture.load();

  catTexture.texUnit(shaderProgram, "tex0", 0);

  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

  gl.clearColor(1, 0, 0, 0.3);
  gl.clear(gl.COLOR_BUFFER_BIT);

  shaderProgram.active();
  vao.bind();

  const uRes = gl.getUniformLocation(shaderProgram.ID, "uResolution");

  if (uRes) {
    gl.uniform2f(uRes, gl.canvas.width, gl.canvas.height);
  }

  const primitiveType = gl.TRIANGLES;
  const count = 3;

  catTexture.bind();
  vao.bind();

  gl.drawArrays(primitiveType, 0, count);

  vao.delete();
  vbo.delete();
  shaderProgram.delete();
}

main();
