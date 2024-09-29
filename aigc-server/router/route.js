const koaRouter = require("@koa/router")//引入路由
const router = new koaRouter()
const multer = require('@koa/multer');
const upload = multer({ dest: 'public/avataruploads/' })//自动生成upload文件夹存放目标资源
// 获取腾讯语言识别token
// 用户相关的
const user = require('@/controller/user')
const zhipu  =require('@/controller/zhipuai')
const audio = require("@/controller/audio")
router.post("/ai/avatar",upload.single('avatar'),user.sotregeAvatar)
router.post("/ai/wxlogin",user.wxLogin)
router.post("/ai/createCompletions",zhipu.createCompletions)//文生文
router.post("/ai/createImages",zhipu.createImages) // 文生图
router.get("/ai/audioToken",audio.aliToken)//获取腾讯云语言token


module.exports =router