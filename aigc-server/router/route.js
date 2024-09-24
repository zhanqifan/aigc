const koaRouter = require("@koa/router")//引入路由
const router = new koaRouter()

// 用户相关的
const user = require('@/controller/user')

router.post('/wxlogin',user.wxLogin)

module.exports =router