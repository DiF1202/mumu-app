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
// 告警类型
export function alarmType() {
  return fetch({
    method: 'get',
    url: '/api/mini/get-alarm-type-list'
  })
}
// 栋舍类型
export function houseType() {
  return fetch({
    method: 'get',
    url: '/api/mini/get-house-type-list'
  })
}