import { bind } from './hyperhtml.js'
import css from './css.js'
import wires from './wires.js'
import controls from './controls/index.js'
import rafLimit from './rafLimit.js'
import styles from './styles.js'

const controlStyles = css(styles, `
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.9);
  padding: 1px;
`)

export default program => {
  const canvas = document.createElement('canvas')

  canvas.width = window.innerWidth * window.devicePixelRatio
  canvas.height = window.innerHeight * window.devicePixelRatio
  canvas.style.width = '100%'
  canvas.style.height = '100%'

  document.body.style.background = 'black'
  document.body.style.margin = 0

  const render = program.setup(canvas)
  const state = controls.state(program.params)

  rafLimit(state).onValue(params => {
    if (render) {
      render(params)
    }

    bind(document.body)`
      ${canvas}

      <div className=${controlStyles}>
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
