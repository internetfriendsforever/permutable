import React, { Component } from 'react'
import styled from 'react-emotion'
import produce from 'immer'
import Program from './Program'
import Channel from './Channel'
import Player from './Player'

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
  flex: 0;
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

const Channels = styled('div')`
  height: 100%;

  ${props => props.receiving && `
    background: #222;
  `}
`

export default function Mixer (props) {
  const { programs, channels, master } = props

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
          <Channels id='channels' receiving={channels.receiving}>
            {channels.items.map(channel => (
              <Channel key={channel.id} {...channel} />
            ))}
          </Channels>
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
