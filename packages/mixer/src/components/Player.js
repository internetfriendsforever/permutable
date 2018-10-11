import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import styled from 'react-emotion'

const Canvas = styled('canvas')`
  display: block;
`

export default class ChannelPreview extends Component {
  playing = false

  shouldComponentUpdate = nextProps => {
    if (this.playing && !nextProps.play) {
      this.pause()
    }

    if (!this.playing && nextProps.play) {
      this.play()
    }

    return false
  }

  onRef = ref => {
    if (ref) {
      this.canvas = findDOMNode(ref)
      this.canvasContext = this.canvas.getContext('2d')
      this.canvasRender = this.props.handler(this.canvas, this.canvasContext)

      if (this.props.play) {
        this.play()
      }
    }
  }

  play = (time = 0) => {
    this.playing = true
    this.canvasRender(this.props.values)
    this.frameRequest = window.requestAnimationFrame(this.play)
  }

  pause = () => {
    this.playing = false
    window.cancelAnimationFrame(this.frameRequest)
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
