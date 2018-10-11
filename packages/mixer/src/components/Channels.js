import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import styled from 'react-emotion'
import produce from 'immer'
import Channel from './Channel'

const Container = styled('div')`
  height: 100%;

  ${props => props.dropping && `
    background: #222;
  `}
`

export default class Channels extends Component {
  state = Object.freeze({
    dropping: false,
    output: {}
  })

  onChannelOutput = (id, output) => {
    this.setState(produce(draft => {
      draft.output[id] = output
    }), () => {
      this.props.onOutput(Object.values(this.state.output))
    })
  }

  onDragOver = event => {
    event.preventDefault()

    this.setState({
      dropping: true
    })
  }

  onDragLeave = event => {
    this.setState({
      dropping: false
    })
  }

  onDrop = event => {
    this.props.onAdd(event.dataTransfer.getData('application/json'))

    this.setState({
      dropping: false
    })
  }

  render () {
    const { dropping } = this.state
    const { channels } = this.props

    const events = {
      onDragOver: this.onDragOver,
      onDragLeave: this.onDragLeave,
      onDrop: this.onDrop
    }

    return (
      <Container dropping={dropping} {...events}>
        {channels.map(channel => (
          <Channel
            key={channel.id}
            channel={channel}
            onOutput={output => this.onChannelOutput(channel.id, output)}
          />
        ))}
      </Container>
    )
  }
}
