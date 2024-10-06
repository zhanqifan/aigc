const Koa = require("koa");
const KoaRedis = require("ioredis");
const koaStatic  = require("koa-static");
const path = require("path");
require("dotenv").config();
const app = new Koa(); //引入koa模块
const { addAliases } = require("module-alias");
addAliases({
  "@": __dirname,
}); // 配置路径别名
const responseHandler = require("@/config/result"); // 统一接口响应数据格式:中间件
const errorHandler = require("@/config/errorhandler"); //捕获错误中间件
const router = require("./router/route");
const json = require("koa-json"); //将http响应数据转化为json格式
const bodyParser = require("koa-bodyparser"); //解析http的请求body(消息)体
const cors = require("@koa/cors");
const whiteRouter = ["/ai/wxlogin", "/ai/avatar","/","/favicon.ico"]; //白名单
const JWT = require("@/config/jwt"); //Jsonwebtoken
app.use(json()); //引入中间件
app.use(bodyParser());
app.use(cors());
app.use(responseHandler).use(errorHandler);
app.use(koaStatic (path.join(__dirname, "/public")));
app.use(async (ctx, next) => {
  const url = ctx.request.url;
  if (whiteRouter.includes(url)) {
    await next();
    return;
  }

  const token = ctx.request.headers["authorization"].split(" ")[1];
  console.log(token);
  if (token) {
    const payload = JWT.verify(token);
    if (payload) {
      // 生成新的token
      let newToken = JWT.generate(
        {
          openid: payload.openid,
          username: payload.username,
        }
      );
      ctx.set("Access-Control-Expose-Headers", "Authorization");
      ctx.set("Authorization", newToken); // 设置 Authorization 头
      ctx.auth=payload.openid
      await next();
    } else {
      ctx.send({ data: "token已过期或无效", code: 401 });
    }
  } else {
    ctx.send({ data: "token不存在", code: 401 });
  }
});

// 链接redis
const redisClient = new KoaRedis({
  port: 6379,
  host: process.env.IP,
});

// 监听连接成功事件
redisClient.on('connect', () => {
  console.log('Redis连接成功！');
});

// 监听连接错误事件
redisClient.on('error', (err) => {
  console.error('Redis连接失败:', err);
});

// 注册redis中间件
app.use(async (ctx, next) => {
  ctx.redis = redisClient;
  await next();
});

app.use(router.routes()).use(router.allowedMethods()); //解决请求方式搞错
app.listen(7000); //端口7000
console.log("服务器启动成功,端口7000");
