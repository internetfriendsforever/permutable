import { combine, constant } from 'kefir'
import frame from './frame'
import channels from './channels'
import programs from './programs'
import outputs from './outputs'
import rafLimit from './rafLimit'

const canvas = constant(document.createElement('canvas'))
const context = canvas.map(canvas => canvas.getContext('2d'))

const master = combine({
  canvas,
  context,
  outputs
}).toProperty()

export const ui = rafLimit(combine({ programs, channels, master }))

export const animation = combine({ frame }, { programs, channels, master })

const width = constant(1280)
const height = constant(720)

export const size = rafLimit(combine({ width, height, channels, master }))
