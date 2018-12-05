import { bind } from '../../libraries/hyperhtml.js'
import css from '../../libraries/css.js'
import wires from '../wires/index.js'
import controls from '../controls/index.js'
import rafLimit from '../rafLimit/index.js'

const styles = {
  controls: css(`
    position: absolute;
    bottom: 10px;
    left: 10px;
    background: rgba(0, 0, 0, 0.9);
  `)
}

export default program => {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext(program.context || '2d')

  canvas.width = window.innerWidth * window.devicePixelRatio
  canvas.height = window.innerHeight * window.devicePixelRatio
  canvas.style.width = '100%'
  canvas.style.height = '100%'

  rafLimit(controls.state(program.params)).onValue(params => {
    program.render(canvas, context, params)

    bind(document.body)`
      ${canvas}

      <div className=${styles.controls}>
        ${controls.component({
          params,

          mappings: {
            play: null,
            mix: null
          },

          wires
        })}
      </div>
    `
  })
}
