import { wire } from '../../libraries/hyperhtml.js'

const pool = {}

export default function wires (a) {
  return {
    wire: pool[a] || (pool[a] = wire()),
    next: b => wires(`${a}.${b}`)
  }
}
