import React, { Component } from 'react'
import styled from 'react-emotion'
import ControlMidi from './ControlMidi'

const Container = styled('div')`
  display: flex;
  align-items: center;
`

const Slider = styled('div')`
  flex: auto;
  cursor: ew-resize;
  display: flex;
  margin-right: 0.5rem;

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

// parseMidiSignal = ({ type, value }) => {
//   switch (type) {
//     case 128:
//       return 0
//     case 144:
//       return 1
//     default:
//       return value / 127
//   }
// }

export default function ControlFloat ({ name, value, attributes }) {
  return (
    <Container data-control='float' data-name={name} data-value={value} {...attributes}>
      <Slider data-slider>
        <Name>{name}</Name>
        <Value>{value.toFixed(2)}</Value>
      </Slider>
      <ControlMidi />
    </Container>
  )
}
