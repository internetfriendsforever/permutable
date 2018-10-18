import { css } from 'emotion'
import button from '../button'

const container = css`
  margin-left: 0.5rem;
`

export default function control ({ key = 'midi', mapping, mapped, wires }) {
  const { wire, next } = wires(key)

  return wire`
    <div className=${container} data-midi data-mapping=${mapping}>
      ${button({ active: mapping, label: 'Midi', wires: next })}
    </div>
  `
}

// const { mapping, mapped } = this.state
// <Button mapping={mapping} onClick={this.onMapClick}>
//     {mapped ? `${mapped.input.name} #${mapped.port}` : 'Map'}
//   </Button>
