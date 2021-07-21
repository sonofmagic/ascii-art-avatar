const Router = require('@koa/router')
const router = new Router({
  prefix: '/img'
})
const { barConfiguration } = require('./dataSource/demo')
const { getRadarConfig } = require('./dataSource/radar')
// const { createCanvas } = require('canvas')
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

module.exports = router
