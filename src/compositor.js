export default {
  channelParams: {
    mix: {
      type: 'number'
    }
  },

  params: {
    brightness: {
      type: 'number',
      value: 1
    }
  },

  setup (canvas) {
    const context = canvas.getContext('2d')

    return function render (channels, values) {
      const { width, height } = canvas

      context.globalCompositeOperation = 'source-over'
      context.globalAlpha = 1
      context.fillRect(0, 0, canvas.width, canvas.height)

      context.globalCompositeOperation = 'screen'

      channels.forEach(channel => {
        context.globalAlpha = channel.params.values.mix
        context.drawImage(channel.program.canvasElement, 0, 0)
      })

      const { brightness } = values

      if (brightness < 1) {
        context.globalCompositeOperation = 'source-over'
        context.globalAlpha = 1 - brightness
        context.fillRect(0, 0, width, height)
      }
    }
  }
}
