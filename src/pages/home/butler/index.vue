<template>
  <view class="home-container">
    <uni-navtopbar title="信息概览" :back="true"></uni-navtopbar>
    <view class="content">
      <u-icon name="map" color="#10cc8f" size="46rpx" :label="position + ' ' + currentDate" labelSize="28rpx" labelColor="#0F4239"></u-icon>
      <!-- 今日天气 -->
      <uni-subTitle customIcon="tianqi" title="今日天气" />
      <view class="weather-header">
        <view class="weather-hader-item">
          <u-icon custom-prefix="custom-icon custom-icon-richu" size="32rpx" color="#fff"></u-icon>
          <view class="value">{{ "05:37" }}</view>
        </view>
        <view class="weather-hader-item">
          <u-icon custom-prefix="custom-icon custom-icon-rila" size="32rpx" color="#fff"></u-icon>
          <view class="value">{{ "18:23" }}</view>
        </view>
        <view class="weather-hader-item">
          <u-icon custom-prefix="custom-icon custom-icon-fengli" size="26rpx" color="#fff"></u-icon>
          <view class="value">{{ "东北风 3级" }}</view>
        </view>
        <view class="weather-hader-item">
          <u-icon custom-prefix="custom-icon custom-icon-kongqishidu" size="28rpx" color="#fff"></u-icon>
          <view class="value">{{ "41%" }}</view>
        </view>
        <view class="weather-hader-item">
          <u-icon name="bell" size="32rpx" color="rgb(235, 37, 37)"></u-icon>
          <view class="value alarm">{{ "高温高湿" }}</view>
        </view>
      </view>
      <view class="weather-body">
        <view class="body-item">
          <view class="item-row">
            <view class="date">今天</view>
            <view class="air">{{ "良" }}</view>
            <view class="temp">{{ "28~14" }}℃</view>
          </view>
          <view class="item-row">
            <view class="status">{{ "多云" }}</view>
            <u--image :showLoading="true" :src="`/static/weather/5@2x.png`" width="14px" height="14px" mode="scaleToFill"></u--image>
          </view>
        </view>
        <view class="body-item">
          <view class="item-row">
            <view class="date">明天</view>
            <view class="air">{{ "良" }}</view>
            <view class="temp">{{ "28~14" }}℃</view>
          </view>
          <view class="item-row">
            <view class="status">{{ "多云" }}</view>
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
      <uni-subTitle customIcon="shengchan" title="生产概况" url="pages/home/production/index" />
      <uni-card margin="0" padding="0" spacing="24rpx">
        <view class="switch-tab">
          <u-subsection :list="list" :current="current" activeColor="#333333" @change="sectionChange"></u-subsection>
        </view>
        <view class="tab-num">
          <view class="num-item" style="color: #81b33b">8千头</view>
          <view class="num-item" style="color: #347caf">60%</view>
          <view class="num-item" style="color: #bd3124">46头</view>
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
            <view class="item-num">+4%</view>
          </view>
          <view class="active-item">
            <view class="item-label">较过去一周：</view>
            <view class="item-num">-14%</view>
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
          <view v-for="(row, index) in heatList" :key="index" class="body-row">
            <view class="row-item">{{ row.field }}</view>
            <view class="row-item bold">{{ row.num1 }}</view>
            <view class="row-item bold">{{ row.num2 }}</view>
            <view class="row-item bold">{{ row.num3 }}</view>
          </view>
        </scroll-view>
      </uni-card>
      <!-- 消警比例 -->
      <uni-subTitle icon="volume-off" title="消警比例" />
      <uni-card margin="0" padding="0" spacing="24rpx">
        <view class="eliminateAlarm">
          <uni-kchart ref="eliminateAlarmChart"></uni-kchart>
        </view>
      </uni-card>
      <!-- 风险提示 -->
      <uni-subTitle icon="warning" title="风险提示" url="pages/home/risk/index" />
      <uni-card margin="0" padding="0" spacing="24rpx">
        <view class="danger-statistic">
          <view class="danger-item">
            <view class="item-chart">
              <uni-progress ref="envProgressChart"></uni-progress>
            </view>
            <view class="item-subTitle">环境风险</view>
            <view class="item-subTitle">较昨日-5%</view>
          </view>
          <view class="danger-item">
            <view class="item-chart">
              <uni-progress ref="assetProgressChart"></uni-progress>
            </view>
            <view class="item-subTitle">资产风险</view>
            <view class="item-subTitle">较昨日-5%</view>
          </view>
          <view class="danger-item">
            <view class="item-chart">
              <uni-progress ref="manProgressChart"></uni-progress>
            </view>
            <view class="item-subTitle">管理风险</view>
            <view class="item-subTitle">较昨日-5%</view>
          </view>
        </view>
      </uni-card>
      <view class="ai-btn">
        <u-button color="#3DAD82" shape="circle" text="小牧AI日报" @click="enterAiReport()"></u-button>
      </view>
    </view>
    <uni-tabbar :tabCurrent="0"></uni-tabbar>
  </view>
