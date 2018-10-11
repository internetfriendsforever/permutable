import React, { Component } from 'react'
import styled from 'react-emotion'
import produce from 'immer'
import Player from './Player'
import Control from './Control'

const Container = styled('div')`
  display: flex;
  border-bottom: 2px #aaa solid;
`

const Title = styled('h2')`
  flex: 1;
  padding: 0.75rem;
`

const PreviewOuter = styled('div')`
  flex 0;
  display: flex;
  align-items: center;
`

const PreviewInner = styled('div')`
  height: ${720 / 8}px;
`

const Controls = styled('div')`
  flex 2;
  padding: 0.75rem;
`

export default class Channel extends Component {
  state = Object.freeze({
    values: {
      mix: 0,
      ...this.props.channel.program.params
    }
  })

  onParamChange = (key, value) => {
    this.setState(produce(draft => {
      draft.values[key] = value
    }))
  }

  render () {
    const { values } = this.state
    const { channel } = this.props
    const { program } = channel
    const { params, handler } = program

    return (
      <Container>
        <Title>
          {channel.title}
        </Title>

        <Controls>
          {Object.keys(values).map(key => (
            <Control
              key={key}
              name={key}
              value={values[key] || 0}
              onChange={v => this.onParamChange(key, v)}
            />
          ))}
        </Controls>

        <PreviewOuter>
          <PreviewInner>
            <Player
              handler={handler}
              values={values}
            />
          </PreviewInner>
        </PreviewOuter>
      </Container>
    )
  }
}
