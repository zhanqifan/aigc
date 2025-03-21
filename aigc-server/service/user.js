
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
     if (res.data.errcode) {
       throw {data:{errmsg:res.data.errmsg,errcode:res.data.errcode},code:400}
      } else {
        return res.data.openid;
      }
    }
}
module.exports = UserService