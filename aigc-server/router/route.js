const koaRouter = require("@koa/router")//引入路由
const router = new koaRouter()
const multer = require('@koa/multer');
// 获取腾讯语言识别token
// 用户相关的
// 自定义存储设置
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/avataruploads/'); // 目标存储目录
    },
    filename: (req, file, cb) => {
        const newFilename = file.originalname; // 生成新的文件名（可以根据需要自定义）
        cb(null, newFilename);
    }
});

const upload = multer({ storage }); // 使用自定义存储设置
const user = require('@/controller/user')
const zhipu  =require('@/controller/zhipuai')
const audio = require("@/controller/audio")
router.post("/ai/avatar",upload.single('avatar'),user.sotregeAvatar)//头像上传
router.post("/ai/wxlogin",user.wxLogin)//用户登录
router.post("/ai/createCompletions",zhipu.createCompletions)//文生文
router.post("/ai/createImages",zhipu.createImages) // 文生图
router.get("/ai/audioToken",audio.aliToken)//获取阿里云语言token
router.post("/ai/saveChatRecord",zhipu.storegeMessage) //存储对话信息  
router.get("/ai/getChatRecord",zhipu.fetchMessage)//获取历史对话列表
router.get("/ai/getChatDetail",zhipu.onlineChatHistory)//获取历史对话单条聊天记录
module.exports =router