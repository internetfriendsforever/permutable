import React, { Component } from 'react'
import styled from 'react-emotion'

const Container = styled('div')`
  display: flex;
  cursor: ew-resize;

  :hover,
  :active {
    color: white;
  }
`

const Name = styled('div')`
  flex: auto;
  margin-right: 0.75rem;
`

const Value = styled('div')`
  flex: 0;
`

export default class ControlFloat extends Component {
  onMouseDown = e => {
    this.prev = e.clientX
    window.addEventListener('mousemove', this.onMouseMove)
    window.addEventListener('mouseup', this.onMouseUp)
  }

  onMouseMove = e => {
    const delta = e.clientX - this.prev
    const value = Math.min(1, Math.max(0, this.props.value + delta * 0.01))

    this.prev = e.clientX
    this.props.onChange(value)
  }

  onMouseUp = e => {
    window.removeEventListener('mousemove', this.onMouseMove)
    window.removeEventListener('mouseup', this.onMouseUp)
  }

  render () {
    const { name, value } = this.props

    return (
      <Container onMouseDown={this.onMouseDown}>
        <Name>{name}</Name>
        <Value>{value.toFixed(2)}</Value>
      </Container>
    )
  }
}
