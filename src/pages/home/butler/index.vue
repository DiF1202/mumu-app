<template>
  <view class="home-container">
    <uni-navtopbar title="牧场管家" :back="true"></uni-navtopbar>
    <view class="content">
      <!-- <u-icon name="map" color="#00443A" size="46rpx" :label="farm_name" labelSize="28rpx" labelColor="#0F4239"></u-icon> -->
      <u-icon
        name="map"
        color="#00443A"
        size="46rpx"
        :label="farm_name"
        labelSize="28rpx"
        labelColor="#333333"
      ></u-icon>
      <!-- 今日天气 -->
      <uni-subTitle customIcon="tianqi" title="今日天气" />
      <uni-card margin="0" padding="0" spacing="24rpx">
        <view class="weather-header">
          <view class="weather-hader-item">
            <u-icon
              custom-prefix="custom-icon custom-icon-richu"
              size="32rpx"
              color="#333333"
            ></u-icon>
            <view class="value">{{ '05:37' }}</view>
          </view>
          <view class="weather-hader-item">
            <u-icon
              custom-prefix="custom-icon custom-icon-rila"
              size="32rpx"
              color="#333333"
            ></u-icon>
            <view class="value">{{ '18:23' }}</view>
          </view>
          <view class="weather-hader-item">
            <u-icon
              custom-prefix="custom-icon custom-icon-fengli"
              size="26rpx"
              color="#333333"
            ></u-icon>
            <view class="value">{{ '东北风 3级' }}</view>
          </view>
          <view class="weather-hader-item">
            <u-icon
              custom-prefix="custom-icon custom-icon-kongqishidu"
              size="28rpx"
              color="#333333"
            ></u-icon>
            <view class="value">{{ '41%' }}</view>
          </view>
          <view class="weather-hader-item">
            <u-icon name="bell" size="32rpx" color="rgb(235, 37, 37)"></u-icon>
            <view class="value alarm">{{ '高温高湿' }}</view>
          </view>
        </view>
      </uni-card>
      <view class="weather-body">
        <uni-card margin="0" padding="0" spacing="24rpx">
          <view class="body-item">
            <view class="item-row">
              <view class="date">今天</view>
              <view class="air">{{ '良' }}</view>
              <view class="temp">{{ '28~14' }}℃</view>
            </view>
            <view class="item-row">
              <view class="status">{{ '多云' }}</view>
              <u--image
                :showLoading="true"
                :src="`https://m.zzxmt.cn/cdn/weather/5@2x.png`"
                width="14px"
                height="14px"
                mode="scaleToFill"
              ></u--image>
            </view>
          </view>
        </uni-card>
        <uni-card margin="0" padding="0" spacing="24rpx">
          <view class="body-item">
            <view class="item-row">
              <view class="date">明天</view>
              <view class="air">{{ '良' }}</view>
              <view class="temp">{{ '28~14' }}℃</view>
            </view>
            <view class="item-row">
              <view class="status">{{ '多云' }}</view>
              <u--image
                :showLoading="true"
                :src="`https://m.zzxmt.cn/cdn/weather/6@2x.png`"
                width="14px"
                height="14px"
                mode="scaleToFill"
              ></u--image>
            </view>
          </view>
        </uni-card>
      </view>
      <uni-card margin="0" padding="0" spacing="24rpx">
        <view class="weather-chart">
          <uni-tarea ref="weatherChart" unit="℃" :max="30"></uni-tarea>
        </view>
      </uni-card>
      <!-- 生产概况 -->
      <uni-subTitle
        customIcon="shengchan"
        title="生产概况"
        value="详情"
        url="pages/home/production/index"
      />
      <uni-card margin="0" padding="0" spacing="24rpx">
        <view class="switch-tab">
          <u-subsection
            :list="list"
            :current="current"
            activeColor="#333333"
            @change="sectionChange"
          ></u-subsection>
        </view>
        <view class="tab-num">
          <view class="num-item" style="color: #81b33b">{{
            production_data?.animal_count
          }}</view>
          <view class="num-item" style="color: #347caf">{{
            production_data?.pen_occupancy_rate
          }}</view>
          <view class="num-item" style="color: #bd3124">{{
            production_data?.death_count
          }}</view>
        </view>
        <view class="active-chart">
          <uni-tarea ref="activeChart" unit="℃" :max="30"></uni-tarea>
        </view>
      </uni-card>
      <!-- 畜群活跃程度 -->
      <uni-subTitle customIcon="heart" title="畜群活跃程度" />
      <uni-card margin="0" padding="0" spacing="24rpx">
        <view class="active-statistic">
          <view class="active-item">
            <view class="item-label">较昨日：</view>
            <view class="item-num">{{
              production_data?.animal_activity_change?.daily
            }}</view>
          </view>
          <view class="active-item">
            <view class="item-label">较过去一周：</view>
            <view class="item-num">{{
              production_data?.animal_activity_change?.weekly
            }}</view>
          </view>
        </view>
      </uni-card>
      <!-- 热环境 -->
      <uni-subTitle customIcon="wenduji" title="热环境" />
      <uni-card margin="0" padding="0" spacing="24rpx">
        <view class="table-header">
          <view class="header-item">热应急</view>
          <view class="header-item">冷应激</view>
          <view class="header-item">舒适</view>
        </view>
        <scroll-view class="table-body" :scroll-y="true">
          <view class="body-row">
            <view class="row-item">栏位数</view>
            <view class="row-item bold">{{
              production_data?.thermal_env_count?.hot
            }}</view>
            <view class="row-item bold">{{
              production_data?.thermal_env_count?.cold
            }}</view>
            <view class="row-item bold">{{
              production_data?.thermal_env_count?.cozy
            }}</view>
          </view>
        </scroll-view>
      </uni-card>
      <!-- 消警比例 -->
      <uni-subTitle icon="volume-off" title="消警比例" />
      <uni-card margin="0" padding="0" spacing="24rpx">
        <view class="eliminateAlarm">
          <!-- <uni-kchart ref="eliminateAlarmChart"></uni-kchart> -->
          <uni-boxplot ref="eliminateAlarmChart"></uni-boxplot>
        </view>
      </uni-card>
      <!-- 风险提示 -->
      <uni-subTitle
        icon="warning"
        title="风险提示"
        value="详情"
        url="pages/home/risk/index"
      />
      <uni-card margin="0" padding="0" spacing="24rpx">
        <view class="danger-statistic">
          <view class="danger-item">
            <view class="item-chart">
              <uni-progress ref="envProgressChart"></uni-progress>
            </view>
            <view class="item-subTitle">环境风险</view>
            <view class="item-subTitle"
              >较昨日{{ risk_note?.risk_change_daily?.env }}%</view
            >
          </view>
          <view class="danger-item">
            <view class="item-chart">
              <uni-progress ref="assetProgressChart"></uni-progress>
            </view>
            <view class="item-subTitle">动物风险</view>
            <view class="item-subTitle"
              >较昨日{{ risk_note?.risk_change_daily?.animal }}%</view
            >
          </view>
          <view class="danger-item">
            <view class="item-chart">
              <uni-progress ref="manProgressChart"></uni-progress>
            </view>
            <view class="item-subTitle">生产风险</view>
            <view class="item-subTitle"
              >较昨日{{ risk_note?.risk_change_daily?.production }}%</view
            >
          </view>
        </view>
      </uni-card>
      <view class="ai-btn">
        <u-button
          color="#10cc8F"
          shape="circle"
          text="小牧AI日报"
          @click="enterAiReport()"
        ></u-button>
      </view>
    </view>
    <uni-tabbar :tabCurrent="0"></uni-tabbar>
  </view>
