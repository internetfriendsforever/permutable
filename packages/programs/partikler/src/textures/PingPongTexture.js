import SimulationTexture from './SimulationTexture'

export default function PingPongTexture(gl, size) {
  this.textureA = new SimulationTexture(gl, size)
  this.textureB = new SimulationTexture(gl, size)
}

PingPongTexture.prototype.bind = function(i) {
  this.textureA.bind(i)
}

PingPongTexture.prototype.unbind = function() {
  this.textureA.unbind()
}

PingPongTexture.prototype.drawTo = function(drawTo) {
  this.textureA.swapWith(this.textureB)

  this.textureA.unbind()
  this.textureB.bind(1)

  this.textureA.drawTo(() => {
    drawTo(this.textureB)
  })

  this.textureB.unbind()
}
