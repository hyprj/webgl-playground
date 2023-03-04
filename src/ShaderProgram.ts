export class ShaderProgram {
  public ID: WebGLProgram;
  private gl: WebGL2RenderingContext;

  constructor(
    gl: WebGL2RenderingContext,
    vertexShaderCode: string,
    fragmentShaderCode: string
  ) {
    this.gl = gl;

    const vertexShader = this.createShader(
      gl,
      gl.VERTEX_SHADER,
      vertexShaderCode
    );
    const fragmentShader = this.createShader(
      gl,
      gl.FRAGMENT_SHADER,
      fragmentShaderCode
    );

    this.ID = this.createProgram(gl, vertexShader, fragmentShader);
  }

  public active(): void {
    this.gl.useProgram(this.ID);
  }

  public delete(): void {
    this.gl.deleteProgram(this.ID);
  }

  private createShader(
    gl: WebGL2RenderingContext,
    type: number,
    src: string
  ): WebGLShader {
    const shader = gl.createShader(type);
    if (!shader) {
      throw new Error("Error");
    }
    gl.shaderSource(shader, src);
    gl.compileShader(shader);

    const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success) {
      return shader;
    }
    console.log(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    throw new Error("error");
  }

  private createProgram(
    gl: WebGL2RenderingContext,
    vertexShader: WebGLShader,
    fragmentShader: WebGLShader
  ): WebGLProgram {
    const program = gl.createProgram();
    if (!program) {
      throw new Error("Error");
    }
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    const success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (success) {
      return program;
    }
    console.log(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    throw new Error("Error");
  }
}
