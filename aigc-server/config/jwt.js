let jwt = require("jsonwebtoken")
const {secretkey,expiresIn} =require("@/config/default").userToken
// 生成token
module.exports={
    // 生成token
    generate(value) {    
                         //密钥 命名     过期时间 
        return jwt.sign(value, secretkey, { expiresIn})
    },
    // 验证token
    verify(token) {         //token  密钥用来解密
        try {
            return jwt.verify(token,  secretkey)
        }
        catch (e) {
            return false
        }
    }
}

