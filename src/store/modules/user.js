import { defineStore } from 'pinia'
//定义store
export const userStore = defineStore('user', {
  state: () => {
    return {
      login: false,
      user_token: '',
      user_name: '微信用户',
      user_avatar: ''
    }
  },
  actions: {
    set_user_name(val) {
      this.user_name = val
    }
  }
})