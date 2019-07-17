export const channelParams = {
  compose: {
    type: 'toggle'
  },

  offset: {
    type: 'number',
    value: 0.05
  },

  duration: {
    type: 'number',
    value: 0.2
  },

  every: {
    type: 'number',
    min: 1,
    value: 1,
    max: 8,
    step: 1
  }
}

export const params = {
  bpm: {
    type: 'bpm'
  },

  screen: {
    type: 'toggle'
  },

  time: {
    type: 'timer'
  }
}

export function setup (canvas) {
  const context = canvas.getContext('2d')

  return function render (channels, { bpm, time, screen }) {
    const { width, height } = canvas

    const beat = (time / 60) * bpm

    context.globalCompositeOperation = 'source-over'
    context.fillRect(0, 0, canvas.width, canvas.height)

    if (screen) {
      context.globalCompositeOperation = 'screen'
    }

    channels.filter(channel => {
      const { compose, offset, duration, every } = channel.params.values

      if (compose) {
        const beat = ((time / 60) * bpm) + offset
        return Math.floor((beat / every) % 1 + duration / every)
      }
    }).forEach(channel => {
      context.drawImage(channel.program.canvasElement, 0, 0)
    })
  }
}
