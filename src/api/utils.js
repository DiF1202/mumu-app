import { fetch } from '@/utils/http'
// 获取栏位tree
export const fieldTree = () => {
  return fetch({
    method: 'get',
    url: '/api/mini/get-base-data-tree'
  })
}