#!/usr/bin/env node

const readline = require('readline')
const fs = require('fs')
const path = require('path')
const log = console.log
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})
const cwd = process.cwd()
const filenameList = fs.readdirSync(cwd)

let idx = 0
const total = filenameList.length
function showPhoto (filename, idx) {
  const photo = fs.readFileSync(path.resolve(cwd, filename), {
    encoding: 'utf-8'
  })
  log('\n')
  log(photo)
  log(`\n[page]:${idx + 1}/${total} [filename]:${filename} (prev: '← ↑' next: '→ ↓' ESC: 'ctrl + c')`)
}

showPhoto(filenameList[idx], idx)
const onKeypress = function (str, key) {
  if (key.name === 'right' || key.name === 'down') {
    idx++
    if (idx >= total) {
      idx -= total
    }
    showPhoto(filenameList[idx], idx)
  }
  if (key.name === 'left' || key.name === 'up') {
    idx--
    if (idx < 0) {
      idx += total
    }
    showPhoto(filenameList[idx], idx)
  }
}
process.stdin.on('keypress', onKeypress)
rl.on('close', () => {
  process.stdin.off('keypress', onKeypress)
})
