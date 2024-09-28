const Koa =require("koa")
const KoaRedis = require("ioredis")

const app = new Koa()//引入koa模块
const { addAliases } = require("module-alias")
addAliases({
    '@': __dirname
})// 配置路径别名
const responseHandler = require("@/config/result");// 统一接口响应数据格式:中间件
const errorHandler = require("@/config/errorhandler");//捕获错误中间件
const router = require('./router/route')
const json = require('koa-json')//将http响应数据转化为json格式 
const bodyParser = require('koa-bodyparser')//解析http的请求body(消息)体
const cors  =require("@koa/cors")
app.use(json())//引入中间件
app.use(bodyParser())
app.use(cors())
app.use(responseHandler).use(errorHandler);
// 链接redis
const redisClient= new KoaRedis({
    port: 6379,
    host: 'localhost',
})
// 注册redis中间件
app.use(async (ctx, next)=>{
    ctx.redis = redisClient
    await next()
})

app.use(router.routes()).use(router.allowedMethods())//解决请求方式搞错
app.listen(7000)//端口7000
console.log("服务器启动成功,端口7000")
