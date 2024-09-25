* 项目安装依赖koa koa-json koa-bodyparser @koa/router @koa/cors module-alias logjs dayjs nodemon  sequelize mysql2 zhipuai-sdk-nodejs-v4
* squelize文档地址(https://github.com/demopark/sequelize-docs-Zh-CN/blob/master/core-concepts/getting-started.md)
** 示例
const Koa =require("koa")
const app = new Koa()//引入koa模块
const json = require('koa-json')//将http响应数据转化为json格式 
const bodyParser = require('koa-bodyparser')//解析http的请求body(消息)体
const cors  =require("@koa/cors")
const koaRouter = require("@koa/router")//引入路由
const router = new koaRouter()

app.use(json())//引入中间件
app.use(bodyParser())
app.use(cors())

router.get("/test",(ctx)=>{
    const { name } =ctx.query
    console.log(name)
    ctx.body = {
        msm:'success',
        data:name
    }
    ctx.status=200
})
router.post("/test1",(ctx)=>{
    const { name } =ctx.request.body
    console.log(name)
    ctx.body = {
        msm:'success',
        data:name
    }
    ctx.status=200
})

app.use(router.routes()).use(router.allowedMethods())//解决请求方式搞错
app.listen(7000)//端口7000
console.log("服务器启动成功,端口7000")
