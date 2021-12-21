const { createCanvas, loadImage } = require('canvas')
const fs = require('fs')
const path = require('path')
const art = require('ascii-art')
// const Color = require('ascii-art-ansi/colors')
// Color.is256 = true

async function createByCanvas () {
  const image = await loadImage(path.resolve(__dirname, 'myself.jpg'))
  const { width, height } = image

  const canvas = createCanvas(width, height, 'svg')
  const ctx = canvas.getContext('2d')
  ctx.drawImage(image, 0, 0, width, height)

  // Use the normal primitives.
  // svg 下使用 svg image + base64实现的，反而使得svg变得非常的大，不值得
  fs.writeFileSync(path.resolve(__dirname, 'myself.svg'), canvas.toBuffer())
}

async function createByArt () {
  const result = await new Promise((resolve, reject) => {
    art.image({
      filepath: './scripts/myself.jpg',
      rows: 80,
      cols: 80,
      stipple: '#000000',
      posterize: true,
      threshold: 40
      // alphabet:"blocks"
    }, (err, result) => {
      if (err) {
        reject(err)
      }
      resolve(result)
    })
  })
  console.log(result)
  fs.writeFileSync(path.resolve(__dirname, 'myself.txt'), result, {
    encoding: 'utf-8'
  })
}

module.exports = {
  createByCanvas,
  createByArt
}
