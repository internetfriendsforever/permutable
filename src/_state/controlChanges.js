import { merge } from 'kefir'
import booleanControl from './boolean.js'
import numberControl from './number.js'
import samplerControl from './sampler.js'

export default merge([
  booleanControl,
  numberControl,
  samplerControl
])