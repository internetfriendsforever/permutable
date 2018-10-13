import React, { Component } from 'react'
import styled from 'react-emotion'

const Container = styled('div')`
  display: flex;
  cursor: pointer;

  :hover {
    color: white;
  }

  :active {
    color: gold;
  }
`

const Name = styled('div')`
  flex: auto;
  margin-right: 0.75rem;
`

const Value = styled('div')`
  flex: 0;
`

export default function ControlBoolean ({ name, value, attributes }) {
  return (
    <Container data-control='boolean' data-name={name} data-value={value} {...attributes}>
      <Name>{name}</Name>
      <Value>{value ? 'yes' : 'no'}</Value>
    </Container>
  )
}
