import { merge } from '../../libraries/kefir.js'
import booleanControl from './boolean.js'
import floatControl from './float.js'
import samplerControl from './sampler.js'

export default merge([
  booleanControl,
  floatControl,
  samplerControl
])
