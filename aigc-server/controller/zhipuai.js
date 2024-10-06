const { ZhipuAI } = require("zhipuai-sdk-nodejs-v4");
const { apiKey } = require("@/config/default").zhipu;
const Validate = require("@/validate/index");
const ai = new ZhipuAI({ apiKey });
const crypto = require("crypto");
const dayjs = require('dayjs')
const ChathistoryService = require('@/service/chathistory');
const validate = require("@/validate/index");
class ZhipuaiController {
  // 文生文
  async createCompletions(ctx, next) {
    const { messages } = ctx.request.body;
    await Validate.typeIsArray(messages, "缺少对话信息", "messages");
    const data = await ai.createCompletions({
      model: "glm-4-flash",
      messages:[
        {
            "role": "system",
            "content": "你是一个乐于解答各种问题的助手，你的任务是为用户提供专业、准确、有见地的建议。" 
        },
       ...messages
      ],
      // messages: [
      //     {"role": "user", "content": "你好亚运会信息"},
      //     // {"role": "assistant", "content": "我是人工智能助手"},
      //     // {"role": "user", "content": "你叫什么名字"},
      //     // {"role": "assistant", "content": "我叫chatGLM"},
      //     // {"role": "user", "content": "你都可以做些什么事"}
      // ],
      stream: true, //开启流式输出
      tools: [
        {
          type: "web_search",
          web_search: {
            enable: true,
            search_result: true,
          },
        },
      ],
      top_p: 0.7,
      temperature: 0.95,
      max_tokens: 1024,
    });
    ctx.status = 200;
    // 遍历异步可迭代对象
    for await (const chunk of data) {
      // console.log(chunk.toString());
      ctx.res.write(chunk); //将数据逐个写入http响应中
    }
  }
  // 文生图
  async createImages(ctx) {
    const { prompt } = ctx.request.body;
    await Validate.undeinedCheck(prompt, "缺少prompt参数", "prompt");
    const imageData = await ai.createImages({
      model: "cogview-3",
      prompt,
    });
    ctx.send({
      data: {
        url: imageData.data[0].url,
        prompt: "我已为你生成对应的图片,你可以继续问我",
      },
    });
  }
  // 存储历史记录
  async storegeMessage(ctx){
    // 存储聊天记录
    const {messages,sessionId}=ctx.request.body
    console.log(sessionId)
    await Validate.typeIsArray(messages,'缺少对话信息','messages')
    let session_Id=''
    // 有会话id代表在历史记录中聊天
    if(sessionId){
      session_Id=sessionId
    }else{
      // 没传会话id代表新会话
       const year=dayjs().format('YYYYMMDD')
       const hour=dayjs().format('HHmmssSSS')
       session_Id=`${year}${hour}`
    }
    // 取出openid
    const openid = ctx.auth
    // 会话时间
    const time = dayjs().format("YYYY-MM-DD")
    //时间戳(毫秒)
    const timeStamp = dayjs().valueOf()
    const key = `chat:${openid}`
    // 生成唯一消息id
    const messageId =crypto.randomUUID()
    // 组合关键信息
    const messageConntent = JSON.stringify({time,messageId,...messages})
    
    // 存储用户会话id (有序集合的名称 timeStamp用于排序 添加到集合中的元素内容)
    ctx.redis.zadd(key,timeStamp,session_Id)
    // 存储聊天记录
    const sessionKey = `chat:${openid}:${session_Id}`
    await ctx.redis.zadd(sessionKey,timeStamp,messageConntent)//添加到有序集合中 如果重复,追击
    // 如果前端上传了会话id,不再返回任何数据,否则的话,说明开启了新会话,那要把会话id和和时间和第一段对话返回
    if(sessionId){
      ctx.send({data:null});
    }else{
     const res= await new ChathistoryService(ctx).newChatHistory(openid,session_Id)
     ctx.send({data:res})
    }
  }
  // 获取全部聊天记录
  async fetchMessage(ctx){
    // 用户openid
    const openid = ctx.auth;
    const key = `chat:${openid}`;
    const sessionIds = await ctx.redis.zrevrange(key, 0, -1);
    let chatHistory = [];
    for (const itemids of sessionIds) {
      const messages = await ctx.redis.zrange(`chat:${openid}:${itemids}`, 0, -1);
      const messageContent = messages.map((item) => JSON.parse(item));
      console.log(messageContent)
      const firstMessage = messageContent[0];
      const time = firstMessage.time;
      const messageObj = {
        content: firstMessage[0].content,
        role: firstMessage[0].role,
      };
      const sessiontData = {
        session_id: itemids,
        message: [messageObj],
        time,
      };
      chatHistory.push(sessiontData);
    }
    ctx.send({data:chatHistory});
  }
  // 获取历史对话单条详情
  async onlineChatHistory(ctx){
    const {sessionId}=ctx.query
    await validate.nullCheck(sessionId,'缺少会话id','sessionId')
    const openid = ctx.auth
    const key = `chat:${openid}:${sessionId}`
    const messages = await ctx.redis.zrange(key, 0, -1);
    const messageContent = messages.map((item) => JSON.parse(item));
    const chatData = []
    messageContent.forEach(element => {
      const keys = Object.keys(element)
      keys.forEach(key=>{
        if(key!=='time'&&key!=='messageId'){
               chatData.push(element[key])//通过数组对象里的key 取出对应的项 整合成新数组
        }
      })
    });
    ctx.send({data:chatData})}
  
}

module.exports = new ZhipuaiController();
