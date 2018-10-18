import floatControl from './float'
import booleanControl from './boolean'

export default function control (props) {
  switch (typeof props.value) {
  case 'number':
    return floatControl(props)
  default:
    return booleanControl(props)
  }
}
