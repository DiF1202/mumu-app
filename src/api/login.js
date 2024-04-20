import { fetch } from '@/utils/http'
export const loginApi = (data) => {
  return fetch({
    method: 'GET',
    url: '/api/mini/wx-login',
    data
  })
}