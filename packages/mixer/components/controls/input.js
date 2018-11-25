import css from '../../libraries/css.js'
import button from '../button.js'

const styles = {
  container: css(`
    margin-left: 0.5rem;
  `)
}

export default function input ({ key = 'input', mapping, wires }) {
  const { wire, next } = wires(key)

  const { id, port, pending } = Object.assign({
    id: '',
    port: '',
    pending: false
  }, mapping)

  return wire`
    <div className=${styles.container} data-input data-pending=${pending} data-port=${port} data-id=${id}>
      ${button({
        label: id || 'input',
        active: pending,
        wires: next
      })}
    </div>
  `
}
