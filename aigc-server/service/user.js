
const {appid,secret}=require("@/config/default").weixin
const qs = require("querystring")
const axios = require("axios")
class UserService {
    // 获取用户信息
    async getOpenId(code){
     const query = qs.stringify({
         appid,
         secret,
         js_code:code,
         grant_type:'authorization_code'
     })
     const res =await axios.get(`https://api.weixin.qq.com/sns/jscode2session?${query}`)
     console.log(res)
    }
}
module.exports = UserService