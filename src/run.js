import css from '@happycat/css'
import styles from './styles.js'
import './elements/index.js'

export default async program => {
  const canvas = document.createElement('canvas')

  canvas.width = window.innerWidth * window.devicePixelRatio
  canvas.height = window.innerHeight * window.devicePixelRatio
  canvas.style.width = '100%'
  canvas.style.height = '100%'

  document.body.style.background = 'black'
  document.body.style.margin = 0
  document.body.appendChild(canvas)

  const { setup, params } = program
  const render = await Promise.resolve(setup(canvas))

  const paramsContainer = document.createElement('table')

  paramsContainer.className = css(styles, `
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.9);
  `)

  document.body.appendChild(paramsContainer)

  for (let key in params) {
    const { type, ...props } = params[key]
    const element = document.createElement('tr', {
      is: `p-${type}-param`
    })

    element.setAttribute('key', key)

    for (let prop in props) {
      element.setAttribute(prop, props[prop])
    }

    paramsContainer.appendChild(element)
  }

  let renderRequest

  function queueRender () {
    if (!renderRequest) {
      renderRequest = window.requestAnimationFrame(() => {
        renderRequest = null

        const values = {}

        for (let element of paramsContainer.childNodes) {
          values[element.getAttribute('key')] = element.value
        }

        if (render) {
          render(values)
        }
      })
    }
  }

  document.addEventListener('change', queueRender)

  queueRender()
}
