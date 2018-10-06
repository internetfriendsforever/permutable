// function client (params) {
//
// }

// client(['hue', 'rotation'], ({ canvas, params }) => {
//   params.listen(() => {
//     console.log(params)
//   })
// })

// client(['hue', 'angle'], ({ output, params }) => {
//
//
//
//
// })

class Permutable {
  constructor (keys) {
    this.keys = keys
  }

  broadcast () {
  }
}

function permutable (keys) {
  const output = document.createElement('canvas')
  const input = {}

  return {
    input,
    output
  }
}
