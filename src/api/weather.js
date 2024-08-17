import { fetch } from "@/utils/http";
import { userStore } from "@/store";
const str = userStore().user_info.weather_private_key;
const weatherKey = atob(str)
// 预警
export function getRisk(pos) {
  return fetch({
    url: `https://api.seniverse.com/v3/weather/alarm.json?key=${weatherKey}&location=${pos}&detail=more`,
    method: 'get',
  })
}
// 日出日落
export function getSunDay(pos) {
  return fetch({
    url: `https://api.seniverse.com/v3/geo/sun.json?key=${weatherKey}&location=${pos}&language=zh-Hans&start=0&days=1`,
    method: 'get'
  })
}
// 未来天气预报
export function getWeatherDaily(pos) {
  return fetch({
    url: `https://api.seniverse.com/v3/weather/daily.json?key=${weatherKey}&location=${pos}&language=zh-Hans&unit=c&start=0&days=2`,
    method: 'get',
  })
}
// 空气质量
export function getAirQuality(pos) {
  return fetch({
    url: `https://api.seniverse.com/v3/air/daily.json?key=${weatherKey}&language=zh-Hans&location=${pos}&days=2`,
    method: 'get',
  })
}
// 24H天气预报
export function getDaily(pos) {
  return fetch({
    url: `https://api.seniverse.com/v3/weather/hourly.json?key=${weatherKey}&location=${pos}&language=zh-Hans&unit=c&start=0&hours=24`,
    method: 'get',
  })
}
