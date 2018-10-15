import { combine, constant } from 'kefir'
import frame from './frame'
import channels from './channels'
import programs from './programs'

const canvas = document.createElement('canvas')
const context = canvas.getContext('2d')

const master = constant({ canvas, context })

export const ui = combine({ programs, channels, master })

export const animation = combine({ frame }, { programs, channels, master })

const width = constant(1280)
const height = constant(720)

export const size = combine({ width, height, channels, master })
