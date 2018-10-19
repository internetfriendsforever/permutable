import { constant } from 'kefir'
import events from './events'
import rectangle from '@permutable/program-rectangle'
import circle from '@permutable/program-circle'
import harmonic from '@permutable/program-harmonic'
import smudge from '@permutable/program-smudge'
import gra from '@permutable/program-gra'

const findProgram = event => event.target.closest('[data-program]')

events.dragstart.filter(findProgram).onValue(event => {
  event.dataTransfer.setData('application/json', findProgram(event).getAttribute('data-name'))
  event.dataTransfer.dropEffect = 'copy'
})

export default constant({
  rectangle,
  circle,
  harmonic,
  smudge,
  gra
})
