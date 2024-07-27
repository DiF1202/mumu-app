<template></template>
<script>
import { userOnline } from '@/api/utils.js'
export default {
  data() {
    return {
      startTime: 0,
      endTime: 0
    }
  },
  onShow () {
    this.startTime = Math.floor(new Date().getTime() / 1000)
  },
  onHide () {
    this.saveUseTime()
  },
  methods: {
    saveUseTime() {
      this.endTime = Math.floor(new Date().getTime() / 1000)
      const duration = Math.floor((this.endTime - this.startTime) / 60)
      userOnline({
        use_time: duration,
        start_time: this.startTime,
        end_time: this.endTime
      }).then((res) => {console.log(res, '存储用户时间')})
    },
    
  }
}
</script>

<style lang="scss">
@import 'uview-plus/index.scss';
@import '@/styles/index.scss';
/*每个页面公共css */
</style>
