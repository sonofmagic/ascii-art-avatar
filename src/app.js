const Koa = require('koa')
const cors = require('@koa/cors')

// const { isProd } = require('./env')
const koaBody = require('koa-body')
const app = new Koa()
app.use(cors())
app.use(koaBody({
  multipart: true
}))
const router = require('./routers')

app.use(router.routes()).use(router.allowedMethods())

// app.use((ctx) => {
//   ctx.redirect('https://www.icebreaker.top/')
// })

app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app
