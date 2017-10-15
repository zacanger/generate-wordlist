#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const args = process.argv.slice(2)

if (module.parent || !args[0] || !args[1]) {
  console.log('Usage: generate-wordlist.js input output')
  process.exit(0)
}

fs.writeFileSync(args[1],
  [...new Set(fs.readFileSync(path.resolve(args[0]))
    .toString()
    .split(/\s/g)
    .sort())].join('\n'))
