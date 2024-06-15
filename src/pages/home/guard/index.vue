<template>
  <view class="home-container">
    <uni-navtopbar title="值守卫士" :back="true"></uni-navtopbar>
    <view class="content">
      <uni-subTitle icon="account" title="杨大坤" value="负责栏位:45" />
      <uni-card margin="0" padding="0" spacing="24rpx">
        <view class="manager-view">
          <u--image
            :showLoading="true"
            src="https://m.zzxmt.cn/cdn/icon/woman.png"
            width="160rpx"
            height="160rpx"
            shape="circle"
          ></u--image>
          <view class="manager-info">
            <view class="info-item">
              <view class="dot"></view>
              <u--text
                :text="'负责人：' + staff_name"
                color="#0F4239"
                size="24rpx"
                margin="12rpx"
              ></u--text>
            </view>
            <view class="info-item">
              <view class="dot"></view>
              <u--text
                :text="'动态存栏：' + animal_count"
                color="#0F4239"
                size="24rpx"
                margin="12rpx"
              ></u--text>
            </view>
          </view>
          <view class="manager-info">
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
                :text="'疑死数量: ' + death_count"
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
          <view class="num-item" style="color: #de868f; width: 20%">30℃</view>
          <view class="num-item" style="color: #93d2f3; width: 20%">60%</view>
          <view class="num-item" style="color: #fcca00; width: 20%">120lx</view>
          <view class="num-item" style="color: #7f83f7; width: 20%">32℃</view>
          <view class="num-item" style="color: #b886f8; width: 20%">78</view>
        </view>
        <view class="active-chart">
          <!-- <uni-kchart ref="activeChart"></uni-kchart> -->
          <uni-boxplot ref="activeChart"></uni-boxplot>
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
            <u--text text="DING" color="#333333" size="28rpx"></u--text>
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
      <scroll-view class="warning-list" :scroll-y="true">
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
export default {
  data () {
    return {
      list: ["温度", "湿度", "光照", "HI", "THI"],
      current: 0,
      staff_name: "",
      animal_count: "",
      pen_occupancy_rate: "",
      death_count: "",
      housing_environment: {},
      summary: [],
      warningList: [],
      todayHandler: []
    };
  },
  computed: {
    safetyTop () {
      return uni.getSystemInfoSync().safeAreaInsets.top;
    }
  },
  onLoad () {
    uni.hideTabBar();
  },
  onReady () {
    this.initData();
  },
  onPullDownRefresh () {
    this.initData()
  },
  methods: {
    enterDetails (id) {
      uni.navigateTo({ url: "/pages/view/components/details/index?id=" + id });
    },
    // 舍内环境
    sectionChange (index) {
      this.current = index;
      switch (index) {
        case 0:
          this.initHouseEnv(
            this.housing_environment.temperature_data,
            "℃",
            "#DE868F",
            "平均温度"
          );
          break;
        case 1:
          this.initHouseEnv(
            this.housing_environment.humidity_data,
            "%",
            "#93D2F3",
            "平均湿度"
          );
          break;
        case 2:
          this.initHouseEnv(
            this.housing_environment.illuminance_data,
            "lx",
            "#FCCA00",
            "平均光照"
          );
          break;
        case 3:
          this.initHouseEnv(
            this.housing_environment.HI_data,
            "℃",
            "#7F83F7",
            "平均HI"
          );
          break;
        case 4:
          this.initHouseEnv(
            this.housing_environment.THI_data,
            "",
            "#B886F8",
            "平均THI"
          );
          break;
      }
    },
    initHouseEnv (arr, unit, color, name) {
      let xData = [];
      let yData = [];
      let lineData = [];
      arr.map(item => {
        xData.push(item.date.slice(5));
        yData.push(item.score);
        lineData.push(item.score[2]);
      });
      this.$refs.activeChart.initChart(
        xData,
        yData,
        lineData,
        unit,
        color,
        name
      );
    },
    // 24h天气
    initData () {
      overViewGuardApi().then(res => {
        uni.stopPullDownRefresh()
        this.staff_name = res.data.staff_name || "";
        this.animal_count = res.data.animal_count || "";
        this.pen_occupancy_rate = res.data.pen_occupancy_rate || "";
        this.death_count = res.data.death_count || "";
        this.housing_environment = res.data.housing_environment;
        this.sectionChange(0);
      });
      summaryApi().then(res => {
        this.summary = res.data.yesterday_summary;
      });
      dingListApi().then(res => {
        this.todayHandler = res.data;
      });
      riskStatementApi().then(res => {
        // let arr = [res.data.env_risk, res.data.animal_risk, res.data.production_risk]
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
        });
        this.warningList = res.data;
      });
      let xData1 = [
        "00:00",
        "01:00",
        "02:00",
        "03:00",
        "04:00",
        "05:00",
        "06:00",
        "07:00",
        "08:00",
        "09:00",
        "10:00",
        "11:00",
        "12:00"
      ];
      let series = [
        {
          name: "温度",
          data: [
            "23",
            "21",
            "21",
            "14",
            "25",
            "26",
            "27",
            "17",
            "18",
            "19",
            "16",
            "15",
            "12"
          ],
          color: "#19AECE"
        }
      ];
      this.$refs.weatherChart.initChart(xData1, series, '', '℃');
    }
  }
}
</script>

<style lang="scss" scoped>
.home-container {
  .content {
    // background: linear-gradient(to bottom, #d6e7ff 0%, #ffffff 600rpx);
    background: #f4f4f4;
    padding: 0 24rpx 24rpx;
    .manager-view {
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
    // .weather-header {
    //   width: 100%;
    //   background: linear-gradient(
    //     90deg,
    //     rgba(25, 174, 206, 0.9) 0%,
    //     rgba(25, 174, 206, 0.5) 100%
    //   );
    //   border-radius: 12rpx;
    //   padding: 24rpx;
    //   display: flex;
    //   justify-content: space-between;
    //   align-items: center;
    //   .weather-hader-item {
    //     display: flex;
    //     justify-content: flex-start;
    //     align-items: center;
    //     .value {
    //       color: #fff;
    //       font-size: 24rpx;
    //       margin-left: 8rpx;
    //       line-height: 28rpx;
    //     }
    //     .alarm {
    //       color: rgb(235, 37, 37);
    //     }
    //   }
    // }
    // .weather-body {
    //   width: 100%;
    //   display: flex;
    //   justify-content: space-between;
    //   align-items: center;
    //   margin: 12rpx 0;
    //   .body-item {
    //     width: calc(50% - 6rpx);
    //     height: 120rpx;
    //     background: linear-gradient(
    //       90deg,
    //       rgba(25, 174, 206, 0.9) 0%,
    //       rgba(25, 174, 206, 0.5) 100%
    //     );
    //     border-radius: 12rpx;
    //     padding: 24rpx;
    //     display: flex;
    //     flex-direction: column;
    //     justify-content: space-between;
    //     align-items: center;
    //     .item-row {
    //       width: 100%;
    //       display: flex;
    //       justify-content: space-between;
    //       align-items: center;
    //       color: #fff;
    //       color: #fff;
    //       font-size: 24rpx;
    //       view {
    //         line-height: 28rpx;
    //       }
    //     }
    //   }
    // }
    // .weather-chart {
    //   width: 100%;
    //   height: 250rpx;
    // }
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
