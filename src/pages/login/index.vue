<template>
  <view class="login-container" :style="{paddingTop:`${safetyTop}px`,height: `${windowHeight}px` }">

  </view>
</template>

<script>
  export default {
    data() {
      return {}
    },
    computed: {
      safetyTop() {
        return uni.getSystemInfoSync().safeAreaInsets.top
      },
      windowHeight() {
        return uni.getSystemInfoSync().windowHeight - 50
      }
    },
    onLoad() {
    },
    methods: {
    }
  }
</script>

<style lang="scss" scoped>
  .login-container {
    background-image: linear-gradient(to bottom, #10cc8f 0%, #ffffff 50%)
  }
</style>