</template>

<script>
import { overViewApi } from '@/api/home.js'
export default {
  data () {
    return {
      farm_name: "安徽窝阳",
      currentDate: "2024-5-19",
      list: ["动态存栏", "栏位占用", "疑死数量"],
      current: 0,
      production_data: {},
      risk_note: {},
    }
  },
  onLoad () {
    uni.hideTabBar()
  },
  onReady () {
    this.initData()
  },
  onPullDownRefresh () {
    this.initData()
  },
  methods: {
    // 生产概况  
    handlerData (arr, name, color, unit) {
      let xData = []
      let yData = { name: name, data: [], color: color }
      arr.map(item => {
        xData.push(item.date.slice(5))
        yData.data.push(item.score)
      })
      let max = Math.max(...yData.data)
      this.$refs.activeChart.initChart(xData, [yData], max, unit)
    },
    sectionChange (index) {
      this.current = index
      switch (index) {
        case 0:
          this.handlerData(this.production_data.animal_count_data, "动态存栏", "#81B33B", '头')
          break
        case 1:
          this.handlerData(this.production_data.pen_occupancy_rate_data, "栏位占用", "#347CAF", '%')
          break
        case 2:
          this.handlerData(this.production_data.pen_occupancy_rate_data, "疑死数量", "#BD3124", '头')
          break
      }
    },
    // 消警比例
    eliminateAlarm () {
      let xData = []
      let yData = []
      let lineData = []
      this.production_data.alarm_data.map(item => {
        xData.push(item.date.slice(5))
        yData.push(item.alarm_handle_rate)
        lineData.push(item.alarm_handle_rate[2])
      })
      this.$refs.eliminateAlarmChart.initChart(xData, yData, lineData, "%", '#00443A', '平均消警比例')
    },
    // 风险提示
    riskNote () {
      let data1 = [{ data: "1", color: "#CCF738" }];
      let data2 = [{ data: "1", color: "#DE868F" }];
      let data3 = [{ data: "1", color: "#FCCA00" }];
      this.$refs.envProgressChart.initChart(data1, this.risk_note.risk_count.env_risk_count)
      this.$refs.assetProgressChart.initChart(data2, this.risk_note.risk_count.animal_risk_count)
      this.$refs.manProgressChart.initChart(data3, this.risk_note.risk_count.production_risk_count)
    },
    // 初始化
    initData () {
      overViewApi().then(res => {
        uni.stopPullDownRefresh()
        this.farm_name = res.data.farm_name
        this.production_data = res.data.production_data
        this.risk_note = res.data.risk_note
        this.sectionChange(0)
        this.eliminateAlarm()
        this.riskNote()
      })
      // 24小时天气
      let xData = ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00"]
      let series = [
        {
          name: "温度",
          data: ["23", "21", "21", "14", "25", "26", "27", "17", "18", "19",],
          color: "#19AECE",
        },
      ];
      this.$refs.weatherChart.initChart(xData, series, '', '℃')
    },
    // 跳转日报
    enterAiReport () {
      uni.navigateTo({ url: "/pages/home/dailyReport/index" });
    },
  },
};
</script>

