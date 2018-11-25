import events from './events.js'

const findOpenOutput = event => event.target.closest('#open-output')

const output = events.click.filter(findOpenOutput).map(() => {
  const win = window.open('', 'Output', 'location=0,width=1280,height=720')
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')

  win.addEventListener('load', e => {
    const { body } = win.document
    body.style.margin = 0
    body.style.background = 'black'
    body.appendChild(canvas)
    canvas.style.width = '100vw'
    canvas.style.height = '100vh'
  })

  return {
    win,
    canvas,
    context
  }
})

export default output
  .scan((all, output) => [...all, output], [])
  .toProperty(() => [])
