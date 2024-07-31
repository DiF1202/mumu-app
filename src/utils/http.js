import { userStore } from '@/store'
import { tansParams } from '@/utils/common'
// 添加请求拦截器
/**
 * 拦截 request 请求
 * 拦截 uploadFile 文件上传
*/
/**
 * TODO
 * 1.非 http 开头需要拼接地址
 * 2.请求超时时间
 * 3.添加小程序端请求头标识
 * 4.添加token请求头标识
*/
const baseURL = 'https://m.zzxmt.cn'
// const baseURL = 'https://api.mumutech.co'
const httpInterceptor = {
  // 拦截前触发
  invoke(options) {
    // 1.非 http 开头需要拼接地址
    if (!options.url.startsWith('http')) {
      options.url = baseURL + options.url
    }
    // 2.请求超时时间 默认60s
    options.timeout = 10000
    // 3.添加小程序端请求头表示
    options.header = {
      ...options.header, // 保留传入的标识
      'source-client': 'miniapp'
    }
    // 4.添加token请求头标识
    const token = userStore().user_info.token
    if (token) {
      options.header.Authorization = 'Bearer ' + token
    }
  }
}
uni.addInterceptor('request', httpInterceptor)
uni.addInterceptor('uploadFile', httpInterceptor)

/**
 * 请求函数
 * 1.返回 promise 对象
 * 2.请求成功
 *  提取核心数据 res.data
 * 3.请求失败
 *  网络错误
 *  401错误 清理用户信息 跳转登录页
 *  其他错误
*/
export const fetch = (options) => {
  // 拼接URL传参
  if (options.params) {
    options.url = options.url + '?' + tansParams(options.params).slice(0, -1)
  }
  return new Promise((resolve, reject) => {
    uni.request({
      ...options,
      success(res) {
        if (res.data.code >= 200 && res.data.code < 300) {
          // 提取核心数据 res.data
          resolve(res.data)
        } else if (res.data.results) {
          resolve(res.data.results)
        } else if (res.data.code === 401) {
          // 401错误 清理用户信息 跳转登录页
          userStore().clear_user_info()
          uni.navigateTo({ url: '/pages/login/index' })
          reject(res)
        } else {
          // 其他错误
          uni.showToast({
            icon: 'error',
            title: res.data.message || res.data.msg || '请求错误'
          })
          reject(res)
        }
      },
      fail(err) {
        // 网络错误
        uni.showToast({
          icon: 'fail',
          title: '网络错误，换个网络试试'
        })
        // 网络错误
        reject(err)
      }
    })
  })
}

// 上传图片
export const upload = (options) => {
  return new Promise((resolve, reject) => {
    uni.uploadFile({
      ...options,
      success: (res) => {
        let data = JSON.parse(res.data)
        if (data.code >= 200 && data.code < 300) {
          // 提取核心数据 res.data
          resolve(data)
        } else if (data.code === 401) {
          // 401错误 清理用户信息 跳转登录页
          userStore().clear_user_info()
          uni.navigateTo({ url: '/pages/login/index' })
          reject(data)
        } else {
          // 其他错误
          uni.showToast({
            icon: 'error',
            title: data.data.message || '请求错误'
          })
          reject(data)
        }
      },
      fail: (err) => {
        // 网络错误
        uni.showToast({
          icon: 'fail',
          title: '网络错误，换个网络试试'
        })
        reject(err)
      }
    })
  })
}