<style lang="scss" scoped>
.home-container {
  .content {
    // background: linear-gradient(to bottom, #d6e7ff 0%, #ffffff 600rpx);
    background: #f4f4f4;
    padding: 0 24rpx 24rpx;
    .weather-header {
      width: 100%;
      // background: linear-gradient(
      //   90deg,
      //   rgba(25, 174, 206, 0.9) 0%,
      //   rgba(25, 174, 206, 0.5) 100%
      // );
      // border-radius: 12rpx;
      // padding: 24rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .weather-hader-item {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .value {
          color: #333333;
          font-size: 26rpx;
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
        width: 297rpx;
        height: 72rpx;
        // background: linear-gradient(
        //   90deg,
        //   rgba(25, 174, 206, 0.9) 0%,
        //   rgba(25, 174, 206, 0.5) 100%
        // );
        // border-radius: 12rpx;
        // padding: 24rpx;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        .item-row {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #333333;
          font-size: 26rpx;
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
        width: 33%;
        text-align: center;
        font-weight: bold;
        font-size: 28rpx;
      }
    }
    .active-chart {
      width: 100%;
      height: 360rpx;
    }
    .active-statistic {
      width: 100%;
      height: 56rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .active-item {
        width: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #333333;
        font-size: 28rpx;
      }
    }
    .table-header {
      width: 100%;
      height: 56rpx;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      border-bottom: 1rpx solid #d6d7d9;
      .header-item {
        font-size: 28rpx;
        color: #333333;
        width: 25%;
        text-align: center;
      }
    }
    .table-body {
      width: 100%;
      max-height: 300rpx;
      .body-row {
        width: 100%;
        height: 56rpx;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        border-bottom: 1rpx solid #d6d7d9;
      }
      .row-item {
        font-size: 28rpx;
        color: #333333;
        width: 25%;
        text-align: center;
      }
    }
    .eliminateAlarm {
      width: 100%;
      height: 360rpx;
    }
    .danger-statistic {
      width: 100%;
      height: 300rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .danger-item {
        width: 200rpx;
        height: 100%;
        .item-chart {
          width: 200rpx;
          height: 200rpx;
        }
        .item-subTitle {
          width: 200rpx;
          text-align: center;
          font-size: 28rpx;
          color: #333333;
        }
      }
    }
    .ai-btn {
      margin: 24rpx 100rpx;
      height: 80rpx;
    }
  }
}
</style>
