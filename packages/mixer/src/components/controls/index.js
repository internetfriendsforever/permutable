import floatControl from './float'
import booleanControl from './boolean'

export default function control ({ item, key, wires }) {
  switch (typeof item.value) {
    case 'number':
      return floatControl({ item, key, wires })
    default:
      return booleanControl({ item, key, wires })
  }
}
