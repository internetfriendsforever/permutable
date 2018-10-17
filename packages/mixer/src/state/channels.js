import programs from './programs'
import { combine, merge } from 'kefir'
import events from './events'
import controls from './controls'

const findChannels = event => event.target.closest('[data-channels]')
const dragover = events.dragover.filter(findChannels)
const dragleave = events.dragleave.filter(findChannels)
const drop = events.drop.filter(findChannels)

dragover.onValue(event => event.preventDefault())

const receiving = merge([
  dragover.map(() => true),
  dragleave.map(() => false),
  drop.map(() => false)
]).skipDuplicates()

const controlsByChannel = controls.scan((previous, control) => {
  const channel = control.element.closest('[data-channel]').getAttribute('data-id')
  const key = control.key
  const controls = { ...previous }

  if (!controls[channel]) {
    controls[channel] = {}
  }

  controls[channel][key] = control.value

  return controls
}, {})

const droppedItems = combine([drop, programs], (event, programs) => {
  const key = event.dataTransfer.getData('application/json')
  const program = programs[key]
  const id = Math.random().toString(32).substring(2)
  const title = key
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  const handler = program.handler(canvas, context)

  const values = {
    play: true,
    mix: 0,
    ...program.params
  }

  return {
    id,
    title,
    canvas,
    context,
    values,
    handler
  }
}).scan((all, item) => [...all, item], [])

const items = combine([
  droppedItems,
  controlsByChannel
], (items, controls) => items.map(item => {
  for (let key in controls[item.id]) {
    item.values[key] = controls[item.id][key]
  }

  return item
}))

export default combine({
  receiving,
  items
}).toProperty(() => ({
  receiving: false,
  items: []
}))
