import programs from './programs'
import { combine, merge } from 'kefir'
import events from './events'
import controls from './controls'

const findChannels = element => element.closest('[data-channels]')
const findChannel = element => element.closest('[data-channel]')
const findRemove = element => element.closest('[data-remove]')
const findTarget = event => event.target
const dragover = events.dragover.filter(event => findChannels(event.target))
const dragleave = events.dragleave.filter(event => findChannels(event.target))
const drop = events.drop.filter(event => findChannels(event.target))

dragover.onValue(event => event.preventDefault())

const receiving = merge([
  dragover.map(() => true),
  dragleave.map(() => false),
  drop.map(() => false)
]).skipDuplicates().toProperty(() => false)

const added = combine([drop], [programs], (event, programs) => {
  const programKey = event.dataTransfer.getData('application/json')
  const program = programs[programKey]

  const key = Math.random().toString(32).substring(2)
  const title = programKey
  const canvas = document.createElement('canvas')
  const handler = program.handler(canvas)

  const params = [
    'play',
    'mix'
  ]

  const values = {
    play: true,
    mix: 0
  }

  const mappings = {
    play: null,
    mix: null
  }

  Object.keys(program.params).forEach(key => {
    params.push(key)
    values[key] = program.params[key]
    mappings[key] = null
  })

  return {
    key,
    title,
    canvas,
    handler,
    params,
    values,
    mappings
  }
})

const removed = events.click
  .map(findTarget)
  .filter(findRemove)
  .map(findChannel)
  .map(element => ({
    key: element.getAttribute('data-id')
  }))

const all = merge([
  added.map(item => ({ type: 'add', item })),
  removed.map(item => ({ type: 'remove', item }))
]).scan((all, { type, item }) => {
  const modified = { ...all }

  if (type === 'add') {
    modified[item.key] = item
  }

  if (type === 'remove') {
    delete modified[item.key]
  }

  return modified
}, {})

const channelControls = controls.filter(({ element }) => findChannels(element)).toProperty(() => null)

const items = combine([all, channelControls], (items, control) => {
  if (control) {
    const { element, value, mapping } = control
    const channel = items[element.closest('[data-channel]').getAttribute('data-id')]
    const key = element.getAttribute('data-key')

    if (channel) {
      if (value !== undefined) {
        channel.values[key] = value
      }

      if (mapping !== undefined) {
        channel.mappings[key] = mapping
      }
    }
  }

  return items
})

export default combine({
  receiving,
  items
}).toProperty(() => ({
  receiving: false,
  items: {}
}))
