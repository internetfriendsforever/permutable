// import styles from '@permutable/styles/styles.css'
import { bind } from '/node_modules/hyperhtml/esm.js'
import { merge, constant } from '/node_modules/kefir/dist/kefir.esm.js'
import wires from '/node_modules/@permutable/wires/index.js'
import controls from '/node_modules/@permutable/controls/index.js'
import rafLimit from '/node_modules/@permutable/rafLimit/index.js'

const script = document.querySelector('script[data-program]')
const program = script.getAttribute('data-program')
const path = new URL(program, window.location)

console.log('Loading program...')

import(path.href)
  .then(program => {
    console.log('Program loaded...')
    console.log(JSON.stringify(program))

    const { wire, next } = wires('standalone')
    const canvas = document.createElement('canvas')
    const update = program.handler(canvas)

    rafLimit(controls.state(program.params)).onValue(params => {
      if (update) {
        update(params)
      }

      bind(document.body)`
        ${canvas}

        ${controls.component({
          params,

          mappings: {
            play: null,
            mix: null
          },

          wires: next
        })}
      `
    })
  })
  .catch(error => {
    console.error('Error loading program', error)
  })
