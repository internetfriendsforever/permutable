import React from 'react'
import { render } from 'react-dom'
import Mixer from './components/Mixer'

render(<Mixer />, document.getElementById('root'))

// Warn reload
// window.addEventListener('beforeunload', function (event) {
//   event.preventDefault()
//   event.returnValue = ''
// })
