#!/usr/bin/env node

const { lookpath } = require('lookpath')
const { spawn } = require('node:child_process')
const log = console.log

const main = async () => {
  const peco = await lookpath('peco')
  if (peco === undefined) {
    log('peco does not found. Check if peco is installed and added to $PATH.')
    process.exit(1)
  } else {
    log('use peco at', peco)
  }
  const child = spawn('peco', ['--version'])
  child.stdout.on('data', d => log(d.toString()))
}

main()
