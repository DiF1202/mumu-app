import { defineStore } from 'pinia'
//定义store
export const userStore = defineStore('user', {
  state: () => {
    return {
      user_info: {},
    }
  },
  actions: {
    // userinfo
    set_user_info(val) {
      this.user_info = val
    },
    clear_user_info() {
      this.user_info = {}
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