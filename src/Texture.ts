import { ShaderProgram } from "./ShaderProgram";

export class Texture {
  public id: WebGLTexture | null;
  private gl: WebGL2RenderingContext;
  private type: GLenum;
  private decoded: Promise<boolean>;
  private onLoadCb: () => void;
  constructor(
    gl: WebGL2RenderingContext,
    imgSource: string,
    texType: GLenum,
    slot: GLenum,
    format: GLenum,
    pixelType: GLenum
  ) {
    const img = new Image();
    img.src = imgSource;
    this.id = null;
    this.gl = gl;
    this.type = texType;
    this.decoded = new Promise((resolve) => {
      img.onload = () => {
        resolve(true);
      };
    });

    this.onLoadCb = () => {
      const { width, height } = img;

      this.id = gl.createTexture();
      gl.activeTexture(slot);
      gl.bindTexture(texType, this.id);
      gl.texParameteri(
        texType,
        gl.TEXTURE_MIN_FILTER,
        gl.NEAREST_MIPMAP_LINEAR
      );
      gl.texParameteri(texType, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
      gl.texParameteri(texType, gl.TEXTURE_WRAP_S, gl.REPEAT);
      gl.texParameteri(texType, gl.TEXTURE_WRAP_T, gl.REPEAT);
      gl.texImage2D(
        texType,
        0,
        gl.RGBA,
        width,
        height,
        0,
        format,
        pixelType,
        img
      );
      gl.generateMipmap(texType);
      gl.bindTexture(texType, null);
    };
  }

  public async load() {
    await this.decoded;
    this.onLoadCb();
  }

  public texUnit(shaderProgram: ShaderProgram, uniform: string, unit: GLuint) {
    const texUni = this.gl.getUniformLocation(shaderProgram.ID, uniform);
    shaderProgram.active();
    this.gl.uniform1i(texUni, unit);
  }

  public bind(): void {
    this.gl.bindTexture(this.type, this.id);
  }

  public unbind(): void {
    this.gl.bindTexture(this.type, null);
  }

  public delete(): void {
    this.gl.deleteTexture(this.id);
  }
}
