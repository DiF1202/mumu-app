import { fetch } from '@/utils/http'
const overViewApi = () => {
  return fetch({
    method: 'get',
    url: '/api/mini/get-production-view',
  })
}
const productionApi = (params) => {
  return fetch({
    method: 'get',
    url: '/api/mini/get-production-detail',
    params
  })
}
export {
  overViewApi,
  productionApi
}