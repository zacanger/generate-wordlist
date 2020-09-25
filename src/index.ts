/* eslint-disable no-useless-escape */

import * as fs from 'fs'
import * as path from 'path'

const args = process.argv.slice(2)

if (module.parent || !args[0] || !args[1]) {
  console.log('Usage: generate-wordlist.js input output [--no-punc]')
  process.exit(0)
}

const pReg =
  args[2] && args[2] === '--no-punc' ? /[!#$%&()*,./:;=[\]^_`{}~\-]/g : ''

export const uniq = <T>(xs: Array<T>): Array<T> =>
  xs.filter((v, i, s) => s.indexOf(v) === i)

const pRep = pReg ? ' ' : ''

fs.writeFileSync(
  args[1],
  uniq(
    fs
      .readFileSync(path.resolve(args[0]))
      .toString()
      .replace(pReg, pRep)
      .split(/\s/)
      .sort()
  ).join('\n') + '\n'
)
