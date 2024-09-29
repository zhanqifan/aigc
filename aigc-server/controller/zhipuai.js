const { ZhipuAI } = require("zhipuai-sdk-nodejs-v4");
const { apiKey } = require("@/config/default").zhipu;
const Validate = require("@/validate/index");
const ai = new ZhipuAI({ apiKey });
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
    console.log(JSON.parse);
    // 遍历异步可迭代对象
    for await (const chunk of data) {
      console.log(chunk.toString());
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
}

module.exports = new ZhipuaiController();
