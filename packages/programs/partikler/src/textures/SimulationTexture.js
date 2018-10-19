import lightgl from '../../libs/lightgl'

export default function SimulationTexture(gl, width, height) {
  return new lightgl.Texture(width, height || width, {
    magFilter: gl.NEAREST,
    minFilter: gl.NEAREST,
    type: gl.FLOAT
  });
}
