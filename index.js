#!/usr/bin/env node
const fs = require('fs')
const { lookpath } = require('lookpath')
const { spawn } = require('node:child_process')
const log = console.log

const main = async () => {
  const peco = await lookpath('peco')
  if (peco === undefined) {
    log('peco does not found. Check if peco is installed and added to $PATH.')
    process.exit(1)
  }
  const cwd = process.cwd()
  const child = spawn('peco')
  child.stdout.on('data', d => log('[peco] ', d.toString()))
  const files = fs.readdirSync(cwd)
  files.forEach(i => child.stdin.write(`${i}\n`))
}

main()
