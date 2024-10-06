import { request } from '@/utils/https'
// 登录接口
type LoginParams = {
  code: string
  nickName: string
  avatar: string
}
interface Data {
  openid: string
  nickName: string
  avatar: string
  token: string
}
export const ailogin = (data: LoginParams) => {
  return request<Data>({
    url: '/ai/wxlogin',
    method: 'POST',
    data,
  })
}
