import React, { Component } from 'react'
import styled from 'react-emotion'
import produce from 'immer'
import Program from './Program'
import Channels from './Channels'

const Container = styled('div')`
  display: flex;
  min-height: 100vh;
  max-height: 100vh;
  border: 2px #aaa solid;
  box-sizing: border-box;
  -webkit-overflow-scrolling: touch;
`

const Panel = styled('div')`
  flex: auto;
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
    programs: [
      {
        id: 1,
        title: 'Particles'
      }, {
        id: 2,
        title: 'Fluid'
      }
    ],

    channels: []
  })

  onAddChannel = program => {
    this.setState(produce(draft => {
      draft.channels.push({
        id: Math.random().toString(32).substring(2),
        title: program.title
      })
    }))
  }

  render () {
    const { programs, channels } = this.state

    return (
      <Container>
        <ProgramsPanel>
          <Heading>
            Programs
          </Heading>

          <Content>
            {programs.map(program => (
              <Program key={program.id} program={program} />
            ))}
          </Content>
        </ProgramsPanel>

        <Panel>
          <Heading>
            Channels
          </Heading>

          <Content>
            <Channels
              onAdd={this.onAddChannel}
              channels={channels}
            />
          </Content>
        </Panel>

        <Panel>
          <Heading>
            Master
          </Heading>

          <Content />
        </Panel>
      </Container>
    )
  }
}
