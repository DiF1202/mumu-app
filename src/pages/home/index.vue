<template>
	<view class="home-container" :style="{height: `${windowHeight}px`, paddingTop:`${safetyTop}px`}">
    <view class="header-title">信息概览</view>
    <view class="content" :style="{height: `${windowHeight - safetyTop - 64}px`}">
      <!-- 环境预警 -->
      <uni-subTitle icon="photo-fill" title="环境预警" url="pages/user/index" />
      <view class="env-warning">
        <!-- 天气信息展示 -->
      </view>
      <!-- 生物资产概况 -->
      <uni-subTitle icon="red-packet" title="生物资产概况" url="pages/user/index" />
      <view style="height:500rpx">
        <uni-line ref="lineChart1"></uni-line>
      </view>
      <!-- 生产管理评分 -->
      <uni-subTitle icon="man-add" title="生产管理评分" url="pages/user/index" />
      <view style="height:500rpx">
        <uni-line ref="lineChart2"></uni-line>
      </view>
      <!-- 每日简报 -->
      <uni-subTitle icon="chat" title="每日简报" url="pages/user/index" />
      <view class="daily-briefing">
      </view>
    </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		computed: {
			windowHeight() {
				return uni.getSystemInfoSync().windowHeight
			},
      safetyTop() {
        return uni.getSystemInfoSync().safeAreaInsets.top
      }
		},
		onLoad() {
			this.initData()
		},
		methods: {
			initData(e) {
       this.$nextTick(() => {
        let xData = ['1月','2月','3月','4月','5月','6月']
        let yData1 = [
          { name: '畜群健康', data: ['10', '21', '13', '16', '21', '19']},
          { name: '栏位占用', data: ['60', '70', '30', '25', '46', '33']},
          { name: '异常警告', data: ['3', '8', '2', '1', '5', '3']}
        ]
        let yData2 = [
          { name: '员工评分', data: ['10', '21', '13', '16', '21', '19']},
          { name: '生产管控', data: ['60', '70', '30', '25', '46', '33']},
        ]
        this.$refs.lineChart1.initChart(xData, yData1)
        this.$refs.lineChart2.initChart(xData, yData2)
       })
			}
		}
	}
</script>

<style lang="scss" scoped>
	.home-container {
    padding: 40rpx 24rpx 24rpx;
		background: linear-gradient(to bottom, #D6E7FF 0%, #FFFFFF 100%);
    .header-title {
      font-size: 36rpx;
      color: #252525;
      height: 80rpx;
      line-height: 80rpx;
      font-weight: bold;
      margin-bottom: 24rpx;
    }
    .content {
      overflow-y: auto;
      .env-warning {
        width: 100%;
        height: 200rpx;
      }
      .daily-briefing {
        width: 100%;
        height: 500rpx;
      }
    }
	}
</style>