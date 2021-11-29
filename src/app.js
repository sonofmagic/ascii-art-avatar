const Koa = require('koa')
const cors = require('@koa/cors')
const views = require('koa-views')
const path = require('path')
// const { isProd } = require('./env')
const koaBody = require('koa-body')
const app = new Koa()

const render = views(path.resolve(__dirname, 'views'), {
  map: {
    hbs: 'handlebars'
  }
})
app.use(render)
app.use((ctx) => {
  ctx.state = { firstname: 'my title', author: 'lastname' }
  return ctx.render('./index.hbs')
})
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
