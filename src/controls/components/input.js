import css from '@happycat/css'
import button from '../../button.js'

const styles = {
  button: css(`
    padding: 0.15em 0.4em;
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
    <div data-input data-pending=${pending} data-port=${port} data-id=${id}>
      ${button({
        label: id || 'input',
        className: styles.button,
        active: pending,
        wires: next
      })}
    </div>
  `
}
