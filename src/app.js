if (process.env.PLATFORM === 'vercel') {
  require('./init/vercel')
}

const Koa = require('koa')
const cors = require('@koa/cors')
const path = require('path')
const koaBody = require('koa-body')
const serve = require('koa-static')
const app = new Koa()
app.use(serve(path.resolve(__dirname, '..', 'public')))
app.use(cors())
app.use(
  koaBody({
    multipart: true,
  })
)
const router = require('./routers')

app.use(router.routes()).use(router.allowedMethods())

// app.use((ctx) => {
//   ctx.redirect('https://www.icebreaker.top/')
// })

app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app
