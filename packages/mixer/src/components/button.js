import { css } from 'emotion'

const styles = active => css`
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
`

export default function button ({ key = 'button', id, active, label, wires }) {
  const { wire } = wires(key)

  return wire`
    <button id=${id} className=${styles(active)}>
      ${label}
    </div>
  `
}
