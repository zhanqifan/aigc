class ChathistoryService{
    constructor(ctx){
    this.ctx=ctx
    }
    // 获取开启新对话所需要的参数
    async newChatHistory(openid,sessionId){                    // 从0开始到最后一位
      const res = await this.ctx.redis.zrange(`chat:${openid}:${sessionId}`,0,-1)
      const msgContent = res.map(item=>JSON.parse(item))//取出聊天记录 转对象 
      console.log(msgContent[0])
      const firstMsg = msgContent[0]//取出对象
      const time = firstMsg.time
      const messageObj = {
       content:firstMsg[0].content,//对象第一个
       role:firstMsg[0].role
      }
      const sessionData ={
       session_id:sessionId,
       message:[messageObj],
       time
      }
      return sessionData
    }
 
}
module.exports=ChathistoryService