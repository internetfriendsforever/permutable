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

  &:active {
    background: gold;
    color: black;
  }
`

export default function Program ({ id }) {
  return (
    <Container draggable onDragStart={event => {
      event.dataTransfer.setData('application/json', id)
      event.dataTransfer.dropEffect = 'copy'
    }}>
      {id}
    </Container>
  )
}
