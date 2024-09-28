const dbConfig={
    database:'aigc',//数据库名
    userName:'aigc',
    password:'YyMT5CMEZ8b8cNwc',
    host:'38.55.232.204',
    dialect:'mysql',
    port:3306
}
const weixin ={
    appid:'wx3ee6184958a78513',//小程序appid
    secret:'bd0deb76f51043fd3e56dc0b38c0bfd9',//小程序密钥
}
// 智谱清言
const zhipu={
    apiKey:'ba327cfbea9af50f529e4dbd3a684e7f.yIuRcA4XI4R1w8LU',
}
// 语音识别密钥
const Aliyunaudio={
    accessKeyId:'LTAI5tAvunE3RBmQLqAstWW4',
    accessKeySecret:'FqHpXIT21dkbENwkjuuYXUiHw6lvPk',
}

module.exports={
    dbConfig,
    weixin,
    zhipu,
    Aliyunaudio
}