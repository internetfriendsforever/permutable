import { wire } from '../libraries/hyperhtml.js'

function onStart (e) {
  console.log('Sortable start', e.detail)
}

export default function sortableList (items) {
  return wire(items)`
    <ul onSortableStart=${onStart}>${items}</ul>
  `
}
