<template>
  <view class="home-container">
    <uni-navtopbar title="值守卫士" :back="true"></uni-navtopbar>
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
      <uni-subTitle
        icon="account"
        :title="staff_name"
        :value="'负责栏位数:' + pen_count"
      />
      <uni-card margin="0" padding="0" spacing="24rpx">
        <view class="manager-view">
          <u--image
            :showLoading="true"
            :src="userAvatar"
            width="160rpx"
            height="160rpx"
            shape="circle"
          ></u--image>
          <view class="manager-info">
            <view class="info-item">
              <view class="dot"></view>
              <u--text
                :text="'动态存栏：' + animal_count"
                color="#0F4239"
                size="24rpx"
                margin="12rpx"
              ></u--text>
            </view>
            <view class="info-item">
              <view class="dot"></view>
              <u--text
                :text="'栏位占用：' + pen_occupancy_rate"
                color="#0F4239"
                size="24rpx"
                margin="12rpx"
              ></u--text>
            </view>
            <view class="info-item">
              <view class="dot"></view>
              <u--text
                :text="'疑死数量：' + death_count"
                color="#0F4239"
                size="24rpx"
                margin="12rpx"
              ></u--text>
            </view>
          </view>
        </view>
      </uni-card>
      <u-gap height="12rpx"></u-gap>
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
      <uni-subTitle customIcon="shenei" title="舍内环境" />
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
          <view class="num-item" style="color: #de868f; width: 20%">{{ housing_environment?.temperature }}℃</view>
          <view class="num-item" style="color: #93d2f3; width: 20%">{{ housing_environment?.humidity }}%</view>
          <view class="num-item" style="color: #fcca00; width: 20%">{{ housing_environment?.illuminance }}lx</view>
          <view class="num-item" style="color: #7f83f7; width: 20%">{{ housing_environment?.HI }}</view>
          <view class="num-item" style="color: #b886f8; width: 20%">{{ housing_environment?.THI }}</view>
        </view>
        <view class="active-chart">
          <!-- <uni-kchart ref="activeChart"></uni-kchart> -->
          <!-- <uni-boxplot ref="activeChart"></uni-boxplot> -->
          <uni-line ref="activeChart"></uni-line>
        </view>
      </uni-card>
      <!-- 昨日总结 -->
      <uni-subTitle customIcon="xinxi" title="昨日总结(小AI日报生成)" />
      <uni-card margin="0" padding="0" spacing="24rpx">
        <view class="daily-briefing">
          <view
            v-for="(item, index) in summary"
            :key="index"
            class="daily-item"
          >
            <view class="dot"></view>
            <u--text
              :text="item.content"
              color="#0F4239"
              size="28rpx"
              margin="12rpx"
            ></u--text>
          </view>
        </view>
      </uni-card>
      <uni-subTitle icon="calendar-fill" title="今日待办" />
      <scroll-view class="warning-list" :scroll-y="true">
        <view
          v-for="(item, index) in todayHandler"
          :key="index"
          class="warning-item"
          :style="{ background: '#E6F7FF' }"
          @click="enterDetails(item.id)"
        >
          <view class="item-title">
            <u-icon
              name="error-circle-fill"
              color="#199DFF"
              size="28rpx"
            ></u-icon>
            <u--text :text="item.ding_operation_name + '-' + 'DING了您一下'" color="#333333" size="28rpx"></u--text>
          </view>
          <u--text
            :text="item.ding_content"
            color="#0F4239"
            size="28rpx"
            lines="1"
          ></u--text>
        </view>
      </scroll-view>
      <!-- 事件处理 -->
      <uni-subTitle customIcon="chart" title="风险提示" />
      <scroll-view class="warning-list" :scroll-y="true" @scrolltolower="getMore">
        <view
          v-for="(item, index) in warningList"
          :key="index"
          class="warning-item"
          :style="{ background: item.bgColor }"
          @click="enterDetails(item.id)"
        >
          <view class="item-title">
            <u-icon
              :name="item.icon"
              :color="item.iconColor"
              size="28rpx"
            ></u-icon>
            <u--text :text="item.title" color="#333333" size="28rpx"></u--text>
          </view>
          <u--text
            :text="item.ding_content"
            color="#0F4239"
            size="28rpx"
            lines="1"
          ></u--text>
        </view>
      </scroll-view>
    </view>
    <u-picker :show="posIsshow" :columns="positionArr" keyName="name" @confirm="positionChange" @close="posIsshow = false" @cancel="posIsshow = false" :closeOnClickOverlay="true" :defaultIndex="defaultIndex"></u-picker>
    <uni-tabbar :tabCurrent="0"></uni-tabbar>
  </view>
</template>

