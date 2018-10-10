import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import styled from 'react-emotion'
import Channel from './Channel'

const Container = styled('div')`
  height: 100%;

  ${props => props.dropping && `
    background: #222;
  `}
`

export default class Channels extends Component {
  state = {
    dropping: false
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
          <Channel key={channel.id} channel={channel} />
        ))}
      </Container>
    )
  }
}
