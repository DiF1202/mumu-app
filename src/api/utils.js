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
// 告警未处理总条数
export function alarmUnhandlerNumApi() {
  return fetch({
    method: 'get',
    url: '/api/mini/get-un-handle-total'
  })
}
// 获取个人信息
export function userInfo() {
  return fetch({
    method: 'get',
    url: '/api/mini/get-user-info'
  })
}
// 获取用户使用时间
export function userOnline(data) {
  return fetch({
    method: 'post',
    url: '/api/mini/report-use-time',
    data
  })
}
// 位置列表
export function positionList() {
  return fetch({
    method: 'get',
    url: '/api/mini/get-farm-list',
  })
}
// 切换厂
export function position(data) {
  return fetch({
    method: 'post',
    url: '/api/mini/switch-farm',
    data
  })
}