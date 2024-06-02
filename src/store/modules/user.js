import { defineStore } from 'pinia'
//定义store
export const userStore = defineStore('user', {
  state: () => {
    return {
      user_info: {},
      alarm_num: 0
    }
  },
  actions: {
    // userinfo
    set_user_info(val) {
      this.user_info = val
    },
    clear_user_info() {
      this.user_info = {}
    },
    set_alarm_num(val) {
      this.alarm_num = val
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