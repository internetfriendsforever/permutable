const knobs = Array.from(document.querySelectorAll('.knob'))

knobs.forEach(knob => {
  const indicator = knob.querySelector('line')

  let value = 0.5

  function turn (amount) {
    value = Math.min(1, Math.max(0, value + amount / 100))
    indicator.setAttribute('transform', `rotate(${(value - 0.5) * 290})`)
  }

  knob.addEventListener('pointerdown', function (event) {
    let x = event.clientX

    knob.classList.add('turning')

    function move (event) {
      turn(event.clientX - x)
      x = event.clientX
    }

    function up () {
      knob.classList.remove('turning')
      document.removeEventListener('pointermove', move)
      document.removeEventListener('pointerup', up)
    }

    document.addEventListener('pointermove', move)
    document.addEventListener('pointerup', up)
  })
})
