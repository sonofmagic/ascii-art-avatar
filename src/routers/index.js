const Router = require('@koa/router')
const svgRouter = require('./svg')
const imgRouter = require('./img')
const router = new Router({
  prefix: '/api/v1'
})

router.use(svgRouter.routes()).use(svgRouter.allowedMethods())
router.use(imgRouter.routes()).use(imgRouter.allowedMethods())
module.exports = router