</template>

<script>
export default {
  data () {
    return {
      position: "安徽窝阳",
      currentDate: "2024-5-19",
      list: ["动态存栏", "栏位占用", "疑死数量"],
      current: 0,
      heatList: [{ field: "栏位数1", num1: 15, num2: 21, num3: 50 }],
    };
  },
  computed: {
    safetyTop () {
      return uni.getSystemInfoSync().safeAreaInsets.top;
    },
  },
  onReady () {
    uni.hideTabBar();
    this.initData();
    this.sectionChange(0);
  },
  methods: {
    // 生产概况
    sectionChange (index) {
      console.log(index);
      this.current = index;
      let xData1 = ["05-01", "05-02", "05-03", "05-04", "05-05", "05-06", "05-07", "05-08", "05-09", "05-10", "05-11"]
      if (this.current == 0) {
        let series1 = [
          {
            name: "动态存栏",
            data: ["23", "21", "21","14", "25", "26", "27", "21", "21","14","25" ],
            color: "#81B33B",
          },
        ];
        this.$refs.activeChart.initChart(xData1, series1);
      }
      if (this.current == 1) {
        let series1 = [
          {
            name: "栏位占用",
            data: ["23","21","21", "14","25", "26", "27", "21", "21", "14", "25" ],
            color: "#347CAF",
          },
        ];
        this.$refs.activeChart.initChart(xData1, series1);
      }
      if (this.current == 2) {
        let series1 = [
          {
            name: "疑死数量",
            data: ["23", "21", "21", "14", "25", "26", "27", "21", "21", "14", "25" ],
            color: "#BD3124",
          },
        ];
        this.$refs.activeChart.initChart(xData1, series1);
      }
    },
    initData () {
      // 24小时天气
      let xData = ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00"]
      let series = [
        {
          name: "温度",
          data: ["23", "21", "21", "14", "25", "26", "27", "17", "18", "19",],
          color: "#19AECE",
        },
      ];
      this.$refs.weatherChart.initChart(xData, series);

      // 消警比例
      let xData1 = ["5/25", "5/26", "5/27", "5/28", "5/29", "5/30", "5/31", "6/3", "6/4", "6/5"]
      let series1 = [
        [64.54, 59.51, 30.86, 69.65],
        [32.08, 73.4, 59.25, 33.54],
        [74.81, 26.31, 70.1, 28.14],
        [33.61, 47.18, 21.6, 51.44],
        [40.44, 24.29, 34.27, 52.02],
        [26.42, 18.61, 14.59, 33.67],
        [14.68, 10.59, 16.58, 20.96],
        [10.16, 86.6, 64.83, 33.29],
        [82.17, 63.97, 53.25, 86.33],
        [55.77, 70.28, 53.31, 76.22]
      ]
      this.$refs.eliminateAlarmChart.initChart(xData1, series1, "%");

      // 风险提示
      let data1 = [{ data: "1", color: "#CCF738" }];
      let data2 = [{ data: "1", color: "#DE868F" }];
      let data3 = [{ data: "1", color: "#FCCA00" }];
      this.$refs.envProgressChart.initChart(data1, 17);
      this.$refs.assetProgressChart.initChart(data2, 18);
      this.$refs.manProgressChart.initChart(data3, 11);
    },
    enterAiReport () {
      uni.navigateTo({ url: "/pages/home/dailyReport/index" });
    },
  },
};
</script>

<style lang="scss" scoped>
.home-container {
  .content {
    background: linear-gradient(to bottom, #d6e7ff 0%, #ffffff 600rpx);
    padding: 0 24rpx 24rpx;
    .weather-header {
      width: 100%;
      background: linear-gradient(
        90deg,
        rgba(25, 174, 206, 0.9) 0%,
        rgba(25, 174, 206, 0.5) 100%
      );
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
        background: linear-gradient(
          90deg,
          rgba(25, 174, 206, 0.9) 0%,
          rgba(25, 174, 206, 0.5) 100%
        );
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
        color: #0f4239;
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
        color: #0f4239;
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
        color: #0f4239;
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
          color: #0f4239;
        }
      }
    }
    .ai-btn {
      margin: 24rpx 100rpx;
    }
  }
}
</style>
