import { request } from '@/utils/https'

export const getChatAi = (params: any, enableChunked: boolean = false) => {
  return request<any>({
    url: '/ai/createCompletions',
    method: 'POST',
    data: params,
    enableChunked: enableChunked,
  })
}
