import { constant } from '../libraries/kefir.js'
import events from './events.js'

const findProgram = event => event.target.closest('[data-program]')

events.dragstart.filter(findProgram).onValue(event => {
  event.dataTransfer.setData('application/json', findProgram(event).getAttribute('data-name'))
  event.dataTransfer.dropEffect = 'copy'
})

export default constant({})
