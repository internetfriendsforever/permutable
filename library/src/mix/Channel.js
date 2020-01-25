import Params from '../params/Params'

export default class Channel {
  constructor (program, params) {
    this.program = program

    this.element = document.createElement('tr')
    this.element.classList.add('channel')

    this.params = new Params(params)

    this.element.innerHTML = `
      <td class="title">${program.name}</td>
      <td class="params">
        <table data-program-params></table>
      </td>
      <td data-canvas class="canvas">
        <button data-remove class="remove-button">
          ×
        </button>
      </td>
      <td class="compose params">
        <table data-channel-params></table>
      </td>
    `

    this.remove = this.remove.bind(this)
    this.removeButton = this.element.querySelector('[data-remove]')
    this.removeButton.addEventListener('click', this.remove)

    this.programParamsCell = this.element.querySelector('[data-program-params]')
    this.programParamsCell.appendChild(program.params.element)

    this.paramsCell = this.element.querySelector('[data-channel-params]')
    this.paramsCell.appendChild(this.params.element)

    this.canvasContainer = this.element.querySelector('[data-canvas]')
    this.canvasContainer.appendChild(program.canvasElement)
  }

  remove () {
    this.element.dispatchEvent(new CustomEvent('remove'))
    this.removeButton.removeEventListener('click', this.remove)
    this.program.remove()
    this.element.remove()
  }
}
