<template>
	<view class="dailyReport-container">
    <uni-navtopbar title="每日一报" :back="true"></uni-navtopbar>
    <view class="content">
    </view>
	</view>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  onReady() {
    this.initData()
  },
  methods: {
    initData() {}
	}
}
</script>

<style lang="scss" scoped>
	.dailyReport-container {
    .content {
      background: linear-gradient(to bottom, #D6E7FF 0%, #FFFFFF 600rpx);
      padding: 0 24rpx 48rpx;
      .header-filter {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .filter-fileds {
          width: 50%;
          margin-right: 20rpx;
        }
        .filter-date {
          width: 50%;
        }
      }
      .heart-des {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        .heart-row {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          margin: 24rpx 0 0;
        }
      } 
    }
	}
</style>