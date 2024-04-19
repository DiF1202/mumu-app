<template>
	<view class="view-container" :style="{height: `${windowHeight}px`, paddingTop:`${safetyTop}px`}">
    <view class="header-title">远程查看</view>
    <view class="content" :style="{height: `${windowHeight - safetyTop - 64}px`}">
      <!-- 栏位信息 -->
      <uni-subTitle icon="camera" title="一厂/二舍/三栏" value="实况视频" url="pages/user/index" leftIconColor="#A2EF4D"/>
      <view class="fields-view">
        <view class="fields-chart">
          <uni-progress ref="progressChart1"></uni-progress>
        </view>
        <view class="fields-info"></view>
      </view>
      <!-- 资产评分 -->
      <uni-subTitle icon="bookmark" title="资产评分" leftIconColor="#A2EF4D"/>
      <view style="height:500rpx">
        <uni-line ref="lineChart1"></uni-line>
      </view>
      <!-- 负责人 -->
      <uni-subTitle icon="account" title="负责人"  leftIconColor="#A2EF4D"/>
      <view style="height:300rpx">
        <!-- 负责人信息 -->
      </view>
      <!-- 绩效评分 -->
      <uni-subTitle icon="bookmark" title="绩效评分" leftIconColor="#A2EF4D"/>
      <view style="height:500rpx">
        <uni-line ref="lineChart2"></uni-line>
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
        let yData2 = [{ name: '员工绩效', data: ['60', '70', '30', '25', '46', '33']}]
        let data = [{ data: '0.8', color: '#1890FF'},{ data: '0.2', color: '#FAC858'},{ data: '0.6', color: '#FF6216'}]
        this.$refs.lineChart1.initChart(xData, yData1)
        this.$refs.lineChart2.initChart(xData, yData2)
        this.$refs.progressChart1.initChart(data)
       })
			}
		}
	}
</script>

<style lang="scss" scoped>
	.view-container {
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
      .fields-view {
        width: 100%;
        margin-top: 24rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .fields-chart {
          width: 250rpx;
          height: 250rpx;
        }
        .fields-info {
          width: calc(100% - 250rpx);
          height: 250rpx;
          background: #D6E7FF;
        }
      }
      .daily-briefing {
        width: 100%;
        height: 500rpx;
      }
    }
	}
</style>