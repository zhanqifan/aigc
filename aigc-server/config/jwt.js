let jwt = require("jsonwebtoken")
const secret ='key'
// 生成token
module.exports={
    // 生成token
    generate(value, expires) {    
                         //密钥 命名     过期时间 
        return jwt.sign(value, secret, { expiresIn: expires })
    },
    // 验证token
    verify(token) {         //token  密钥用来解密
        try {
            return jwt.verify(token, secret)
        }
        catch (e) {
            return false
        }
    }
}

