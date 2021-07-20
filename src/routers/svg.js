const Router = require('@koa/router')
const router = new Router({
  prefix: '/svg'
})

const { createCanvas } = require('canvas')
const { ChartJSNodeCanvas } = require('chartjs-node-canvas');


router.get('/', (koaCtx, next) => {
  const canvas = createCanvas(200, 200, 'svg')
  const ctx = canvas.getContext('2d')

  // Write "Awesome!"
  ctx.font = '30px Impact'
  ctx.rotate(0.1)
  ctx.fillText('Awesome!', 50, 100)

  // Draw line under text
  const text = ctx.measureText('Awesome!')
  ctx.strokeStyle = 'rgba(0,0,0,0.5)'
  ctx.beginPath()
  ctx.lineTo(50, 102)
  ctx.lineTo(50 + text.width, 102)
  ctx.stroke()
  const svgUrl = canvas.toBuffer().toString()
  koaCtx.body = svgUrl
})

router.get('/chart', (ctx) => {
  const chartJSNodeCanvas = new ChartJSNodeCanvas({
    type: 'svg', width: 800, height: 600
  });


})

module.exports = router
