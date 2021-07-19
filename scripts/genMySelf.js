const { createCanvas, loadImage } = require('canvas')
const fs = require('fs')
const path = require('path')

;(async () => {
  const image = await loadImage(path.resolve(__dirname, 'myself.jpg'))
  const { width, height } = image

  const canvas = createCanvas(width, height, 'svg')
  const ctx = canvas.getContext('2d')
  ctx.drawImage(image, 0, 0, width, height)

  // Use the normal primitives.
  // svg 下使用 svg image + base64实现的，反而使得svg变得非常的大，不值得
  fs.writeFileSync(path.resolve(__dirname, 'myself.svg'), canvas.toBuffer())
})()
