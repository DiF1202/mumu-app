<template>
  <view class="iconfont" :class="icon" :style="{color: color, fontSize: `${size}rpx`}" ></view>
</template>

<script>
	export default {
		props: {
      size: {
        type: String,
        default: '32'
      },
      icon: {
        type: String,
        default: ''
      },
      color: {
        type: String,
        default: ''
      },
		}
	}
</script>

<style lang="scss">
</style>