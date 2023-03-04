export class VBO {
  private gl: WebGL2RenderingContext;
  public id: WebGLBuffer;
  constructor(gl: WebGL2RenderingContext, vertices: number[]) {
    this.gl = gl;
    this.id = gl.createBuffer() as WebGLBuffer;
    gl.bindBuffer(gl.ARRAY_BUFFER, this.id);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  }

  public bind(): void {
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.id);
  }

  public unbind(): void {
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
  }

  public delete(): void {
    this.gl.deleteBuffer(this.id);
  }
}
