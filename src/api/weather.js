import { fetch } from '@/utils/fetch'
export function getWeatherNow() {
  return fetch({
    url: 'https://api.seniverse.com/v3/weather/now.json?key=Sur_mf0wnWZFjqk80&location=qingdao&language=zh-Hans&unit=c',
    method: 'get'
  })
}
export function getWeatherDaily() {
  return fetch({
    url: 'https://api.seniverse.com/v3/weather/daily.json?key=Sur_mf0wnWZFjqk80&location=qingdao&language=zh-Hans&unit=c&start=0&days=5',
    method: 'get',
  })
}
export function getTideDaily() {
  return fetch({
    url: 'https://api.seniverse.com/v3/tide/daily.json?key=Sur_mf0wnWZFjqk80&location=qingdao',
    method: 'get',
  })
}