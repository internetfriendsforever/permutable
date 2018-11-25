import { bind } from '/node_modules/hyperhtml/esm.js'
import { merge, constant } from '/node_modules/kefir/dist/kefir.esm.js'
import css from '/node_modules/@happycat/css/esm.js'
import wires from '/node_modules/@permutable/wires/index.js'
import controls from '/node_modules/@permutable/controls/index.js'
import rafLimit from '/node_modules/@permutable/rafLimit/index.js'

const script = document.querySelector('script[data-program]')
const program = script.getAttribute('data-program')
const path = new URL(program, window.location).href

console.log('TODO: Load styles from:', new URL('styles.css', script.src).href)

console.log('Loading program...')

const styles = {
  controls: css(`
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.9);
    padding: 0.5em;
  `)
}

import(path)
  .then(program => {
    console.log('Program loaded...')
    console.log(JSON.stringify(program))

    const { wire, next } = wires('standalone')
    const canvas = document.createElement('canvas')
    const update = program.handler(canvas)

    rafLimit(controls.state(program.params)).onValue(params => {
      if (update) {
        canvas.width = window.innerWidth * window.devicePixelRatio
        canvas.height = window.innerHeight * window.devicePixelRatio
        canvas.style.width = '100%'
        canvas.style.height = '100%'
        update(params)
      }

      bind(document.body)`
        ${canvas}

        <div className=${styles.controls}>
          ${controls.component({
            params,

            mappings: {
              play: null,
              mix: null
            },

            wires: next
          })}
        </div>
      `
    })
  })
  .catch(error => {
    console.error('Error loading program', error)
  })
