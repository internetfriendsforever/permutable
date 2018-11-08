import { constant, sequentially, merge, fromCallback, fromPromise } from '../libraries/kefir.js'
import events from './events.js'

const findProgram = event => event.target.closest('[data-program]')

// events.dragstart.filter(findProgram).onValue(event => {
//   event.dataTransfer.setData('application/json', findProgram(event).getAttribute('data-name'))
//   event.dataTransfer.dropEffect = 'copy'
// })

events.dragover
  .onValue(event => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'copy'
  })

const drops = events.drop
  .onValue(event => event.preventDefault())

const files = drops
  .flatten(event => event.dataTransfer.files)
  .map(file => window.URL.createObjectURL(file))
  .log()

const urls = drops
  .flatten(event => event.dataTransfer.items)
  .flatMap(item => fromCallback(callback => item.getAsString(callback)))

export default merge([files, urls])
  .flatMap(url => fromPromise(import(url)))
  .scan((all, module) => ({ ...all, [module.name]: module }), {})
  .log()

// export default constant({})
