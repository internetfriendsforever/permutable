import React, { Component } from 'react'
import styled from 'react-emotion'

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
  }

  onDragEnter = event => {
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
    this.setState({
      dropping: false
    })
  }

  render () {
    return (
      <Container
        dropping={this.state.dropping}
        onDragOver={this.onDragOver}
        onDragEnter={this.onDragEnter}
        onDragLeave={this.onDragLeave}
        onDrop={this.onDrop}
        children={this.props.children}
      />
    )
  }
}
