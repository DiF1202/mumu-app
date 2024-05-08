import { fetch } from '@/utils/http'
const overViewApi = () => {
  return fetch({
    method: 'get',
    url: '/api/mini/get-animal-view-detail',
  })
}
export {
  overViewApi
}