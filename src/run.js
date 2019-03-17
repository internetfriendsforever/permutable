import { html, render } from 'lighterhtml'
import css from '@happycat/css'
import controls from './state/controls'
import control from './components/control'
import rafLimit from './state/rafLimit.js'
import styles from './styles.js'

const controlStyles = css(styles, `
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.9);
`)

export default async program => {
  const canvas = document.createElement('canvas')

  canvas.width = window.innerWidth * window.devicePixelRatio
  canvas.height = window.innerHeight * window.devicePixelRatio
  canvas.style.width = '100%'
  canvas.style.height = '100%'

  document.body.style.background = 'black'
  document.body.style.margin = 0

  const renderProgram = await Promise.resolve(program.setup(canvas))
  const state = controls(program.params)

  rafLimit(state).onValue(params => {
    if (renderProgram) {
      renderProgram(params)
    }

    render(document.body, () => html`
      ${canvas}

      <div className=${controlStyles}>
        ${control({
          params,

          mappings: {
            play: null,
            mix: null
          }
        })}
      </div>
    `)
  })
}
