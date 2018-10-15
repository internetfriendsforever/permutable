import { combine, constant } from 'kefir'
import frame from './frame'
import channels from './channels'
import programs from './programs'

export const ui = combine({ programs, channels })

export const animation = combine({ frame }, { programs, channels })

const width = constant(1280)
const height = constant(720)

export const size = combine({ width, height, channels })
