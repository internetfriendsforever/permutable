import css from '@happycat/css'

const styles = {
  button: active => css(`
    display: block;
    font: inherit;
    text-transform: inherit;
    background: transparent;
    color: #aaa;
    cursor: pointer;
    border: 0;
    margin: 0;
    padding: 0;
    outline: 0;
    white-space: nowrap;
    text-align: left;

    ${active ? `
      color: gold;
      border-color: gold;
    ` : `
      :hover {
        color: white;
        border-color: white;
      }

      :active {
        color: gold;
        border-color: gold;
      }
    `}
  `)
}

export default function button ({ key = 'button', id, active, label, wires, className }) {
  const { wire } = wires(key)

  return wire`
    <button id=${id} className=${css(styles.button(active), className)}>
      ${label}
    </div>
  `
}
