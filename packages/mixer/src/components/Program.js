import React, { Component } from 'react'
import styled from 'react-emotion'

const Container = styled('div')`
  cursor: grab;
  padding: 0.75rem;
  border-bottom: 2px #aaa solid;
  background: #222;

  &:hover {
    background: #aaa;
    color: black;
  }
`

export default class Program extends Component {
  onDragStart = event => {
    event.dataTransfer.setData('application/json', this.props.id)
    event.dataTransfer.dropEffect = 'copy'
  }

  render () {
    return (
      <Container draggable onDragStart={this.onDragStart}>
        {this.props.id}
      </Container>
    )
  }
}
