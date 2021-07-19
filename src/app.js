const Koa = require('koa')
const app = new Koa()

const router = require('./routers')

app.use(router.routes()).use(router.allowedMethods())

app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app
