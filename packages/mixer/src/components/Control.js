import React, { Component } from 'react'
import styled from 'react-emotion'

const Container = styled('div')`
  display: flex;
  cursor: ew-resize;

  :hover {
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

export default function Control ({ name, value }) {
  return (
    <Container>
      <Name>{name}</Name>
      <Value>{value.toFixed(2)}</Value>
    </Container>
  )
}
