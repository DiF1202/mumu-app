<template>
	<view class="home-container">
    <uni-navtopbar title="信息概览" :back="true"></uni-navtopbar>
    <view class="content">
      <u-icon name="map" color="#10cc8f" size="46rpx" :label="position + ' ' + currentDate" labelSize="28rpx" labelColor="#0F4239"></u-icon>
      <!-- 今日天气 -->
      <uni-subTitle customIcon="tianqi" title="今日天气"/>
      <view class="weather-header">
        <view class="weather-hader-item">
          <u-icon custom-prefix="custom-icon custom-icon-jiangyu" size="28rpx" color="#fff"></u-icon>
          <view class="value">{{ '05:37' }}</view>
        </view>
        <view class="weather-hader-item">
          <u-icon custom-prefix="custom-icon custom-icon-kongqishidu" size="28rpx" color="#fff"></u-icon>
          <view class="value">{{ '18:23' }}</view>
        </view>
        <view class="weather-hader-item">
          <u-icon custom-prefix="custom-icon custom-icon-eye" size="28rpx" color="#fff"></u-icon>
          <view class="value">{{ '东北风 3级' }}</view>
        </view>
        <view class="weather-hader-item">
          <u-icon custom-prefix="custom-icon custom-icon-qiya" size="28rpx" color="#fff"></u-icon>
          <view class="value">{{ '41%' }}</view>
        </view>
        <view class="weather-hader-item">
          <u-icon custom-prefix="custom-icon custom-icon-qiya" size="28rpx" color="rgb(235, 37, 37)"></u-icon>
          <view class="value alarm">{{ '高温高湿' }}</view>
        </view>
      </view>
      <view class="weather-body">
        <view class="body-item">
          <view class="item-row">
            <view class="date">今天</view>
            <view class="air">{{ '良' }}</view>
            <view class="temp">{{ '28~14' }}℃</view>
          </view>
          <view class="item-row">
            <view class="status">{{ '多云' }}</view>
            <u--image :showLoading="true" :src="`/static/weather/5@2x.png`" width="14px" height="14px" mode="scaleToFill"></u--image>
          </view>
        </view>
        <view class="body-item">
          <view class="item-row">
            <view class="date">明天</view>
            <view class="air">{{ '良' }}</view>
            <view class="temp">{{ '28~14' }}℃</view>
          </view>
          <view class="item-row">
            <view class="status">{{ '多云' }}</view>
            <u--image :showLoading="true" :src="`/static/weather/6@2x.png`" width="14px" height="14px" mode="scaleToFill"></u--image>
          </view>
        </view>
      </view>
      <uni-card margin="0" padding="0" spacing="24rpx">
        <view class="weather-chart">
          <uni-tarea ref="weatherChart" unit="℃" :max="30"></uni-tarea>
        </view>
      </uni-card>
      <!-- 生产概况 -->
      <uni-subTitle icon="red-packet" title="生产概况" url="pages/home/biological/index" />
      <view class="switch-tab">
        <u-subsection :list="list" :current="current" activeColor="#333333"></u-subsection>
      </view>
      <view class="tab-num">
        <view class="num-item" style="color:#81B33B">8千头</view>
        <view class="num-item" style="color:#347CAF">60%</view>
        <view class="num-item" style="color:#BD3124">46头</view>
      </view>
      <uni-card margin="0" padding="0" spacing="24rpx">
        <view class="active-chart">
          <uni-tarea ref="activeChart" unit="℃" :max="30" color="#81B33B"></uni-tarea>
        </view>
      </uni-card>
      <!-- <view class="biological-item">
        <view class="chart-left">
          <uni-progress ref="progressChart1"></uni-progress>
        </view>
        <view class="chart-right">
          <uni-line ref="lineChart1"></uni-line>
        </view>
      </view>
      <view class="biological-item">
        <view class="chart-left">
          <uni-progress ref="progressChart2"></uni-progress>
        </view>
        <view class="chart-right">
          <uni-line ref="lineChart3"></uni-line>
        </view>
      </view>
      <view class="biological-item">
        <view class="chart-left">
          <uni-progress ref="progressChart3"></uni-progress>
        </view>
        <view class="chart-right">
          <uni-line ref="lineChart4"></uni-line>
        </view>
      </view> -->
      <!-- <view class="assets-charts">
        <view class="chart-item">
          <uni-progress ref="progressChart2"></uni-progress>
        </view>
        <view class="chart-item">
          <uni-progress ref="progressChart3"></uni-progress>
        </view>
      </view>
      <view style="height:500rpx">
        <uni-line ref="lineChart1"></uni-line>
      </view> -->
      <!-- 生产管理评分 -->
      <!-- <uni-subTitle customIcon="shengchan" title="生产管理评分" url="pages/home/production/index" />
      <view style="height: 250rpx;marginTop:24rpx">
        <uni-progress ref="progressChart4"></uni-progress>
      </view>
      <view style="height:500rpx">
        <uni-line ref="lineChart2"></uni-line>
      </view> -->
      <!-- 每日简报 -->
      <!-- <uni-subTitle customIcon="jiqiren" title="每日简报" url="pages/home/dailyReport/index"/>
      <view class="daily-briefing">
        <u--text text="过去24h总结：" color="#0F4239" size="32rpx"></u--text>
        <view v-for="(item,index) in daily.previously" :key="index" class="daily-item">
          <view class="dot"></view>
          <u--text :text="item.title + ':' + item.content" color="#0F4239" size="28rpx" margin="12rpx"></u--text>
        </view>
        <u--text text="未来建议：" color="#0F4239" size="32rpx"></u--text>
        <view v-for="(item,index) in daily.futureSuggestions" :key="index" class="daily-item">
          <view class="dot"></view>
          <u--text :text="item.content" color="#0F4239" size="28rpx" margin="12rpx"></u--text>
        </view>
      </view> -->
    </view>
    <uni-tabbar :tabCurrent="0"></uni-tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
        position: '安徽窝阳',
        currentDate: '2024-5-19',
        list: ['动态存栏', '栏位占用', '疑死数量'],
				current: 0,
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
		onReady() {
      uni.hideTabBar()
			this.initData()
		},
		methods: {
			initData() {
        let xData = ['00:00','01:00','02:00','03:00','04:00','05:00','06:00','07:00', '08:00','09:00','10:00', '11:00', '12:00']
        let series =  [{
          name: "温度",
          data: ['23', '21', '21', '14', '25', '26', '27', '17', '18', '19', '16', '15', '12']
        }]
        this.$refs.weatherChart.initChart(xData, series)

        let xData1 = ['05-01','05-02','05-03','05-04','05-05','05-06','05-07']
        let series1 =  [{
          name: "动态存栏",
          data: ['23', '21', '21', '14', '25', '26', '27']
        }]
        this.$refs.activeChart.initChart(xData1, series1)
        // let xData = ['1月','2月','3月','4月','5月','6月']
        // let yData1 = [{ name: '畜群健康', data: ['10', '21', '13', '16', '21', '19']},]
        // let yData3 = [{ name: '栏位占用', data: ['60', '70', '30', '25', '46', '33'], color: '#91CB74'}]
        // let yData4 = [{ name: '异常警告', data: ['3', '8', '2', '1', '5', '3'], color: '#FAC858'}]
        // let yData2 = [
        //   { name: '员工评分', data: ['10', '21', '13', '16', '21', '19']},
        //   { name: '生产管控', data: ['60', '70', '30', '25', '46', '33']},
        // ]
        // let data1 = [{ data: '0.6', color: '#1890FF'}]
        // let data2 = [{ data: '0.6', color: '#91CB74'}]
        // let data3 = [{ data: '0.6', color: '#FAC858'}]
        // let data4 = [{ data: '0.6', color: '#1890FF'},{ data: '0.6', color: '#91CB74'}]
        // this.$refs.lineChart1.initChart(xData, yData1)
        // this.$refs.lineChart3.initChart(xData, yData3)
        // this.$refs.lineChart4.initChart(xData, yData4)
        // this.$refs.lineChart2.initChart(xData, yData2)
        // this.$refs.progressChart1.initChart(data1, 360)
        // this.$refs.progressChart2.initChart(data2, 80)
        // this.$refs.progressChart3.initChart(data3, 90)
        // this.$refs.progressChart4.initChart(data4, 80)
      }
		}
	}
