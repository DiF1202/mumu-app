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
const overViewGuardApi = () => {
  return fetch({
    method: 'get',
    url: '/api/mini/get-house-env-view',
  })
}
const summaryApi = () => {
  return fetch({
    method: 'get',
    url: '/api/mini/get-yesterday-summary'
  })
}
const dingListApi = () => {
  return fetch({
    method: 'get',
    url: '/api/mini/get-ding-list'
  })
}
const riskStatementApi = () => {
  return fetch({
    method: 'get',
    url: '/api/mini/get-guardian-risk-statement'
  })
}
export {
  overViewApi,
  productionApi,
  overViewGuardApi,
  summaryApi,
  dingListApi,
  riskStatementApi
}