import { request } from '@/utils/https'
// 登录接口
type LoginParams = {
  code: string,
  nickName:string,
  avatar:string
}
export const ailogin = (data:LoginParams) => {
  return request({
    url:'/ai/wxlogin',
    method:'POST',
    data
  })
}
