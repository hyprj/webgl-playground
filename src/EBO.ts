export class EBO {
  public id: WebGLBuffer;
  private gl: WebGL2RenderingContext;
  constructor(gl: WebGL2RenderingContext, indices: number[]) {
    this.gl = gl;
    this.id = this.gl.createBuffer() as WebGLBuffer;
    this.gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.id);
    gl.bufferData(
      gl.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(indices),
      gl.STATIC_DRAW
    );
  }

  public bind(): void {
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.id);
  }

  public unbind(): void {
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, null);
  }

  public delete(): void {
    this.gl.deleteBuffer(this.id);
  }
}
