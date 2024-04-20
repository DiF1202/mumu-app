import { defineStore } from 'pinia'
//定义store
export const userStore = defineStore('user', {
  state: () => {
    return {
      userInfo: {
        login: false,
        user_token: 'maflajsipojgdasnfwqing[oinsadgk',
        user_name: '微信用户',
        user_avatar: ''
      }
    }
  },
  actions: {
    set_user_name(val) {
      this.userInfo.user_name = val
    },
    clear_user_info() {
      this.userInfo = {}
    }
  },
  persist: {
    // 调整为兼容多端的API
    storage: {
      setItem(key, value) {
        uni.setStorageSync(key, value)
      },
      getItem(key) {
        return uni.getStorageSync(key)
      }
    }
  }
})