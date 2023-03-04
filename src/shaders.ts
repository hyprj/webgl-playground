export const defaultVert = `#version 300 es
layout (location = 0) in vec2 aPosition;
layout (location = 1) in vec3 uColor;
layout (location = 2) in vec2 aTexture;

out vec3 color;
out vec2 texCoord;

uniform vec2 uResolution;

void main() {
  
  vec2 zeroToOne = aPosition / uResolution;
  vec2 zeroToTwo = zeroToOne * 2.0;
  vec2 clipSpace = zeroToTwo - 1.0;
  
  gl_Position = vec4(clipSpace, 0,1);
  color = uColor;
  texCoord = aTexture;
}
`;

export const defaultFrag = `#version 300 es
precision highp float;
//in vec3 color;
out vec4, FragColor;
in vec2 texCoord;
uniform sampler2D tex0;

//out vec4 outColor;

void main() {
  //outColor = vec4(color,1.0);
  FragColor = texture(tex0, texCoord);
}
`;
