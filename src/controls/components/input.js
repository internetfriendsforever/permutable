import { html } from 'lighterhtml'
import css from '@happycat/css'
import button from '../../button.js'

const styles = {
  button: css(`
    padding: 0.15em 0.4em;
  `)
}

export default function input ({ key = 'input', mapping }) {
  const { id, port, pending } = Object.assign({
    id: '',
    port: '',
    pending: false
  }, mapping)

  return html`
    <div data-input data-pending=${pending} data-port=${port} data-id=${id}>
      ${button({
        label: id || 'input',
        className: styles.button,
        active: pending
      })}
    </div>
  `
}
