#!/usr/bin/env node

(async () => {
  const { lookpath } = require('lookpath')
  console.log('Combo version 1.0.0')

  const peco = await lookpath('peco')
  console.log(peco)

  const TCTDNE = await lookpath('TheCommandThatDoesNotExist')
  console.log(TCTDNE)
})()
