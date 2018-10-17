import floatControl from './float'
import booleanControl from './boolean'

export default function control ({ id, value, key }) {
  switch (typeof value) {
    case 'number':
      return floatControl({ id, value, key })
    default:
      return booleanControl({ id, value, key })
  }
}
