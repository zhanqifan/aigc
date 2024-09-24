const Validate = require('@/validate/index')
const User = require('@/model/user')
const UserService = require('@/service/user')
class UserController {
    // 用户登录
    async wxLogin(ctx){
     const {name,avatar,code} = ctx.request.body
     await Validate.nullCheck(name,'请填写姓名','name')
     await Validate.nullCheck(avatar,'请上传头像','avatar')
     await Validate.nullCheck(code,'code码不为空','code')
     console.log(name,avatar)
    // await User.create({
    //     nickName:name,
    //     avatar:'www.baidu.com',
    //     openid:'123456'
    // })
    // const res =await User.findOne({where:{openid:'123456'}})  
    // console.log(res)
    const res = await new UserService().getOpenId(code)
    console.log(res)
    ctx.send([1,2,3])
      
    }
}

module.exports = new UserController()