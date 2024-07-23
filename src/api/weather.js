import { fetch } from "@/utils/http";
// 预警
export function getRisk() {
  return fetch({
    url: 'https://api.seniverse.com/v3/weather/alarm.json?key=SflcLcZz_DL3r1IcJ&location=hangzhou&detail=more',
    method: 'get',
  })
}
// 日出日落
export function getSunDay() {
  return fetch({
    url: 'https://api.seniverse.com/v3/geo/sun.json?key=SflcLcZz_DL3r1IcJ&location=hangzhou&language=zh-Hans&start=0&days=1',
    method: 'get'
  })
}
// 未来天气预报
export function getWeatherDaily() {
  return fetch({
    url: 'https://api.seniverse.com/v3/weather/daily.json?key=SflcLcZz_DL3r1IcJ&location=hangzhou&language=zh-Hans&unit=c&start=0&days=2',
    method: 'get',
  })
}
// 空气质量
export function getAirQuality() {
  return fetch({
    url: 'https://api.seniverse.com/v3/air/daily.json?key=SflcLcZz_DL3r1IcJ&language=zh-Hans&location=hangzhou&days=2',
    method: 'get',
  })
}
// 24H天气预报
export function getDaily() {
  return fetch({
    url: 'https://api.seniverse.com/v3/weather/hourly.json?key=SflcLcZz_DL3r1IcJ&location=hangzhou&language=zh-Hans&unit=c&start=0&hours=24',
    method: 'get',
  })
}
