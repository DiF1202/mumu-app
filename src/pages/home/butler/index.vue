<template>
  <view class="home-container">
    <uni-navtopbar title="牧场管家" :back="true"></uni-navtopbar>
    <view class="content">
      <view class="position" @click="posIsshow = true">
        <u--image
          src="https://m.zzxmt.cn/cdn/icon/logo.png"
          width="38rpx"
          height="38rpx"
        ></u--image>
        <u--text
          :text="farm_name"
          color="#0F4239"
          size="28rpx"
          margin="12rpx"
        ></u--text>
      </view>
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
            <view class="value">{{ sunUpDown.sunrise }}</view>
          </view>
          <view class="weather-hader-item">
            <u-icon
              custom-prefix="custom-icon custom-icon-rila"
              size="32rpx"
              color="#333333"
            ></u-icon>
            <view class="value">{{ sunUpDown.sunset }}</view>
          </view>
          <view class="weather-hader-item">
            <u-icon
              custom-prefix="custom-icon custom-icon-fengli"
              size="26rpx"
              color="#333333"
            ></u-icon>
            <view class="value"
              >{{ today.wind_direction }}风{{ today.wind_scale }}级</view
            >
          </view>
          <view class="weather-hader-item">
            <u-icon
              custom-prefix="custom-icon custom-icon-kongqishidu"
              size="28rpx"
              color="#333333"
            ></u-icon>
            <view class="value">{{ today.humidity }}%</view>
          </view>
          <view class="weather-hader-item">
            <u-icon name="bell" size="32rpx" color="rgb(235, 37, 37)"></u-icon>
            <view class="value alarm">{{ alarm }}</view>
          </view>
        </view>
      </uni-card>
      <view class="weather-body">
        <uni-card margin="0" padding="0" spacing="24rpx">
          <view class="body-item">
            <view class="item-row">
              <view class="date">今天</view>
              <view class="air">{{ today.airQuilty }}</view>
              <view class="temp">{{ today.low }}~{{ today.high }}℃</view>
            </view>
            <view class="item-row">
              <view class="status">{{ today.text_day }}</view>
              <view v-if="today.code_day" style="background: #ccc">
                <u--image
                  :showLoading="true"
                  :src="`https://m.zzxmt.cn/cdn/weather/${today.code_day}@2x.png`"
                  width="16px"
                  height="16px"
                  mode="scaleToFill"
                ></u--image>
              </view>
            </view>
          </view>
        </uni-card>
        <uni-card margin="0" padding="0" spacing="24rpx">
          <view class="body-item">
            <view class="item-row">
              <view class="date">明天</view>
              <view class="air">{{ tomorrow.airQuilty }}</view>
              <view class="temp">{{ tomorrow.low }}~{{ tomorrow.high }}℃</view>
            </view>
            <view class="item-row">
              <view class="status">{{ tomorrow.text_day }}</view>
              <view v-if="tomorrow.code_day" style="background: #ccc">
                <u--image
                  :showLoading="true"
                  :src="`https://m.zzxmt.cn/cdn/weather/${tomorrow.code_day}@2x.png`"
                  width="14px"
                  height="14px"
                  mode="scaleToFill"
                ></u--image>
              </view>
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
            <view class="item-label">较前一天：</view>
            <view
              class="item-num"
              :class="daily.includes('+') ? 'plus' : 'reduce'"
              >{{ daily }}</view
            >
          </view>
          <view class="active-item">
            <view class="item-label">较过去一周：</view>
            <view
              class="item-num"
              :class="weekly.includes('+') ? 'plus' : 'reduce'"
              >{{ weekly }}</view
            >
          </view>
        </view>
      </uni-card>
      <!-- 热环境 -->
      <uni-subTitle customIcon="wenduji" title="热环境" />
      <uni-card margin="0" padding="0" spacing="24rpx">
        <view class="table-header">
          <view class="header-item">冷应激</view>
          <view class="header-item">舒适</view>
          <view class="header-item">热应激</view>
        </view>
        <scroll-view class="table-body" :scroll-y="true">
          <view class="body-row">
            <view class="row-item">栏位数</view>
            <view class="row-item bold" style="color: #347caf">{{
              production_data?.thermal_env_count?.cold
            }}</view>
            <view class="row-item bold" style="color: #81b33b">{{
              production_data?.thermal_env_count?.cozy
            }}</view>
            <view class="row-item bold" style="color: #fcca00">{{
              production_data?.thermal_env_count?.hot
            }}</view>
          </view>
        </scroll-view>
      </uni-card>
      <!-- 消警比例 -->
      <uni-subTitle icon="volume-off" title="消警比例" />
      <uni-card margin="0" padding="0" spacing="24rpx">
        <view class="eliminateAlarm">
          <uni-line ref="eliminateAlarmChart"></uni-line>
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
            <view class="active-item">
              <view class="item-label">较前一天</view>
              <view
                class="item-num"
                :class="env.includes('-') ? 'reduce' : 'plus'"
                >{{ env }}%</view
              >
            </view>
          </view>
          <view class="danger-item">
            <view class="item-chart">
              <uni-progress ref="assetProgressChart"></uni-progress>
            </view>
            <view class="active-item">
              <view class="item-label">较前一天</view>
              <view
                class="item-num"
                :class="animal.includes('-') ? 'reduce' : 'plus'"
                >{{ animal }}%</view
              >
            </view>
          </view>
          <view class="danger-item">
            <view class="item-chart">
              <uni-progress ref="manProgressChart"></uni-progress>
            </view>
            <view class="active-item">
              <view class="item-label">较前一天</view>
              <view
                class="item-num"
                :class="production.includes('-') ? 'reduce' : 'plus'"
                >{{ production }}%</view
              >
            </view>
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
    <u-picker :show="posIsshow" :columns="positionArr" keyName="name" @confirm="positionChange" @close="posIsshow = false" @cancel="posIsshow = false" :closeOnClickOverlay="true" :defaultIndex="defaultIndex"></u-picker>
    <uni-tabbar :tabCurrent="0"></uni-tabbar>
  </view>
