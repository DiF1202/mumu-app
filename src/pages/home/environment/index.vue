<template>
	<view class="env-container">
    <uni-navtopbar title="环境详情" :back="true"></uni-navtopbar>
    <view class="content">
      <view class="toady-weather">
        <view class="row1">
          <view class="temp">{{ '28' }}℃</view>
          <view class="tempElse">
            <u--image :showLoading="true" :src="`/static/weather/5@2x.png`" width="28px" height="28px" mode="scaleToFill"></u--image>
            <view>{{ '多云' }}</view>
            <view>{{ '东南' }}风</view>
            <view>{{ '10' }}级</view>
          </view>
        </view>
        <view class="row2">
          <uni-font icon="icon-jiangyuliang" color="#fff" />
          <view class="value">{{ 28 }}mm</view>
          <uni-font icon="icon-kongqishidu1" color="#fff" />
          <view class="value">{{ 99 }}%</view>
          <uni-font icon="icon-eyeyanjing" color="#fff" />
          <view class="value">{{ 2 }}km</view>
          <uni-font icon="icon-daqiya" color="#fff" />
          <view class="value">{{ 11 }}mb</view>
        </view>
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
      padding: 24rpx 24rpx 48rpx;
      .toady-weather {
        width: 100%;
        height: 190rpx;
        background: linear-gradient(90deg, rgba(25, 174, 206, 0.8) 0%, rgba(25, 174, 206, 0.4) 100%);
        border-radius: 12rpx;
        padding: 24rpx;
        display: flex;
        justify-content: space-around;
        flex-direction: column;
        .row1 {
          width: 100%;
          height: 56rpx;
          display: flex;
          justify-content: flex-start;
          align-items: flex-start;
          margin-bottom: 24rpx;
          .temp {
            font-size: 52rpx;
            font-family: DIN Alternate;
            font-weight: bold;
            font-style: italic;
            color: #fff;
            margin-right: 40rpx;
          }
          .tempElse {
            display: flex;
            align-items: flex-end;
            font-size: 24rpx;
            font-weight: 400;
            color: #fff;
            view {
              margin: 0 10rpx;
            }
          }
        }
        .row2 {
          display: flex;
          align-items: center;
          .value {
            font-size: 24rpx;
            font-weight: 400;
            color: #fff;
            margin: 0 24rpx;
          }
        }
      }
    }
	}
</style>