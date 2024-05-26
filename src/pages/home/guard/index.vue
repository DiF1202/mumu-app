<template>
	<view class="home-container">
    <uni-navtopbar title="值守卫士" :back="true"></uni-navtopbar>
    <view class="content">
      <uni-subTitle icon="account" title="杨大坤" value="负责栏位:45" />
      <uni-card margin="0" padding="0" spacing="24rpx">
        <view class="manager-view">
          <u--image :showLoading="true" src="/static/icon/woman.png" width="160rpx" height="160rpx" shape="circle"></u--image>
          <view class="manager-info">
            <view class="info-item">
              <view class="dot"></view>
                <u--text :text="'负责人：' + '李小龙'" color="#0F4239" size="28rpx" margin="12rpx"></u--text>
              </view>
            <view class="info-item">
              <view class="dot"></view>
              <u--text :text="'动态存栏：' + '21'" color="#0F4239" size="28rpx" margin="12rpx"></u--text>
            </view>
            </view>
            <view class="manager-info">
              <view class="info-item">
              <view class="dot"></view>
                <u--text :text="'栏位占用：' + '22'" color="#0F4239" size="28rpx" margin="12rpx"></u--text>
              </view>
              <view class="info-item">
                <view class="dot"></view>
                <u--text :text="'疑死数量: ' + '12'" color="#0F4239" size="28rpx" margin="12rpx"></u--text>
            </view>
          </view>
        </view>
      </uni-card>
      <!-- 今日天气 -->
      <uni-subTitle customIcon="tianqi" title="今日天气"/>
      <view class="weather-header">
        <view class="weather-hader-item">
          <u-icon custom-prefix="custom-icon custom-icon-richu" size="32rpx" color="#fff"></u-icon>
          <view class="value">{{ '05:37' }}</view>
        </view>
        <view class="weather-hader-item">
          <u-icon custom-prefix="custom-icon custom-icon-rila" size="32rpx" color="#fff"></u-icon>
          <view class="value">{{ '18:23' }}</view>
        </view>
        <view class="weather-hader-item">
          <u-icon custom-prefix="custom-icon custom-icon-fengli" size="26rpx" color="#fff"></u-icon>
          <view class="value">{{ '东北风 3级' }}</view>
        </view>
        <view class="weather-hader-item">
          <u-icon custom-prefix="custom-icon custom-icon-kongqishidu" size="28rpx" color="#fff"></u-icon>
          <view class="value">{{ '41%' }}</view>
        </view>
        <view class="weather-hader-item">
          <u-icon name="bell" size="32rpx" color="rgb(235, 37, 37)"></u-icon>
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
      <uni-subTitle customIcon="shenei" title="舍内环境" />
      <uni-card margin="0" padding="0" spacing="24rpx">
        <view class="switch-tab">
          <u-subsection :list="list" :current="current" activeColor="#333333" @change="sectionChange"></u-subsection>
        </view>
        <view class="tab-num">
          <view class="num-item" style="color:#DE868F;width: 20%;">30℃</view>
          <view class="num-item" style="color:#93D2F3;width: 20%;">60%</view>
          <view class="num-item" style="color:#FCCA00;width: 20%;">120lx</view>
          <view class="num-item" style="color:#7F83F7;width: 20%;">32℃</view>
          <view class="num-item" style="color:#B886F8;width: 20%;">78</view>
        </view>
        <view class="active-chart">
          <uni-line ref="activeChart"></uni-line>
        </view>
      </uni-card>
      <!-- 昨日总结 -->
      <uni-subTitle customIcon="xinxi" title="昨日总结(小AI日报生成)" />
      <uni-card margin="0" padding="0" spacing="24rpx">
        <view class="daily-briefing">
          <view v-for="(item,index) in summary" :key="index" class="daily-item">
            <view class="dot"></view>
            <u--text :text="item.content" color="#0F4239" size="28rpx" margin="12rpx"></u--text>
          </view>
        </view>
      </uni-card>
      <uni-subTitle icon="calendar-fill" title="今日待办"/>
      <scroll-view class="warning-list" :scroll-y="true">
        <view v-for="(item, index) in todayHandler" :key="index" class="warning-item" :style="{background: '#E6F7FF'}">
          <view class="item-title">
            <u-icon name="error-circle-fill" color="#199DFF" size="28rpx"></u-icon>
            <u--text :text="item.title" color="#333333" size="28rpx"></u--text>
          </view>
          <u--text :text="item.content" color="#0F4239" size="28rpx" lines="1"></u--text>
        </view>
      </scroll-view>
      <!-- 事件处理 -->
      <uni-subTitle customIcon="chart" title="风险提示"/>
      <scroll-view class="warning-list" :scroll-y="true">
        <view v-for="(item, index) in warningList" :key="index" class="warning-item" :style="{background: item.bgColor}">
          <view class="item-title">
            <u-icon :name="item.icon" :color="item.iconColor" size="28rpx"></u-icon>
            <u--text :text="item.title" color="#333333" size="28rpx"></u--text>
          </view>
          <u--text :text="item.content" color="#0F4239" size="28rpx" lines="1"></u--text>
        </view>
      </scroll-view>
    </view>
    <uni-tabbar :tabCurrent="0"></uni-tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
        list: ['温度', '湿度', '光照', 'HI', 'THI'],
        current: 0,
        summary: [
          {content: '目标检测算法统计，昨日在主舍区共'},
          {content: '畜群活跃度等级为7/10，显示'},
          {content: '未发现紧急预警事件，动物逃风险很低。'},
          {content: '车辆出入统计显示次货正常，无侵事件。'}
        ],
        warningList: [
          { type: 1, title: '资产风险', content: '2024年4月5日, x厂内发现死体', icon: 'close-circle-fill', iconColor: '#F5232D', bgColor: '#FFF1F0'},
          { type: 3, title: '资产风险', content: '2024年4月5日, x厂内发现死体', icon: 'info-circle-fill', iconColor: '#51C41B', bgColor: '#F6FFED'},
          { type: 3, title: '管理风险', content: '2024年4月5日, x厂内发现死体', icon: 'clock-fill', iconColor: '#FAAD15', bgColor: '#FFFBE6'},
        ],
        todayHandler: [
          { type: 1, title: 'DING', content: '2024年4月5日, x厂内发现死体', icon: 'error-circle-fill'},
          { type: 1, title: 'DING', content: '2024年4月5日, x厂内发现死体', icon: 'error-circle-fill'},
          { type: 1, title: 'DING', content: '2024年4月5日, x厂内发现死体', icon: 'error-circle-fill'},
        ]
      }
		},
		computed: {
      safetyTop() {
        return uni.getSystemInfoSync().safeAreaInsets.top
      }
		},
		onLoad() {
      uni.hideTabBar()
      this.sectionChange(0)
			// this.initData()
		},
    onReady() {
      this.initData()
    },
		methods: {
      sectionChange(index) {
        console.log(index)
        this.current = index
        if (this.current == 0) {
          let xData1 = ['05-01','05-02','05-03','05-04','05-05','05-06','05-07','05-08','05-09','05-10','05-11']
          let series1 =  [{
            name: "温度",
            data: ['23', '21', '21', '14', '25', '26', '27','21', '21', '14', '25',],
            color: '#DE868F'
          }]
          this.$refs.activeChart.initChart(xData1, series1, '℃')
        }
        if (this.current == 1) {
          let xData1 = ['05-01','05-02','05-03','05-04','05-05','05-06','05-07','05-08','05-09','05-10','05-11']
          let series1 =  [{
            name: "湿度",
            data: ['23', '21', '21', '14', '25', '26', '27','21', '21', '14', '25',],
            color: '#93D2F3'
          }]
          this.$refs.activeChart.initChart(xData1, series1, '%')
        }
        if (this.current == 2) {
          let xData1 = ['05-01','05-02','05-03','05-04','05-05','05-06','05-07','05-08','05-09','05-10','05-11']
          let series1 =  [{
            name: "光照度",
            data: ['23', '21', '21', '14', '25', '26', '27','21', '21', '14', '25',],
            color: '#FCCA00'
          }]
          this.$refs.activeChart.initChart(xData1, series1, 'lx')
        }
        if (this.current == 3) {
          let xData1 = ['05-01','05-02','05-03','05-04','05-05','05-06','05-07','05-08','05-09','05-10','05-11']
          let series1 =  [{
            name: "HI",
            data: ['23', '21', '21', '14', '25', '26', '27','21', '21', '14', '25',],
            color: '#7F83F7'
          }]
          this.$refs.activeChart.initChart(xData1, series1, '℃')
        }
        if (this.current == 4) {
          let xData1 = ['05-01','05-02','05-03','05-04','05-05','05-06','05-07','05-08','05-09','05-10','05-11']
          let series1 =  [{
            name: "THI",
            data: ['23', '21', '21', '14', '25', '26', '27','21', '21', '14', '25',],
            color: '#B886F8'
          }]
          this.$refs.activeChart.initChart(xData1, series1)
        }
      },
			initData(e) {
        let xData1 = ['00:00','01:00','02:00','03:00','04:00','05:00','06:00','07:00', '08:00','09:00','10:00', '11:00', '12:00']
        let series =  [{
          name: "温度",
          data: ['23', '21', '21', '14', '25', '26', '27', '17', '18', '19', '16', '15', '12'],
          color: '#19AECE'
        }]
        this.$refs.weatherChart.initChart(xData1, series)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.home-container {
    .content {
      background: linear-gradient(to bottom, #D6E7FF 0%, #FFFFFF 600rpx);
      padding: 0 24rpx 24rpx;
      .dot {
        width: 16rpx;
        height: 16rpx;
        border-radius: 50%;
        background-color: #10cc8f;
        margin: 22rpx 0;
      }
      .weather-header {
        width: 100%;
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
        margin: 12rpx 0;
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
      .tab-num {
        width: 100%;
        height: 56rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .num-item {
          text-align: center;
          font-weight: bold;
          font-size: 28rpx;
        }
      }
      .active-chart {
        width: 100%;
        height: 360rpx;
      }
      .manager-view{
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .fields-chart {
          height: 160rpx;
        }
        .manager-info {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          .info-item {
            display: flex;
            justify-content: flex-start;
            align-items: center;
          }
        }
      }
      .daily-briefing {
        width: 100%;
        .daily-item {
          display: flex;
          justify-content: flex-start;
          align-self: flex-start;
        }
      }
      .warning-list {
        max-height: 440rpx;
        .warning-item {
          height: 130rpx;
          padding: 24rpx;
          border-radius: 16rpx;
          margin-bottom: 24rpx;
          display: flex;
          justify-content: space-around;
          flex-direction: column;
          .item-title {
            display: flex;
            justify-content: flex-start;
            align-items: center;
          }
        }
      }
    }
	}
</style>