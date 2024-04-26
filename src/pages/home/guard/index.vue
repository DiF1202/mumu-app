<template>
	<view class="home-container">
    <uni-navtopbar title="信息概览" :back="true"></uni-navtopbar>
    <view class="content">
      守卫
    </view>
    <uni-tabbar :tabCurrent="0"></uni-tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
        daily: {
          previously: [
            {title: '动物数量和分布', content: '目标检测算法统计，昨日在主舍区共有牛群150头，羊群300头。动物数量保持稳定，无异常变'},
            {title: '活跃度与健康监测', content: '畜群活跃度等级为7/10，显示出良好的活动水平。未检测到异常行为，群体健康状况良好。'},
            {title: '预警事件', content: '未发现紧急预警事件，动物逃逸或严重健康问题的风险很低。'},
            {title: '人车物管理', content: '车辆出入统计显示，共有10次货车进出，运输饲料和牲畜。所有人员通道活动正常，无未授权入侵事件。'}
          ],
          futureSuggestions: [
            {content: '目标检测算法统计，昨日在主舍区共有牛群150头，羊群300头。动物数量保持稳定，无异常变'},
            {content: '畜群活跃度等级为7/10，显示出良好的活动水平。未检测到异常行为，群体健康状况良好。'},
            {content: '未发现紧急预警事件，动物逃逸或严重健康问题的风险很低。'},
            {content: '车辆出入统计显示，共有10次货车进出，运输饲料和牲畜。所有人员通道活动正常，无未授权入侵事件。'}
          ]
        }
      }
		},
		computed: {
      safetyTop() {
        return uni.getSystemInfoSync().safeAreaInsets.top
      }
		},
		onLoad() {
      uni.hideTabBar()
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
        // let data1 = [{ data: '0.6', color: '#1890FF'}]
        // let data2 = [{ data: '0.6', color: '#91CB74'}]
        // let data3 = [{ data: '0.6', color: '#FAC858'}]
        // let data4 = [{ data: '0.6', color: '#1890FF'},{ data: '0.6', color: '#91CB74'}]
        // this.$refs.lineChart1.initChart(xData, yData1)
        // this.$refs.lineChart2.initChart(xData, yData2)
        // this.$refs.progressChart1.initChart(data1)
        // this.$refs.progressChart2.initChart(data2)
        // this.$refs.progressChart3.initChart(data3)
        // this.$refs.progressChart4.initChart(data4)
       })
			}
		}
	}
</script>

<style lang="scss" scoped>
	.home-container {
    .content {
      background: linear-gradient(to bottom, #D6E7FF 0%, #FFFFFF 600rpx);
      padding: 0 24rpx 48rpx;
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
        margin-top: 24rpx;
        .daily-item {
          display: flex;
          justify-content: flex-start;
          align-self: flex-start;
          .dot {
            width: 16rpx;
            height: 16rpx;
            border-radius: 50%;
            background-color: #10cc8f;
            margin: 22rpx 0;
          }
        }
      }
    }
	}
</style>