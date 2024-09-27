const koaRouter = require("@koa/router")//引入路由
const router = new koaRouter()

// 用户相关的
const user = require('@/controller/user')
const zhipu  =require('@/controller/zhipuai')

router.post('/ai/wxlogin',user.wxLogin)
router.post('/ai/createCompletions',zhipu.createCompletions)//文生文
router.post("/ai/createImages",zhipu.createImages) // 文生图

module.exports =router