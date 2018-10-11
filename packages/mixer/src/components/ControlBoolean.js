import React, { Component } from 'react'
import styled from 'react-emotion'

const Container = styled('div')`
  display: flex;
  cursor: pointer;

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

export default function ControlBoolean ({ name, value, onChange }) {
  return (
    <Container onClick={() => onChange(!value)}>
      <Name>{name}</Name>
      <Value>{value ? 'yes' : 'no'}</Value>
    </Container>
  )
}
