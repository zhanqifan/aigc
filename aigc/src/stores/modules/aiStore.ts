/* eslint-disable */
// prettier-ignore
import { defineStore } from 'pinia'
import { getChatAi } from '@/api/chatAi'
// 定义 Store
export const aiChatStore = defineStore(
  'aiChatStore',
  () => {
    // 会员信息
    const messages = ref<any>([]) //存储聊天记录
    const receiveText = ref('')//接受大模型返回的文本数据
    const startSending = async (content: string) => {
      //content:发送的值
      messages.value.push({ "role": "user", content })
      messages.value.push(
        {
          "role": "assistant",
          "content":"",
          "finish_reason":"start",
          "web_search":[],//搜索网页返回的结果
        },
      )
      // 对话正在进行中
      /*
			 finish_reason：
				start：开始中，
				respond:ai响应中
				stop代表推理自然结束或触发停止词。
				tool_calls 代表模型命中函数。
				length代表到达 tokens 长度上限。
				sensitive 代表模型推理内容被安全审核接口拦截。请注意，针对此类内容，请用户自行判断并决定是否撤回已公开的内容。
				network_error 代表模型推理异常。
			 */
      // 请求服务器端进行发送
      try {
        await getChatAi({ messages: messages.value }, true)
      } catch (error) {
        console.log(error)
      }
    }
    const handleText = (objVal) =>{
      // 服务器开始响应
      messages.value[messages.value.length - 1].finish_reason= 'respond'
      // 把大模型的文本追加不断拼接
      receiveText.value += objVal.choices[0].delta.content ||''
      // 把文本追加到ai的回复中
      messages.value[messages.value.length - 1].content += receiveText.value
      // 判断是否回复完毕
      if(objVal.choices[0].finish_reason){
        // 存储结束状态
        messages.value[messages.value.length - 1].finish_reason= objVal.choices[0].finish_reason
        messages.value[messages.value.length - 1].web_search = objVal.web_search?objVal.web_search:[]
        // 如果回复异常
        const condition =[
          {type:'length',content:'到达上线,请重新开启会话'},
          {type:'sensitive',content:'非常抱歉,我目前无法提供你需要的具体信息'},
          {type:'network_error',content:'推理异常,我或许出现了一些问题,你可以重新尝试'},
        ]
        condition.forEach(item=>{
          if(objVal.choices[0].finish_reason === item){
            messages.value[messages.value.length - 1].content = item.content
          }
        })
      }
    }
    // 记得 return
    return {
      startSending,
    }
  },
  // TODO: 持久化
  {
    persist: true,
  },
)
