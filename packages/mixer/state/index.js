import { combine, constant } from '/node_modules/kefir/dist/kefir.esm.js'
import rafLimit from '/node_modules/@permutable/rafLimit/index.js'
import frame from './frame.js'
import channels from './channels/controlable.js'
import programs from './programs.js'
import outputs from './outputs.js'
import filters from './filters.js'

const canvas = constant(document.createElement('canvas'))
const context = canvas.map(canvas => canvas.getContext('2d'))

const buffer = constant(document.createElement('canvas'))
const bufferContext = buffer.map(buffer => buffer.getContext('2d'))

const master = combine({
  canvas,
  context,
  buffer,
  bufferContext,
  outputs,
  filters
}).toProperty()

export const ui = rafLimit(combine({
  programs,
  channels,
  master
}))

export const animation = combine({ frame }, {
  programs,
  channels,
  master
})

const width = constant(1280)
const height = constant(720)

export const size = rafLimit(combine({
  width,
  height,
  channels,
  master
}))
