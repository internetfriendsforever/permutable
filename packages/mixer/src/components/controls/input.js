import { css } from 'emotion'
import button from '../button'

const container = css`
  margin-left: 0.5rem;
`

export default function input ({ key = 'input', mapping, wires }) {
  const { wire, next } = wires(key)

  const mappingId = mapping ? mapping.id : ''
  const active = mapping ? mapping.pending : false
  const label = mapping && mapping.input ? `${mapping.input.name} #${mapping.port}` : 'Input'

  return wire`
    <div className=${container} data-input data-pending=${active} data-mapping-id=${mappingId}>
      ${button({
        active,
        label,
        wires: next
      })}
    </div>
  `
}
