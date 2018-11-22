import { merge, fromCallback, fromPromise } from '../libraries/kefir.js'
import events from './events.js'

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
  .flatMap(url => fromPromise(window.import(url)))
  .scan((all, module) => ({ ...all, [module.name]: module }), {})
  .log()
