import changes from './controlChanges.js'
import { combine, merge } from 'kefir'
import events from './events.js'
import programs from './programs.js'

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

  const params = {
    play: {
      type: 'boolean',
      value: true
    },

    mix: {
      type: 'float',
      value: 0
    }
  }

  const mappings = {
    play: null,
    mix: null
  }

  Object.keys(program.params).forEach(key => {
    const config = program.params[key]

    if (typeof config === 'number') {
      params[key] = {
        type: 'float',
        value: config
      }
    } else if (typeof config === 'boolean') {
      params[key] = {
        type: 'boolean',
        value: config
      }
    } else {
      params[key] = config
    }
  })

  return {
    key,
    title,
    canvas,
    handler,
    params,
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

const items = merge([
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

export default changes
  .filter(({ element }) => element.closest('[data-channels]'))
  .toProperty(() => null)
  .combine(items, (control, items) => {
    if (control) {
      const { element, value, mapping } = control
      const channel = items[element.closest('[data-channel]').getAttribute('data-id')]
      const key = element.getAttribute('data-key')

      if (channel) {
        if (value !== undefined) {
          channel.params[key].value = value
        }

        if (mapping !== undefined) {
          channel.mappings[key] = mapping
        }
      }
    }

    return items
  })
  .toProperty(() => {})
