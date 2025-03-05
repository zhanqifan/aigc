const dbConfig={
    database:'aigc',//数据库名
    userName:'aigc',
    password:'aigc123',
    host:process.env.IP,
    dialect:'mysql',
    port:3306
}
const weixin ={
    appid:'',//小程序appid
    secret:'',//小程序密钥
}
// 智谱清言
const zhipu={
    apiKey:'',
}
const userToken={
    secretkey: "key",
    expiresIn: "2d",
  }
// 阿里语音识别密钥
const Aliyunaudio={
    accessKeyId:'',
    accessKeySecret:'',
}

module.exports={
    dbConfig,
    weixin,
    zhipu,
    Aliyunaudio,
    userToken
}
