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