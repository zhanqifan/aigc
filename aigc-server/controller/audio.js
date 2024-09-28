var RPCClient = require('@alicloud/pop-core').RPCClient;
const dayjs =require("dayjs")
const {accessKeyId,accessKeySecret} = require('@/config/default').Aliyunaudio
var client = new RPCClient({
  accessKeyId,
  accessKeySecret,
  endpoint: 'http://nls-meta.cn-shanghai.aliyuncs.com',
  apiVersion: '2019-02-28'
});

// 通过sdk调用token https://help.aliyun.com/zh/isi/getting-started/obtain-an-access-token?spm=a2c4g.11186623.0.0.58984b4fnL5BmQ#554cde703a4xl

class AudioController{
  async aliToken(ctx){
    // 判断token是否存在
    const alitoken  =await ctx.redis.get("aliToken")//从redis获取token
    if(alitoken){
      ctx.send({data:alitoken})
      return 
    }
   const res =await client.request("CreateToken")
   console.log(res.Token)
   if(res.Token&&res.Token.Id){
     const expires_in = res.Token.ExpireTime - dayjs().unix() //得到还剩多少m过期
     await ctx.redis.set("aliToken",res.Token.Id,"EX",expires_in)//存进redis id和EX设置过期时间
     ctx.send({data:res.Token.Id})
   }else{
    ctx.send({code:500,msg:'获取token失败',data:res})
   }
  }
}
module.exports=new AudioController()