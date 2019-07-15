export const channelParams = {
  compose: {
    type: 'toggle'
  }
}

export const params = {
  bpm: {
    type: 'number',
    value: 120,
    min: 40,
    max: 220,
    step: 0.5
  },

  time: {
    type: 'timer'
  }
}

export function setup (canvas) {
  const context = canvas.getContext('2d')

  return function render (channels, values) {
    const activeChannels = channels.filter(channel => (
      channel.params.values.compose
    ))

    const { width, height } = canvas

    const ms = values.time * 1000
    const beat = ms * (values.bpm / 60000)

    context.fillRect(0, 0, canvas.width, canvas.height)

    if (activeChannels.length) {
      const index = Math.floor(beat) % activeChannels.length
      const channel = activeChannels[index]

      context.drawImage(channel.program.canvasElement, 0, 0)
    }
  }
}