<script>
import {
  overViewGuardApi,
  summaryApi,
  dingListApi,
  riskStatementApi
} from "@/api/home.js";
import {
  getSunDay,
  getWeatherDaily,
  getAirQuality,
  getRisk,
  getDaily
} from "@/api/weather.js";
import { positionList, position, alarmUnhandlerNumApi } from '@/api/utils.js'
import { userStore } from "@/store";
export default {
  data () {
    return {
      list: ["温度", "湿度", "光照", "HI", "THI"],
      current: 0,
      staff_name: "",
      animal_count: "",
      pen_occupancy_rate: "",
      pen_count: "",
      death_count: "",
      housing_environment: {},
      summary: [],
      warningList: [],
      todayHandler: [],
      alarm: "无预警",
      sunUpDown: {},
      page: 1,
      limit: 3,
      noData: false,
      today: {},
      tomorrow: {},
      farm_name: "安徽窝阳",
      farm_id: '',
      positionArr: [],
      posWeather: 'hangzhou',
      posIsshow: false,
      defaultIndex: [0]
    };
  },
  computed: {
    safetyTop () {
      return uni.getSystemInfoSync().safeAreaInsets.top;
    },
    userAvatar () {
      return (
        userStore().user_info.avatar || "https://m.zzxmt.cn/cdn/icon/woman.png"
      );
    }
  },
  onLoad () {
    uni.hideTabBar();
    this.noData = false
    this.warningList = []
    this.page = 1;
    this.getPositionList();
  },
  onPullDownRefresh () {
    this.noData = false
    this.warningList = []
    this.page = 1;
    this.initData();
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
    enterDetails (id) {
      uni.navigateTo({ url: "/pages/view/components/details/index?id=" + id });
    },
    // 舍内环境
    sectionChange (index) {
      this.current = index;
      switch (index) {
        case 0:
          this.initHouseEnv(
            this.housing_environment?.temperature_data || [],
            "℃",
            "#DE868F",
            "平均温度",
            "#DE868F"
          );
          break;
        case 1:
          this.initHouseEnv(
            this.housing_environment?.humidity_data || [],
            "%",
            "#93D2F3",
            "平均湿度",
            "#93D2F3"
          );
          break;
        case 2:
          this.initHouseEnv(
            this.housing_environment?.illuminance_data || [],
            "lx",
            "#FCCA00",
            "平均光照",
            "#FCCA00"
          );
          break;
        case 3:
          this.initHouseEnv(
            this.housing_environment?.HI_data || [],
            "",
            "#7F83F7",
            "平均HI",
            "#7F83F7"
          );
          break;
        case 4:
          this.initHouseEnv(
            this.housing_environment?.THI_data || [],
            "",
            "#B886F8",
            "平均THI",
            "#B886F8"
          );
          break;
      }
    },
    initHouseEnv (arr, unit, color, name, boxColor) {
      let xData = []
      let yData = { name: name, data: [], color: color }
      arr.map(item => {
        xData.push(item.date)
        yData.data.push(item.score)
      })
      this.$refs.activeChart.initChart(xData, [yData], unit)
    },
    getMore() {
      if (!this.noData) {
        this.page += 1
        this.getRiskList()
      }
    },
    getRiskList() {
      if (!this.noData) {
        riskStatementApi({
          page: this.page,
          limit: this.limit
        }).then(res => {
          if (res.data.length > 0) {
            res.data.map(item => {
              if (item.title == "环境风险") {
                item.icon = "info-circle-fill";
                item.iconColor = "#51C41B";
                item.bgColor = "#F6FFED";
              }
              if (item.title == "管理风险") {
                item.icon = "close-circle-fill";
                item.iconColor = "#F5232D";
                item.bgColor = "#FFF1F0";
              }
              if (item.title == "动物风险") {
                item.icon = "clock-fill";
                item.iconColor = "#FAAD15";
                item.bgColor = "#FFFBE6";
              }
              if (item.title == '其他风险') {
                item.icon = "more-circle-fill";
                item.iconColor = "#736d6c";
                item.bgColor = "#dcd7d6";
              }
            });
            this.warningList = this.warningList.concat(res.data);
            console.log(this.warningList)
          } else {
            this.noData = true
          }
        });
      }
    },
    initData () {
      overViewGuardApi().then(res => {
        uni.stopPullDownRefresh();
        this.staff_name = res.data.staff_name || "0";
        this.animal_count = res.data.animal_count || "0";
        this.pen_occupancy_rate = res.data.pen_occupancy_rate || "0";
        this.death_count = res.data.death_count || "0";
        this.pen_count = res.data.pen_count || "0";
        this.housing_environment = res.data.housing_environment;
        this.sectionChange(0);
      });
      this.getRiskList()
      // 监控页面未处理数量接口
      alarmUnhandlerNumApi().then(res => {
        let total = res.data.un_handle_total || 0
        userStore().set_alarm_num(total)
      })
      summaryApi().then(res => {
        this.summary = res.data.yesterday_summary;
      });
      dingListApi().then(res => {
        this.todayHandler = res.data;
      });
      getSunDay(this.posWeather).then(res => {
        this.sunUpDown = res[0].sun[0];
      });
      getWeatherDaily(this.posWeather).then(res => {
        this.today = res[0].daily[0];
        this.tomorrow = res[0].daily[1];
        getAirQuality(this.posWeather).then(res => {
          this.today.airQuilty = res[0].daily[0].quality;
          this.tomorrow.airQuilty = res[0].daily[1].quality;
        });
      });
      getRisk(this.posWeather).then(res => {
        if (res[0].alarms.length > 0) {
          this.alarm = res[0].alarms[0].type;
        }
      });
      getDaily(this.posWeather).then(res => {
        let xData = [];
        let series = [{ name: "温度", data: [], color: "#19AECE" }];
        res[0].hourly.map(item => {
          xData.push(item.time.substring(11, 16));
          series[0].data.push(item.temperature);
        });
        this.$refs.weatherChart.initChart(xData, series, "", "℃", "left");
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.home-container {
  .content {
    // background: linear-gradient(to bottom, #d6e7ff 0%, #ffffff 600rpx);
    background: #f4f4f4;
    padding: 0 24rpx 24rpx;
    .position {
      display: flex;
      align-items: center;
    }
    .dot {
      width: 16rpx;
      height: 16rpx;
      border-radius: 50%;
      background-color: #00443a;
      margin: 22rpx 0;
    }
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
        text-align: center;
        font-weight: bold;
        font-size: 28rpx;
      }
    }
    .active-chart {
      width: 100%;
      height: 360rpx;
    }
    .manager-view {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .fields-chart {
        height: 160rpx;
      }
      .manager-info {
        width: calc(100% - 180rpx);
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        .info-item {
          width: 50%;
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
