import { combine, merge } from '../libraries/kefir.js'
import programs from './programs.js'
import events from './events.js'
import controls from './controls/index.js'

const findChannels = element => element.closest('[data-channels]')
const findChannel = element => element.closest('[data-channel]')
const findRemove = element => element.closest('[data-remove]')
const findProgram = element => element.closest('[data-program]')
const findTarget = event => event.target

const clicked = events.click
  .map(findTarget)
  .map(findProgram)
  .filter()
  .map(element => element.getAttribute('data-name'))

const added = combine([clicked], [programs], (name, programs) => {
  const program = programs[name]
  const key = Math.random().toString(32).substring(2)
  const title = name
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

export default combine([all, channelControls], (items, control) => {
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
}).toProperty(() => {})
