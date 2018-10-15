import floatControl from './float'
import booleanControl from './boolean'

export default function control ({ id, item, key }) {
  switch (typeof item.value) {
    case 'number':
      return floatControl({ id, item, key })
    default:
      return booleanControl({ id, item, key })
  }
}
