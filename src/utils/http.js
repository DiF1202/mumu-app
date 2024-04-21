import { userStore } from '@/store'
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
const baseURL = 'http://140.249.223.143:8288'
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
    const token = userStore()?.user_token
    if (token) {
      options.header.Authorization = token
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
  return new Promise((resolve, reject) => {
    uni.request({
      ...options,
      success(res) {
        if (res.code >= 200 && res.code < 300) {
          // 提取核心数据 res.data
          resolve(res.data)
        } else if (res.code === 401) {
          // 401错误 清理用户信息 跳转登录页
          userStore().clear_user_info()
          uni.navigateTo({ url: '/pages/login/index' })
          reject(res)
        } else {
          // 其他错误
          uni.showToast({
            icon: null,
            title: res.data.message || '请求错误'
          })
          reject(res)
        }
      },
      fail(err) {
        // 网络错误
        uni.showToast({
          icon: null,
          title: '网络错误，换个网络试试'
        })
        // 网络错误
        reject(err)
      }
    })
  })
}