import { VBO } from "./VBO";

export class VAO {
  public id: WebGLVertexArrayObject;
  private gl: WebGL2RenderingContext;

  constructor(gl: WebGL2RenderingContext) {
    this.id = gl.createVertexArray() as WebGLVertexArrayObject;
    this.gl = gl;
  }

  public linkAttrib(
    vbo: VBO,
    layout: GLuint,
    numComponents: number,
    type: GLenum,
    stride: GLsizeiptr,
    offset: number
  ) {
    const normalize = false;
    vbo.bind();
    this.gl.vertexAttribPointer(
      layout,
      numComponents,
      type,
      normalize,
      stride,
      offset
    );
    this.gl.enableVertexAttribArray(layout);
    vbo.unbind();
  }

  public bind(): void {
    this.gl.bindVertexArray(this.id);
  }

  public unbind(): void {
    this.gl.bindVertexArray(null);
  }

  public delete(): void {
    this.gl.deleteVertexArray(this.id);
  }
}
