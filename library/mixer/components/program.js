import css from '../../css.js'
import button from '../../button.js'

const styles = {
  container: css(`
    flex: auto;
    border-bottom: 2px #aaa solid;
  `),

  button: css(`
    display: block;
    padding: 0.75rem;
    padding-right: 1.75rem;
    width: 100%;
  `)
}

export default function program ({ name, wires }) {
  const { wire, next } = wires(name)

  return wire`
    <div className=${styles.container} data-program data-name=${name}>
      ${button({
        className: styles.button,
        label: name,
        wires: next
      })}
    </div>
  `
}
