#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const { lookpath } = require('lookpath')
const { spawn } = require('node:child_process')
const log = console.log


const loop = () => {
  let nextPath = ''
  const cwd = process.cwd()
  const child = spawn('peco')
  child.stdout.on('data', d => nextPath = d.toString().trim())
  child.on('exit', () => {
    if (nextPath === '') {
      log(cwd)
      process.exit(0)
    } else {
      try {
        process.chdir(path.join(cwd, nextPath))
      } catch (err) {
        process.exit(1)
      }
      loop()
    }
  })
  fs.readdir(cwd, { withFileTypes: true }, (err, files) => {
    if (err) { process.exit(1) }
    else {
      const dirs = files
                      .filter(f => f.isDirectory())
                      .map(f => f.name)
      if (dirs.length === 0) {
        log(cwd)
        process.exit(0)
      }
      else {
        dirs.forEach(i => child.stdin.write(`${i}\n`))
      }
    }
  })
}

const main = async () => {
  const peco = await lookpath('peco')
  if (peco === undefined) {
    log('peco does not found. Check if peco is installed and added to $PATH.')
    process.exit(1)
  }
  process.on('SIGINT', () => {
    log('SIGINT is passed. exit.')
    process.exit(1)
  })
  loop()
}

main()
