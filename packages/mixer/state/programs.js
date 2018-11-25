import { merge, fromCallback, fromPromise } from '/node_modules/kefir/dist/kefir.esm.js'
import events from '/node_modules/@permutable/events/index.js'

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
