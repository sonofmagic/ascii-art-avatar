const Router = require('@koa/router')
const svgRouter = require('./svg')
const router = new Router({
  prefix: '/api/v1'
})

router.use(svgRouter.routes()).use(svgRouter.allowedMethods())

module.exports = router
