<template>
  <view class="navbar-container">
    <view class="nav-bar" :style="{paddingTop:`${safetyTop}px`}">
      <view class="nav-contont" @click="goBack()">
        <u-icon v-if="back && pages" name="arrow-left" color="#252525" size="36rpx" bold></u-icon>
        <view class="nav-title">{{ title }}</view>
      </view>
    </view>
    <u-gap :height="`${safetyTop + 40}px`" bgColor="#D6E7FF"></u-gap>
  </view>
</template>

<script>
	export default {
		props: {
      title: {
        type: String,
        default: ''
      },
      back: {
        type: Boolean,
        default: false
      }
    },
		computed: {
      safetyTop() {
        return uni.getSystemInfoSync().safeAreaInsets.top
      },
      pages() {
        let page = getCurrentPages()
        return page.length > 1
      }
    },
    methods: {
      goBack() {
        if (this.back && this.pages) {
          uni.navigateBack()
        }
      }
    }
	}
</script>

<style lang="scss" scoped>
  .nav-bar {
    width: 100%;
    padding: 0 24rpx;
    background: #D6E7FF;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10000;
    .nav-contont {
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
    .nav-title {
      font-size: 36rpx;
      color: #252525;
      font-weight: bold;
      line-height: 80rpx;
    }
  }
</style>