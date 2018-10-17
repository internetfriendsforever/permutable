import { combine, constant } from 'kefir'
import frame from './frame'
import channels from './channels'
import programs from './programs'
import outputs from './outputs'

const canvas = constant(document.createElement('canvas'))
const context = canvas.map(canvas => canvas.getContext('2d'))

const master = combine({
  canvas,
  context,
  outputs
}).toProperty()

export const ui = combine({ programs, channels, master })

export const animation = combine({ frame }, { programs, channels, master })

const width = constant(1920 / 2)
const height = constant(1200 / 2)

export const size = combine({ width, height, channels, master })
