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
    this.props.onChange(this.props.id, value)
  }

  onMouseUp = e => {
    window.removeEventListener('mousemove', this.onMouseMove)
    window.removeEventListener('mouseup', this.onMouseUp)
  }

  onMidiChange = signal => {
    this.props.onChange(this.props.id, this.parseMidiSignal(signal))
  }

  parseMidiSignal = ({ type, value }) => {
    switch (type) {
      case 128:
        return 0
      case 144:
        return 1
      default:
        return value / 127
    }
  }

  render () {
    const { id, value } = this.props

    return (
      <Container>
        <Slider onMouseDown={this.onMouseDown}>
          <Name>{id}</Name>
          <Value>{value.toFixed(2)}</Value>
        </Slider>

        <ControlMidi onChange={this.onMidiChange} />
      </Container>
    )
  }
}
