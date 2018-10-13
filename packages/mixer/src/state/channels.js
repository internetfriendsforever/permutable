import programs from './programs'
import { combine, merge } from 'kefir'
import events from './events'
import controls from './controls'

const inChannels = event => event.target.closest('#channels')
const dragover = events.dragover.filter(inChannels)
const dragleave = events.dragleave.filter(inChannels)
const drop = events.drop.filter(inChannels)

dragover.onValue(event => event.preventDefault())

const receiving = merge([
  dragover.map(() => true),
  dragleave.map(() => false),
  drop.map(() => false)
]).toProperty(() => false).skipDuplicates()

const controlsByChannel = controls.scan((previous, control) => {
  const channel = control.attributes['data-channel'].value
  const name = control.attributes['data-name'].value
  const controls = { ...previous }

  if (!controls[channel]) {
    controls[channel] = {}
  }

  controls[channel][name] = control.value

  return controls
}, {})

const droppedItems = drop.scan((previous, event) => {
  const id = Math.random().toString(32).substring(2)
  const program = event.dataTransfer.getData('application/json')
  return [...previous, { id, program }]
}, [])

const items = combine([
  droppedItems,
  programs,
  controlsByChannel
], (
  items,
  programs,
  controls
) => items.map(item => {
  const { id, program } = item

  const values = {
    play: true,
    mix: 0,
    ...programs[program].params,
    ...controls[id]
  }

  return {
    id,
    program,
    values
  }
}))

export default combine({
  receiving,
  items
})
