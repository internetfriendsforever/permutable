import { merge } from '../../libraries/kefir.js'
import booleanControl from './boolean.js'
import floatControl from './float.js'

export default merge([
  booleanControl,
  floatControl
])
