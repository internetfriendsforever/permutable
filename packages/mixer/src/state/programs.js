import { constant } from 'kefir'
import events from './events'
import rectangle from '../programs/rectangle'
import circle from '../programs/circle'

const findProgram = event => event.target.closest('[data-program]')

events.dragstart.filter(findProgram).onValue(event => {
  event.dataTransfer.setData('application/json', findProgram(event).getAttribute('data-name'))
  event.dataTransfer.dropEffect = 'copy'
})

export default constant({
  rectangle,
  circle
})
