import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import styled from 'react-emotion'

const Canvas = styled('canvas')`
  display: block;
`

export default class ChannelPreview extends Component {
  shouldComponentUpdate = () => false

  onRef = ref => {
    if (ref) {
      this.canvas = findDOMNode(ref)
      this.canvasContext = this.canvas.getContext('2d')
      this.renderProgram = this.props.handler(this.canvas, this.canvasContext)
      this.offset = Math.random() * 1000
      this.tick()
    }
  }

  tick = (time = 0) => {
    this.renderProgram(time + this.offset)
    window.requestAnimationFrame(this.tick)
  }

  render () {
    return (
      <Canvas
        ref={this.onRef}
        width={1280}
        height={720}
        style={{ height: '100%' }}
      />
    )
  }
}
