import React from 'react'
import styled from 'react-emotion'
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

export default function Mixer () {
  return (
    <Container>
      <ProgramsPanel>
        <Heading>
          Programs
        </Heading>

        <Content>
          <Program id='1'>
            Particles
          </Program>

          <Program id='2'>
            Fluid
          </Program>
        </Content>
      </ProgramsPanel>

      <Panel>
        <Heading>
          Channels
        </Heading>

        <Content>
          <Channels />
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
