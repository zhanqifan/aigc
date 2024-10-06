import { request } from '@/utils/https'

// 文生文接口
export const getChatAi = (params: any, enableChunked: boolean = false) => {
  return request<any>({
    url: '/ai/createCompletions',
    method: 'POST',
    data: params,
    enableChunked: enableChunked,
  })
}
// 文生图接口
export const getChatAiImg = (params: any) => {
  return request<any>({
    url: '/ai/createImages',
    method: 'POST',
    data: params,
  })
}
// 获取阿里云语音token
export const AliAudioToken = () => {
  return request<any>({
    url: '/ai/audioToken',
    method: 'GET',
  })
}
// 存储聊天记录
export const saveChatRecord = (params: any) => {
  return request<any>({
    url: '/ai/saveChatRecord',
    method: 'POST',
    data: params,
  })
}
// 获取用户全部聊天记录
export const userChatList = () => {
  return request<any>({
    url: '/ai/getChatRecord',
    method: 'GET',
  })
}
// 获取单条id
export const getChatDetail = (data: any) => {
  return request<any>({
    url: '/ai/getChatDetail',
    method: 'GET',
    data,
  })
}