</template>

<script>
import { userStore } from "@/store";
import { overViewApi } from '@/api/home.js'
import { getSunDay, getWeatherDaily, getAirQuality, getRisk, getDaily } from '@/api/weather.js'
import { positionList, position, alarmUnhandlerNumApi } from '@/api/utils.js'
export default {
  data () {
    return {
      list: ["动态存栏", "栏位占用", "异常数量"],
      current: 0,
      production_data: {},
      risk_note: {},
      env: '0',
      animal: '0',
      production: '0',
      daily: '0',
      weekly: '0',
      alarm: '无预警',
      sunUpDown: {},
      today: {},
      tomorrow: {},
      farm_name: "安徽窝阳",
      farm_id: '',
      positionArr: [],
      posWeather: 'hangzhou',
      posIsshow: false,
      defaultIndex: [0]
    }
  },
  onLoad () {
    uni.hideTabBar()
    this.getPositionList()
  },
  onPullDownRefresh () {
    this.initData()
  },
  methods: {
    // 请求位置(厂)列表
    getPositionList() {
      positionList().then(res => {
        this.positionArr = [res.data]
        this.positionChange({ value: [res.data[0]], indexs: [0] })
      })
    },
    // 切换位置
    positionChange (val) {
      this.defaultIndex = val.indexs
      this.farm_name = val.value[0].name
      this.farm_id = val.value[0].id
      this.posWeather = val.value[0].area_alias_name
      position({ farm_id: this.farm_id }).then(res => {
        this.posIsshow = false
        this.initData()
      })
    },
    // 生产概况  
    handlerData (arr, name, color, unit) {
      let xData = []
      let yData = { name: name, data: [], color: color }
      let max = 100
      arr.map(item => {
        xData.push(item.date)
        yData.data.push(item.score)
      })
      if (arr.length > 0 && name !== '栏位占用') {
        max = Math.max(...yData.data)
      }
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
          this.handlerData(this.production_data.death_count_data, "异常数量", "#BD3124", '头')
          break
      }
    },
    // 消警比例
    eliminateAlarm () {
      let xData = []
      let yData = { name: '平均消警比例', data: [], color: '#00443A' }
      this.production_data.alarm_data.map(item => {
        xData.push(item.date)
        yData.data.push(item.alarm_handle_rate)
      })
      this.$refs.eliminateAlarmChart.initChart(xData, [yData], '%')
    },
    // 风险提示
    riskNote () {
      let data1 = [{ data: "1", color: "#CCF738" }];
      let data2 = [{ data: "1", color: "#DE868F" }];
      let data3 = [{ data: "1", color: "#FCCA00" }];
      this.$refs.envProgressChart.initChart(data1, this.risk_note.risk_count.env_risk_count || '0', '环境风险')
      this.$refs.assetProgressChart.initChart(data2, this.risk_note.risk_count.animal_risk_count || '0', '动物风险')
      this.$refs.manProgressChart.initChart(data3, this.risk_note.risk_count.production_risk_count || '0', '管理风险')
    },
    // 初始化
    initData () {
      overViewApi().then(res => {
        uni.stopPullDownRefresh()
        this.farm_name = res.data.farm_name
        this.production_data = res.data.production_data
        this.risk_note = res.data.risk_note
        this.daily = this.production_data?.animal_activity_change?.daily
        this.weekly = this.production_data?.animal_activity_change?.weekly
        this.env = res.data.risk_note.risk_change_daily.env.toString()
        this.animal = res.data.risk_note.risk_change_daily.animal.toString()
        this.production = res.data.risk_note.risk_change_daily.production.toString()
        this.sectionChange(0)
        this.eliminateAlarm()
        this.riskNote()
      })
      // 监控页面未处理数量接口
      alarmUnhandlerNumApi().then(res => {
        let total = res.data.un_handle_total || 0
        userStore().set_alarm_num(total)
      })
      getSunDay(this.posWeather).then(res => {
        this.sunUpDown = res[0].sun[0]
      })
      getWeatherDaily(this.posWeather).then(res => {
        this.today = res[0].daily[0]
        this.tomorrow = res[0].daily[1]
        getAirQuality(this.posWeather).then(res => {
          this.today.airQuilty = res[0].daily[0].quality
          this.tomorrow.airQuilty = res[0].daily[1].quality
        })  
      })
      getRisk(this.posWeather).then(res => {
        if (res[0].alarms.length > 0) {
          this.alarm = res[0].alarms[0].type
        }
      })
      getDaily(this.posWeather).then(res => {
        let xData = []
        let series = [{name: "温度",data: [],color: "#19AECE"}]
        let max = 30
        res[0].hourly.map(item =>{
          xData.push(item.time.substring(11, 16))
          series[0].data.push(item.temperature)
        })
        if (series[0].data.length > 0) {
          max = Math.max(...series[0].data)
        }
        this.$refs.weatherChart.initChart(xData, series, max, '℃', 'left')
      })
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
    background: #f4f4f4;
    padding: 0 24rpx 24rpx;
    .position {
      display: flex;
      align-items: center;
    }
    .weather-header {
      width: 100%;
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
      height: 250rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .danger-item {
        width: 210rpx;
        height: 100%;
        .item-chart {
          width: 200rpx;
          height: 200rpx;
        }
        .active-item {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #333333;
          font-size: 28rpx;
          .item-num {
            font-size: 30rpx;
            font-weight: bold;
          }
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
