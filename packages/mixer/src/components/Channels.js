import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import styled from 'react-emotion'

const Container = styled('div')`
  height: 100%;

  ${props => props.dropping && `
    background: #222;
  `}
`

const Channel = styled('div')`
  padding: 0.75rem;
  border-bottom: 2px #aaa solid;
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
    this.props.onAdd(JSON.parse(event.dataTransfer.getData('application/json')))

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
          <Channel key={channel.id}>
            {channel.title}
          </Channel>
        ))}
      </Container>
    )
  }
}
