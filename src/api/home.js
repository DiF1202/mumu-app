import { fetch } from '@/utils/http'
const overViewApi = () => {
  return fetch({
    method: 'get',
    url: '/api/mini/get-env-view',
  })
}
export {
  overViewApi
}