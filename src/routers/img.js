const Router = require('@koa/router')
const router = new Router({
  prefix: '/img'
})
const { barConfiguration } = require('./dataSource/demo')
const { getRadarConfig } = require('./dataSource/radar')
const { createCanvas, loadImage } = require('canvas')
const { ChartJSNodeCanvas } = require('chartjs-node-canvas')

router.get('/chart/demo', async (ctx, next) => {
  const chartJSNodeCanvas = new ChartJSNodeCanvas({
    // type: 'svg',
    width: 800, height: 600
  })
  // const dataUrl = await chartJSNodeCanvas.renderToDataURL(configuration)
  // const stream = chartJSNodeCanvas.renderToStream(configuration)
  const image = await chartJSNodeCanvas.renderToBuffer(barConfiguration)
  ctx.set('Content-Type', 'image/png')
  ctx.set('Cache-Control', 'public,max-age=3600')
  // Content-Type: application/octet-stream
  ctx.body = image
})

router.get('/chart/radar', async (ctx, next) => {
  const chartJSNodeCanvas = new ChartJSNodeCanvas({
    width: 600, height: 600
  })

  const image = await chartJSNodeCanvas.renderToBuffer(getRadarConfig())
  ctx.set('Content-Type', 'image/png')
  ctx.set('Cache-Control', 'public,max-age=3600')
  ctx.body = image
})

// https://cloud.tencent.com/document/product/628/51799
router.post('/gray', async (koaCtx) => {
  const file = koaCtx.request.files.file
  if (!file) {
    koaCtx.throw(404, 'no file')
  }
  const image = await loadImage(file.path)
  // console.log(image)
  // if(file.type)
  const canvas = createCanvas(image.width, image.height)
  const ctx = canvas.getContext('2d')
  ctx.drawImage(image, 0, 0)
  koaCtx.set('Content-Type', 'image/png')

  koaCtx.body = canvas.toBuffer()
})

module.exports = router
