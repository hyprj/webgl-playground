export const defaultVert = `#version 300 es
// in vec2 aPosition;
layout (location = 0) in vec2 aPosition;
// layout (location = 1) in vec2 aResolution;

uniform vec2 uResolution;

void main() {
  
  vec2 zeroToOne = aPosition / uResolution;
  vec2 zeroToTwo = zeroToOne * 2.0;
  vec2 clipSpace = zeroToTwo - 1.0;
  
  gl_Position = vec4(clipSpace, 0,1);
}
`;

export const defaultFrag = `#version 300 es
precision highp float;

uniform vec4 u_color;

out vec4 outColor;

void main() {
  outColor = vec4(1, 0, 0.5, 1);
}
`;
