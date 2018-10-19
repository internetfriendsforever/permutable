import { constant } from 'kefir'
import events from './events'
import harmonic from '@permutable/program-harmonic'
import smudge from '@permutable/program-smudge'
import gra from '@permutable/program-gra'
import vertigo from '@permutable/program-vertigo'
import tentacell1 from '@permutable/program-tentacell/1'
import tentacell2 from '@permutable/program-tentacell/2'
import tentacell3 from '@permutable/program-tentacell/3'
import tentacell4 from '@permutable/program-tentacell/4'
import tentacell5 from '@permutable/program-tentacell/5'

const findProgram = event => event.target.closest('[data-program]')

events.dragstart.filter(findProgram).onValue(event => {
  event.dataTransfer.setData('application/json', findProgram(event).getAttribute('data-name'))
  event.dataTransfer.dropEffect = 'copy'
})

export default constant({
  harmonic,
  smudge,
  gra,
  vertigo,
  tentacell1,
  tentacell2,
  tentacell3,
  tentacell4,
  tentacell5
})
