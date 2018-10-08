import { wire } from '../libraries/hyperhtml.js'
import css from '../css.js'

const itemClassName = css`
  cursor: grab;
`

function onMouseDown (e, item) {
  e.currentTarget.dispatchEvent(
    new window.CustomEvent('SortableStart', {
      detail: item,
      bubbles: true
    })
  )
}

export default function sortableItem ({ item, children }) {
  return wire(item)`
    <li
      className=${itemClassName}
      onMouseDown=${e => onMouseDown(e, item)}
    >
      ${children}
    </li>
  `
}
