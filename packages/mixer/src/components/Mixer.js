import React from 'react'
import styled from 'react-emotion'

const Panels = styled('div')`
  display: flex;
  min-height: 100vh;
  max-height: 100vh;
  border: 1px #aaa solid;
  box-sizing: border-box;
  -webkit-overflow-scrolling: touch;
`

const Panel = styled('div')`
  flex: auto 1 1;
  display: flex;
  flex-direction: column;
  border-right: 1px #aaa solid;

  &:last-child {
    border-right: 0;
  }
`

const Heading = styled('h1')`
  flex: 0;
  padding: 1rem;
  border-bottom: 1px #aaa solid;
`

const Content = styled('div')`
  flex: 1;
  overflow: auto;
  border-right: 1px #aaa solid;

  &:last-child {
    border-right: 0;
  }
`

export default function Mixer () {
  return (
    <Panels>
      <Panel>
        <Heading>
          Library
        </Heading>

        <Content>
          Content
        </Content>
      </Panel>

      <Panel>
        <Heading>
          Channels
        </Heading>

        <Content>
          Content
        </Content>
      </Panel>

      <Panel>
        <Heading>
          Master
        </Heading>

        <Content>
          Content
        </Content>
      </Panel>
    </Panels>
  )
}
