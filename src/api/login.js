import { fetch } from '@/utils/http'
const loginApi = (data) => {
  return fetch({
    method: 'post',
    url: '/api/mini/wx-login',
    data
  })
}
export {
  loginApi
}