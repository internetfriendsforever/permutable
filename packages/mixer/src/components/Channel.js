import React, { Component } from 'react'
import styled from 'react-emotion'
import produce from 'immer'
import Player from './Player'
import ControlFloat from './ControlFloat'
import ControlBoolean from './ControlBoolean'

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

const Controls = styled('div')`
  flex 2;
  padding: 0.75rem;
`

export default function Channel ({ id, program, values }) {
  return (
    <Container>
      <Title>
        {program}
      </Title>

      <Controls>
        {Object.keys(values).map(key => {
          const value = values[key]
          const Control = typeof value === 'boolean' ? ControlBoolean : ControlFloat

          return (
            <Control
              key={key}
              name={key}
              value={value}
              attributes={{
                'data-channel': id
              }}
            />
          )
        })}
      </Controls>

      {/*
        <PreviewOuter>
          <Player
            style={{ height: 720 / 8 }}
            play={values.play}
            values={values}
            handler={() => {}}
          />
        </PreviewOuter>
      */}
    </Container>
  )
}

// export default class Channel extends Component {
//   state = Object.freeze({
//     values: {
//       play: true,
//       mix: 0,
//       ...this.props.channel.program.params
//     }
//   })
//
//   onParamChange = (key, value) => {
//     this.setState(produce(draft => {
//       draft.values[key] = value
//     }))
//   }
//
//   componentDidUpdate = (prevProps, prevState) => {
//     if (prevState.values.mix !== this.state.values.mix) {
//       // this.props.onOutput(this.props.id, {
//       //   mix: this.state.values.mix,
//       //   canvas: this.canvas
//       // })
//     }
//   }
//
//   renderPreview = (canvas, context) => {
//     this.canvas = canvas
//     return this.props.channel.program.handler(canvas, context)
//   }
//
//   render () {
//     const { values } = this.state
//     const { channel } = this.props
//     const { program } = channel
//     const { params } = program
//
//     return (
//       <Container>
//         <Title>
//           {channel.title}
//         </Title>
//
//         <Controls>
//           {Object.keys(values).map(key => {
//             const value = values[key]
//             const Control = typeof value === 'boolean' ? ControlBoolean : ControlFloat
//
//             return (
//               <Control
//                 key={key}
//                 id={key}
//                 value={value}
//                 onChange={this.onParamChange}
//               />
//             )
//           })}
//         </Controls>
//
//         <PreviewOuter>
//           <Player
//             style={{ height: 720 / 8 }}
//             play={values.play}
//             values={values}
//             handler={this.renderPreview}
//           />
//         </PreviewOuter>
//       </Container>
//     )
//   }
// }
