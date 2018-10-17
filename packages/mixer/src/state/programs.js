import { constant } from 'kefir'
import events from './events'
import rectangle from '@permutable/program-rectangle'
import circle from '@permutable/program-circle'
import harmonicVibration from '@permutable/program-harmonic-vibration'

const findProgram = event => event.target.closest('[data-program]')

events.dragstart.filter(findProgram).onValue(event => {
  event.dataTransfer.setData('application/json', findProgram(event).getAttribute('data-name'))
  event.dataTransfer.dropEffect = 'copy'
})

export default constant({
  rectangle,
  circle,
  harmonicVibration
})
