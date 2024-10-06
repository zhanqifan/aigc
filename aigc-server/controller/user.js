const Validate = require('@/validate/index')
const User = require('@/model/user')
const path =require('path')
const UserService = require('@/service/user')
const JWT = require('@/config/jwt')

class UserController {
    // 用户登录
    async wxLogin(ctx){
     const {nickName,avatar,code} = ctx.request.body
    
    //  处理上传的头像，例如将其存储到数据库或更新用户信息

     await Validate.nullCheck(nickName,'请填写姓名','nickName')
     await Validate.nullCheck(avatar,'请上传头像','avatar')
     await Validate.nullCheck(code,'code码不为空','code')
    // await User.create({
    //     nickName:name,
    //     avatar:'www.baidu.com',
    //     openid:'123456'
    // })
    // const res =await User.findOne({where:{openid:'123456'}})  
    // console.log(res)
  
    const openid = await new UserService().getOpenId(code)//获取微信的openID
    // 查询数据库是否已存在openId,存在就返回用户数据,不存在就创建用户信息
    const userInfo =await User.findOne({where:{openid}})
    if(!userInfo){
        await User.create({
            nickName,
            avatar,
            openid,
        })
    }
    // 生成token
    const token = JWT.generate({openid},"2d")
    ctx.send({data:{openid,nickName,avatar,token}})

    }  
    // 头像
    async sotregeAvatar(ctx){
        const file =  ctx.file
        console.log(file)
         const validMimeTypes = ['image/jpeg', 'image/png'];
        if(!validMimeTypes.includes(file.mimetype))return ctx.send({code:400,msg:'上传文件类型不为图片'})
        const avatar = `${process.env.BASE_URL}/avataruploads/${file.originalname}` ; // 头像的保存路径
        ctx.send({data:{avatar}})
    }
}

module.exports = new UserController()