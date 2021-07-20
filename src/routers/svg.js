const Router = require('@koa/router')
const router = new Router({
  prefix: '/svg'
})

const { createCanvas } = require('canvas')
const { ChartJSNodeCanvas } = require('chartjs-node-canvas')

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

const configuration = {
  type: 'bar',
  data: {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          callback: (value) => '$' + value
        }
      }]
    }
  }
}

router.get('/chart', async (ctx, next) => {
  const chartJSNodeCanvas = new ChartJSNodeCanvas({
    // type: 'svg',
    width: 800, height: 600
  })
  // const dataUrl = await chartJSNodeCanvas.renderToDataURL(configuration)
  // const stream = chartJSNodeCanvas.renderToStream(configuration)
  const image = await chartJSNodeCanvas.renderToBuffer(configuration)
  ctx.set('Content-Type', 'image/png')
  ctx.set('Cache-Control', 'public,max-age=3600')
  // Content-Type: application/octet-stream
  ctx.body = image
})

module.exports = router
