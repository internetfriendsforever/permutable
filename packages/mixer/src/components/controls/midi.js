import html from 'nanohtml'
import { css } from 'emotion'
import button from '../button'

const container = css`
  margin-left: 0.5rem;
`

export default function control ({ id, mapping, mapped }) {
  return html`
    <div className=${container} data-midi data-mapping=${mapping}>
      ${button({ id, active: mapping, label: 'Midi' })}
    </div>
  `
}

// const { mapping, mapped } = this.state
// <Button mapping={mapping} onClick={this.onMapClick}>
//     {mapped ? `${mapped.input.name} #${mapped.port}` : 'Map'}
//   </Button>
