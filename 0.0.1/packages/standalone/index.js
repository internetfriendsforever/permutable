import { bind } from '../../libraries/hyperhtml.js'
import { combine } from '../../libraries/kefir.js'
import css from '../../libraries/css.js'
import wires from '../wires/index.js'
import controls from '../controls/index.js'
import rafLimit from '../rafLimit/index.js'

const script = document.querySelector('script[data-program]')
const program = script.getAttribute('data-program')
const path = new URL(program, window.location).href

const style = document.createElement('link')

style.setAttribute('rel', 'stylesheet')
style.setAttribute('href', new URL('../styles/styles.css', script.src).href)

document.head.appendChild(style)

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

    canvas.width = window.innerWidth * window.devicePixelRatio
    canvas.height = window.innerHeight * window.devicePixelRatio
    canvas.style.width = '100%'
    canvas.style.height = '100%'

    const update = program.handler(canvas)

    rafLimit(combine({
      params: controls.state(program.params)
    })).onValue(({ params }) => {
      if (update) {
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
