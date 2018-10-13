import { combine, constant } from 'kefir'
import channels from './channels'
import programs from './programs'

const master = constant({
  input: []
})

export default combine({
  programs,
  channels,
  master
})
