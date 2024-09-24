const Validate = require('@/validate/index')
const User = require('@/model/user')
class UserController {
    // 用户登录
    async wxLogin(ctx){
     const {name,avatar} = ctx.request.body
     await Validate.nullCheck(name,'请填写姓名','name')
    //  console.log(name,avatar)
    await User.create({
        nickName:name,
        avatar:'www.baidu.com',
        openid:'123456'
    })  
    ctx.send([1,2,3])
      
    }
}

module.exports = new UserController()