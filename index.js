#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const args = process.argv.slice(2)

if (module.parent || !args[0] || !args[1]) {
  console.log('Usage: generate-wordlist.js input output [--no-punc]')
  process.exit(0)
}

const pReg = args[2] && args[2] === '--no-punc'
  ? /[.,\/#!$%\^&\*;:{}\[\]=\-_`~()]/g
  : ''

const pRep = pReg ? ' ' : ''

fs.writeFileSync(args[1],
  [...new Set(fs.readFileSync(path.resolve(args[0]))
    .toString()
    .replace(pReg, pRep)
    .split(/\s/)
    .sort())].join('\n') + '\n')
