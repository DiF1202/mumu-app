<template>
	<view class="home-container" :style="{height: `${windowHeight}px`, paddingTop:`${safetyTop}px`}">
    <view class="header-title">信息概览</view>
    <view class="content" :style="{height: `${windowHeight - safetyTop - 64}px`}">
      <!-- 环境预警 -->
      <uni-subTitle icon="photo-fill" title="环境预警" url="pages/user/index" />
      <view class="env-warning">
        <!-- 天气信息展示 -->
        <view class="env-row">
          <uni-font icon="icon-turangwendu30cm" color="#E99d42"/>
          <u--text text="我用十年青春,赴你最后之约" color="#0F4239" size="28rpx" margin="12rpx"></u--text>
        </view>
        <view class="env-row">
          <uni-font icon="icon-kongqishidu" color="#93D2F3"/>
          <u--text text="我用十年青春,赴你最后之约" color="#0F4239" size="28rpx" margin="12rpx"></u--text>
        </view>
        <view class="env-row">
          <uni-font icon="icon-kongqishidu" color="#E99d42"/>
          <u--text text="我用十年青春,赴你最后之约" color="#0F4239" size="28rpx" margin="12rpx"></u--text>
        </view>
      </view>
      <!-- 生物资产概况 -->
      <uni-subTitle icon="red-packet" title="生物资产概况" url="pages/user/index" />
      <view class="assets-charts">
        <view class="chart-item">
          <uni-progress ref="progressChart1"></uni-progress>
        </view>
        <view class="chart-item">
          <uni-progress ref="progressChart2"></uni-progress>
        </view>
        <view class="chart-item">
          <uni-progress ref="progressChart3"></uni-progress>
        </view>
      </view>
      <view style="height:500rpx">
        <uni-line ref="lineChart1"></uni-line>
      </view>
      <!-- 生产管理评分 -->
      <uni-subTitle icon="man-add" title="生产管理评分" url="pages/user/index" />
      <view style="height: 250rpx;marginTop:24rpx">
        <uni-progress ref="progressChart4"></uni-progress>
      </view>
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
        let data1 = [{ data: '0.6', color: '#1890FF'}]
        let data2 = [{ data: '0.6', color: '#91CB74'}]
        let data3 = [{ data: '0.6', color: '#FAC858'}]
        let data4 = [{ data: '0.6', color: '#1890FF'},{ data: '0.6', color: '#91CB74'}]
        this.$refs.lineChart1.initChart(xData, yData1)
        this.$refs.lineChart2.initChart(xData, yData2)
        this.$refs.progressChart1.initChart(data1)
        this.$refs.progressChart2.initChart(data2)
        this.$refs.progressChart3.initChart(data3)
        this.$refs.progressChart4.initChart(data4)
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