</script>

<style lang="scss" scoped>
	.home-container {
    .content {
      background: linear-gradient(to bottom, #D6E7FF 0%, #FFFFFF 600rpx);
      padding: 0 24rpx 48rpx;
      .weather-header {
        width: 100%;
        margin: 12rpx 0;
        background: linear-gradient(90deg, rgba(25, 174, 206, 0.9) 0%, rgba(25, 174, 206, 0.5) 100%);
        border-radius: 12rpx;
        padding: 24rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .weather-hader-item {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          .value {
            color: #fff;
            font-size: 24rpx;
            margin-left: 8rpx;
            line-height: 28rpx;
          }
          .alarm {
            color: rgb(235, 37, 37);
          }
        }
      }
      .weather-body {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12rpx;
        .body-item {
          width: calc(50% - 6rpx);
          height: 120rpx;
          background: linear-gradient(90deg, rgba(25, 174, 206, 0.9) 0%, rgba(25, 174, 206, 0.5) 100%);
          border-radius: 12rpx;
          padding: 24rpx;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          .item-row {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: #fff;
            color: #fff;
            font-size: 24rpx;
            view {
              line-height: 28rpx;
            }
          }
        }
      }
      .weather-chart {
        width: 100%;
        height: 250rpx;
      }
      .switch-tab {
        margin-top: 12rpx;
      }
      .tab-num {
        width: 100%;
        height: 56rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .num-item {
          width: 33%;
          color: #333333;
          text-align: center;
        }
      }
      .active-chart {
        width: 100%;
        height: 360rpx;
      }
      .biological-item {
        width: 100%;
        height: 300rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .chart-left {
          width: 200rpx;
          height: 200rpx;
          margin-top: 48rpx;
        }
        .chart-right {
          width: 500rpx;
          height: 300rpx;
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