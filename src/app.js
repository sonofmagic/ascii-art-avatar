const Koa = require('koa')
const app = new Koa()

const router = require('./routers')

app.use(router.routes()).use(router.allowedMethods())

// app.use((ctx) => {
//   ctx.redirect('https://www.icebreaker.top/')
// })

app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app
