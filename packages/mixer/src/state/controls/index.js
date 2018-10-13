import { merge } from 'kefir'
import booleanControl from './boolean'
import floatControl from './float'

export default merge([
  booleanControl,
  floatControl
])
