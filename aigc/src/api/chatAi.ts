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
