import React, { Component } from 'react'
import styled from 'react-emotion'
import produce from 'immer'
import Program from './Program'
import Channels from './Channels'
import Player from './Player'
import * as programs from '../programs'

const Container = styled('div')`
  display: flex;
  min-height: 100vh;
  max-height: 100vh;
  border: 2px #aaa solid;
  box-sizing: border-box;
  -webkit-overflow-scrolling: touch;
`

const Panel = styled('div')`
  flex: 1;
  display: flex;
  flex-direction: column;
  border-right: 2px #aaa solid;

  &:last-child {
    border-right: 0;
  }
`

const ProgramsPanel = styled(Panel)`
  flex: 0.5;
`

const MasterPanel = styled(Panel)`
  flex: 0;
`

const Heading = styled('h1')`
  flex: 0;
  padding: 0.75rem;
  border-bottom: 2px #aaa solid;
`

const Content = styled('div')`
  flex: 1;
  overflow: auto;

  &:last-child {
    border-right: 0;
  }
`

export default class Mixer extends Component {
  state = Object.freeze({
    programs,
    channels: [],
    master: {
      input: []
    }
  })

  onAddChannel = programId => {
    this.setState(produce(draft => {
      draft.channels.push({
        id: Date.now(),
        title: programId,
        program: this.state.programs[programId]
      })
    }))
  }

  onChannelsOutput = output => {
    this.setState(produce(draft => {
      draft.master.input = output
    }))
  }

  render () {
    const { programs, channels, master } = this.state

    return (
      <Container>
        <ProgramsPanel>
          <Heading>
            programs
          </Heading>

          <Content>
            {Object.keys(programs).map(key => (
              <Program key={key} id={key} />
            ))}
          </Content>
        </ProgramsPanel>

        <Panel>
          <Heading>
            channels
          </Heading>

          <Content>
            <Channels
              onAdd={this.onAddChannel}
              onOutput={this.onChannelsOutput}
              channels={channels}
            />
          </Content>
        </Panel>

        <MasterPanel>
          <Heading>
            master
          </Heading>

          <Content>
            <Player
              style={{ height: 720 / 2 }}
              values={master.input}
              handler={(canvas, context) => {
                return (input) => {
                  context.clearRect(0, 0, canvas.width, canvas.height)

                  input.forEach(({ canvas, mix }) => {
                    context.globalAlpha = mix
                    context.drawImage(canvas, 0, 0)
                  })
                }
              }}
            />
          </Content>
        </MasterPanel>
      </Container>
    )
  }
}
