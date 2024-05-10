import { fetch, upload } from '@/utils/http'
// 获取栏位tree
export const fieldTree = () => {
  return fetch({
    method: 'get',
    url: '/api/mini/get-base-data-tree'
  })
}
// 上传图片
export function uploadAPI(data) {
  return upload({
    url: '/api/mini/upload',
    name: data.name,
    filePath: data.filePath
  })
}