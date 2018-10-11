import React, { Component } from 'react'
import styled from 'react-emotion'

const Button = styled('button')`
  display: block;
  font: inherit;
  text-transform: inherit;
  background: transparent;
  color: #aaa;
  cursor: pointer;
  border: 0;
  margin: 0;
  padding: 0;
  outline: 0;
  white-space: nowrap;

  ${props => props.mapping ? `
    color: gold;
  ` : `
    :hover,
    :active {
      color: white;
      border-color: white;
    }
  `}
`

export default class ControlMidi extends Component {
  state = {
    mapping: false,
    mapped: null
  }

  componentDidMount () {
    navigator.requestMIDIAccess().then(this.onAccess)
  }

  componentWillUnmount () {
    this.unlisten()
  }

  onAccess = access => {
    this.access = access
    this.listen()
  }

  listen = () => {
    window.addEventListener('keydown', this.onKeyDown)
    for (const [id, input] of this.access.inputs) {
      input.addEventListener('midimessage', this.onMidiMessage)
    }
  }

  unlisten = () => {
    window.removeEventListener('keyup', this.onKeyDown)
    for (const [id, input] of this.access.inputs) {
      input.removeEventListener('midimessage', this.onMidiMessage)
    }
  }

  onKeyDown = event => {
    if (this.state.mapping) {
      if (event.keyCode === 8) {
        this.setState({
          mapping: false,
          mapped: null
        })
      }

      if (event.keyCode === 27) {
        this.setState({
          mapping: false
        })
      }
    }
  }

  onMidiMessage = event => {
    const [type, port, value] = event.data

    if (this.state.mapping) {
      this.setState({
        mapping: false,
        mapped: {
          input: event.currentTarget,
          port
        }
      })
    }

    const { mapped } = this.state
    const matchesInput = mapped && mapped.input === event.currentTarget
    const matchesPort = mapped && mapped.port === port

    if (matchesInput && matchesPort) {
      this.props.onChange({
        type,
        value
      })
    }
  }

  onMapClick = e => {
    this.setState({
      mapping: !this.state.mapping
    })
  }

  render () {
    const { mapping, mapped } = this.state

    return (
      <Button mapping={mapping} onClick={this.onMapClick}>
        {mapped ? `${mapped.input.name} #${mapped.port}` : 'Map'}
      </Button>
    )
  }
}
