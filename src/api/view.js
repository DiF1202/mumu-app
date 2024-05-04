import { fetch } from '@/utils/http'
export const fieldTree = () => {
  return fetch({
    method: 'get',
    url: '/api/mini/get-base-data-tree',
  })
}