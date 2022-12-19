#!/usr/bin/env node

const log = console.log

const main = async () => {
  const { lookpath } = require('lookpath')
  log('Combo version 1.0.0')

  const peco = await lookpath('peco')
  if (peco === undefined) {
    log('peco does not found. Check if peco is installed and added to $PATH.')
    process.exit(1)
  } else {
    log('use peco at', peco)
  }
}

main()
