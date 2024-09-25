const Validate = require('@/validate/index')
const User = require('@/model/user')
const UserService = require('@/service/user')
class UserController {
    // 用户登录
    async wxLogin(ctx){
     const {nickName,avatar,code} = ctx.request.body
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
    const openid = await new UserService().getOpenId(code)
    // 查询数据库是否已存在用户信息,存在就返回用户数据,不存在就创建用户信息
    const userInfo =await User.findOne({where:{openid}})
    if(!userInfo){
        await User.create({
            nickName,
            avatar,
            openid
        })
    }
    ctx.send({data:{openid,nickName,avatar}})
      
    }
}

module.exports = new UserController()