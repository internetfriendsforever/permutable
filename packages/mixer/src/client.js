import React from 'react'
import { render } from 'react-dom'
import Mixer from './components/Mixer'
import state from './state'

state.onValue(value => {
  render(<Mixer {...value} />, document.getElementById('root'))
})

// Warn reload
// window.addEventListener('beforeunload', function (event) {
//   event.preventDefault()
//   event.returnValue = ''
// })
