import React, { Component } from 'react'
import styled from 'react-emotion'
import Player from './Player'
import Control from './Control'

const Container = styled('div')`
  display: flex;
  border-bottom: 2px #aaa solid;
`

const Title = styled('h2')`
  flex: auto;
  padding: 0.75rem;
  background: #222;
  cursor: grab;

  &:hover {
    background: #aaa;
    color: black;
  }
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
  flex auto;
  padding: 0.75rem;
`

export default function Channel ({ channel }) {
  const { program } = channel
  const { params, handler } = program

  return (
    <Container>
      <Title>
        {channel.title}
      </Title>

      <Controls>
        <Control name='mix' value={0} />

        {params.map(name => (
          <Control key='name' name={name} value={0} />
        ))}
      </Controls>

      <PreviewOuter>
        <PreviewInner>
          <Player handler={handler} />
        </PreviewInner>
      </PreviewOuter>
    </Container>
  )
}
