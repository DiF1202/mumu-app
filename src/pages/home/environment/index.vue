<template>
	<view class="env-container">
    <uni-navtopbar title="环境详情" :back="true"></uni-navtopbar>
    <u-gap :height="`${safetyTop + 40}px`" bgColor="#D6E7FF"></u-gap>
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
      }
		}
	}
</script>

<style lang="scss" scoped>
	.env-container {
    .content {
      background: linear-gradient(to bottom, #D6E7FF 0%, #FFFFFF 600rpx);
      padding: 0 24rpx 24rpx;
      .env-warning {
        width: 100%;
        .env-row {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          margin: 24rpx 0;
        }
      }
      .assets-charts {
        width: 100%;
        height: 200rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 24rpx;
        .chart-item {
          width: 200rpx;
          height: 200rpx;
        }
      }
      .daily-briefing {
        width: 100%;
        height: 500rpx;
      }
    }
	}
</style>