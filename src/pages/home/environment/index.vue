<template>
	<view class="env-container">
    <uni-navtopbar title="环境详情" :back="true"></uni-navtopbar>
    <view class="content">
      <uni-subTitle icon="chat" title="天气概况" leftIconColor="#19AECE"/>
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
      <u-scroll-list>
        <view class="future-weather">
          <view v-for="(item, index) in futureWeather" :key="index" class="future-item">
            <view class="date">{{ item.date }}</view>
            <u--image :showLoading="true" :src="`/static/weather/${item.icon}@2x.png`" width="19px" height="19px" mode="scaleToFill"></u--image>
            <view>{{ item.rain }}</view>
            <view>{{ item.temp }}℃</view>
            <view>{{ item.air }}</view>
          </view>
        </view>
      </u-scroll-list>
      <uni-subTitle icon="chat" title="24h温度预报" leftIconColor="#19AECE"/>
      <view class="weather-chart">
        <uni-tarea ref="tareaChart" unit="℃" max="30"></uni-tarea>
      </view>
      <uni-subTitle icon="chat" title="天气风险提示" leftIconColor="#19AECE"/>
      <view class="danger-warning">
        <!-- 天气信息展示 -->
        <view class="danger-row">
          <uni-font icon="icon-turangwendu30cm" color="#E99d42"/>
          <u--text text="紫外线：强。注意关闭遮阳帘" color="#0F4239" size="28rpx" margin="12rpx"></u--text>
        </view>
        <view class="danger-row">
          <uni-font icon="icon-turangwendu30cm" color="#93D2F3"/>
          <u--text text="风力：强。小心动物吹飞" color="#0F4239" size="28rpx" margin="12rpx"></u--text>
        </view>
        <view class="danger-row">
          <uni-font icon="icon-turangwendu30cm" color="#E99d42"/>
          <u--text text="病害：弱。单位面积动物不易超过0.8" color="#0F4239" size="28rpx" margin="12rpx"></u--text>
        </view>
      </view>
      <uni-subTitle icon="chat" title="舍内异常预警" leftIconColor="#19AECE"/>
      <view class="danger-warning">
        <!-- 天气信息展示 -->
        <view class="danger-row">
          <uni-font icon="icon-turangwendu30cm" color="#E99d42"/>
          <u--text text="x厂x舍x栏x位：出现温度过高预警" color="#0F4239" size="28rpx"></u--text>
        </view>
        <view class="danger-row">
          <uni-font icon="icon-turangwendu30cm" color="#93D2F3"/>
          <u--text text="x厂x舍x栏x位：出现温度过高预警" color="#0F4239" size="28rpx"></u--text>
        </view>
        <view class="danger-row">
          <uni-font icon="icon-turangwendu30cm" color="#E99d42"/>
          <u--text text="x厂x舍x栏x位：出现温度过高预警" color="#0F4239" size="28rpx"></u--text>
        </view>
      </view>
    </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
        futureWeather: [
          { date: '06/25', icon: 5, rain: '大雨', temp: '18~23', air: '良'},
          { date: '06/25', icon: 5, rain: '大雨', temp: '18~23', air: '良'},
          { date: '06/25', icon: 5, rain: '大雨', temp: '18~23', air: '良'},
          { date: '06/25', icon: 5, rain: '大雨', temp: '18~23', air: '良'},
          { date: '06/25', icon: 5, rain: '大雨', temp: '18~23', air: '良'},
          { date: '06/25', icon: 5, rain: '大雨', temp: '18~23', air: '良'},
          { date: '06/25', icon: 5, rain: '大雨', temp: '18~23', air: '良'},
          { date: '06/25', icon: 5, rain: '大雨', temp: '18~23', air: '良'},
        ]
      }
		},
		computed: {
      safetyTop() {
        return uni.getSystemInfoSync().safeAreaInsets.top
      }
		},
    onReady() {
      this.initData()
    },
    methods: {
      initData() {
        let xData = ['00:00','01:00','02:00','03:00','04:00','05:00','06:00','07:00', '08:00','09:00','10:00', '11:00', '12:00']
        let series =  [{
          name: "目标值",
          data: ['23', '21', '21', '14', '25', '26', '27', '17', '18', '19', '16', '15', '12']
        }]
        console.log(this.$refs.tareaChart)
        this.$refs.tareaChart.initChart(xData, series)
      }
    }
	}
</script>

<style lang="scss" scoped>
	.env-container {
    .content {
      background: linear-gradient(to bottom, #D6E7FF 0%, #FFFFFF 600rpx);
      padding: 0rpx 24rpx 48rpx;
      .toady-weather {
        width: 100%;
        height: 190rpx;
        background: linear-gradient(90deg, rgba(25, 174, 206, 0.9) 0%, rgba(25, 174, 206, 0.5) 100%);
        border-radius: 12rpx;
        padding: 24rpx;
        display: flex;
        justify-content: space-around;
        flex-direction: column;
        margin-top: 24rpx;
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
            font-size: 26rpx;
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
            font-size: 26rpx;
            font-weight: 400;
            color: #fff;
            margin: 0 24rpx;
          }
        }
      }
      .future-weather {
        // width: 100%;
        margin-top: 24rpx;
        display: flex;
        justify-content: flex-start;
        align-self: center;
        .future-item {
          width: 136rpx;
          height: 260rpx;
          background: linear-gradient(180deg, rgba(25, 174, 206, 0.9) 0%, rgba(25, 174, 206, 0.5) 100%);
          border-radius: 12rpx;
          padding: 12rpx;
          color: #fff;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          align-items: center;
          font-size: 24rpx;
          margin-right: 12rpx;
        }
      }
      .weather-chart {
        height: 320rpx;
      }
      .danger-warning {
        width: 100%;
        .danger-row {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          margin: 24rpx 0;
        }
      }
    }
	}
</style>