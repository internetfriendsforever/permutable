import { combine, constant } from 'kefir'
import rafLimit from '../../rafLimit.js'
import frame from '../../frame.js'
import channels from './channels/controllable.js'
import outputs from './outputs.js'
import filters from './filters.js'

const master = combine({
  outputs,
  filters
}).toProperty()

export const ui = rafLimit(combine({
  channels,
  master
}))

export const animation = combine({ frame }, {
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
