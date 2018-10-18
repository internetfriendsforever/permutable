import { css } from 'emotion'
import button from '../button'

const container = css`
  margin-left: 0.5rem;
`

export default function control ({ key = 'midi', mapping, input, wires }) {
  const { wire, next } = wires(key)

  return wire`
    <div className=${container} data-midi data-mapping=${mapping}>
      ${button({
        active: mapping && mapping.pending,
        label: mapping ? `${mapping.input.name} #${mapping.port}` : 'Midi',
        wires: next
      })}
    </div>
  `
}
