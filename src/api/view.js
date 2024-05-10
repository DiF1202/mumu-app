import { fetch } from '@/utils/http'
export const houseAnimalApi = (params) => {
  console.log(params)
  return fetch({
    method: 'get',
    url: '/api/mini/get-house-animal-view',
    params
  })
}
export const houseStaffApi = (params) => {
  console.log(params)
  return fetch({
    method: 'get',
    url: '/api/mini/get-house-staff-view',
    params
  })
}
// 获取实况视频视频流和报警列表
export const videoAlarmApi = (params) => {
  console.log(params)
  return fetch({
    method: 'get',
    url: '/api/mini/get-video-url',
    params
  })
}
// 钉一下他(牧场关键)
export const dingApi = (data) => {
  console.log(data)
  return fetch({
    method: 'post',
    url: '/api/mini/ding-it',
    data
  })
}
// 获取报警详情接口
export const alarmDetailApi = (params) => {
  return fetch({
    method: 'get',
    url: '/api/mini/get-alarm-detail',
    params
  })
}
// 告警处理接口
export const alarmHandlerApi = (data) => {
  return fetch({
    method: 'post',
    url: '/api/mini/handle-alarm',
    data
  })
}
// 自主上报
export const reportAlarmApi = (data) => {
  return fetch({
    method: 'post',
    url: '/api/mini/self-report',
    data
  })
}