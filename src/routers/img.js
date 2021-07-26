const Router = require('@koa/router')
const router = new Router({
  prefix: '/img'
})
const { barConfiguration } = require('./dataSource/demo')
const { getRadarConfig } = require('./dataSource/radar')
const { getF2PieData } = require('./dataSource/f2-pie')
const { createCanvas, loadImage } = require('canvas')
const { ChartJSNodeCanvas } = require('chartjs-node-canvas')
const F2 = require('@antv/f2')
const { getRepository } = require('../api/repository')
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
    width: 1200, height: 1200
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
  const canvas = createCanvas(image.width, image.height)
  const ctx = canvas.getContext('2d')
  ctx.drawImage(image, 0, 0)
  const c = ctx.getImageData(0, 0, image.width, image.height)
  for (let i = 0; i < c.height; i++) {
    for (let j = 0; j < c.width; j++) {
      const x = (i * 4) * c.width + (j * 4)
      const r = c.data[x]
      const g = c.data[x + 1]
      const b = c.data[x + 2]
      c.data[x] = c.data[x + 1] = c.data[x + 2] = (r + g + b) / 3
    }
  }
  ctx.putImageData(c, 0, 0, 0, 0, c.width, c.height)
  koaCtx.set('Content-Type', 'image/png')

  koaCtx.body = canvas.toBuffer()
})

router.get('/chart/f2', async (koaCtx, next) => {
  const canvas = createCanvas(375 * 2, 260 * 2)
  const chart = new F2.Chart({
    context: canvas.getContext('2d'),
    width: 375 * 2,
    height: 260 * 2,
    animate: false,
    padding: [45, 'auto', 'auto']
  })
  chart.source(getF2PieData(), {
    percent: {
      formatter (val) {
        return val * 100 + '%'
      }
    }
  })
  chart.legend({
    position: 'right'
  })
  chart.coord('polar', {
    transposed: true,
    radius: 0.85
  })
  chart.axis(false)
  chart.interval()
    .position('a*percent')
    .color('name', ['#1890FF', '#13C2C2', '#2FC25B', '#FACC14', '#F04864', '#8543E0'])
    .adjust('stack')
    .style({
      lineWidth: 1,
      stroke: '#fff',
      lineJoin: 'round',
      lineCap: 'round'
    })

  chart.render()
  koaCtx.set('Content-Type', 'image/png')
  koaCtx.set('Cache-Control', 'public,max-age=3600')
  koaCtx.body = canvas.toBuffer()
  // canvas.toBuffer()
})

router.get('/chart/repo', async (ctx, next) => {
  const data = await getRepository()
  ctx.body = data
})

module.exports = router
