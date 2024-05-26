<template>
  <view class="production-container">
    <uni-navtopbar title="风险提示" :back="true"></uni-navtopbar>
    <view class="content">
      <view class="header-filter">
        <view class="filter-fileds">
          <uni-pickerselect
            prefixIcon="grid"
            :columns="animalsType"
            @pickerCallback="pickerCallback1"
          />
        </view>
        <view class="filter-date">
          <uni-pickerselect
            :columns="dateType"
            @pickerCallback="pickerCallback2"
          />
        </view>
      </view>
      <uni-subTitle icon="error" title="风险统计" />
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
          <view class="num-item" style="color: #de868f; width: 20%">12次</view>
          <view class="num-item" style="color: #93d2f3; width: 20%">105次</view>
          <view class="num-item" style="color: #fcca00; width: 20%">45次</view>
        </view>
        <view class="active-chart">
          <uni-line ref="activeChart"></uni-line>
        </view>
      </uni-card>
      <uni-subTitle icon="account-fill" title="员工风控" />
      <scroll-view class="table-body" :scroll-y="true">
        <view v-for="(row, index) in heatList" :key="index" class="body-row">
          <view class="row-item">{{ row.name }}</view>
          <view class="row-item bold">{{ row.place }}</view>
          <view class="row-item bold midWidth">{{ row.unHandleRiskNum }}</view>
          <view class="row-item bold midWidth">{{ row.bySelfRiskNum }}</view>
        </view>
      </scroll-view>
      <uni-subTitle icon="pushpin-fill" title="环境风险" />

      <swiper indicator-dots autoplay>
        <swiper-item v-for="(item, index) in listAlarmData" :key="index">
          <uni-card margin="0" padding="0" spacing="24rpx">
            <view class="list-item" @click="enterDetails(item.alarm_id)">
              <u--image
                :showLoading="true"
                :src="item.poster_url"
                width="280rpx"
                height="210rpx"
              ></u--image>
              <view class="item-info">
                <view>
                  <u--text
                    :text="'时间：' + item.alarm_time"
                    size="28rpx"
                    color="#333333"
                  ></u--text>
                </view>
                <view>
                  <u--text
                    :text="'地点：' + item.location"
                    size="28rpx"
                    color="#333333"
                  ></u--text>
                </view>
                <view>
                  <u--text
                    :text="'负责人：' + item.handler_name"
                    size="28rpx"
                    color="#333333"
                  ></u--text>
                </view>
              </view>
            </view>
          </uni-card>
        </swiper-item>
      </swiper>
      <uni-subTitle icon="rmb-circle" title="资产风险" />
      <swiper indicator-dots autoplay>
        <swiper-item v-for="(item, index) in listAlarmData" :key="index">
          <uni-card margin="0" padding="0" spacing="24rpx">
            <view class="list-item" @click="enterDetails(item.alarm_id)">
              <u--image
                :showLoading="true"
                :src="item.poster_url"
                width="280rpx"
                height="210rpx"
              ></u--image>
              <view class="item-info">
                <view>
                  <u--text
                    :text="'时间：' + item.alarm_time"
                    size="28rpx"
                    color="#333333"
                  ></u--text>
                </view>
                <view>
                  <u--text
                    :text="'地点：' + item.location"
                    size="28rpx"
                    color="#333333"
                  ></u--text>
                </view>
                <view>
                  <u--text
                    :text="'负责人：' + item.handler_name"
                    size="28rpx"
                    color="#333333"
                  ></u--text>
                </view>
              </view>
            </view>
          </uni-card>
        </swiper-item>
      </swiper>
      <uni-subTitle icon="file-text-fill" title="管理风险" />
      <swiper indicator-dots autoplay>
        <swiper-item v-for="(item, index) in listAlarmData" :key="index">
          <uni-card margin="0" padding="0" spacing="24rpx">
            <view class="list-item" @click="enterDetails(item.alarm_id)">
              <u--image
                :showLoading="true"
                :src="item.poster_url"
                width="280rpx"
                height="210rpx"
              ></u--image>
              <view class="item-info">
                <view>
                  <u--text
                    :text="'时间：' + item.alarm_time"
                    size="28rpx"
                    color="#333333"
                  ></u--text>
                </view>
                <view>
                  <u--text
                    :text="'地点：' + item.location"
                    size="28rpx"
                    color="#333333"
                  ></u--text>
                </view>
                <view>
                  <u--text
                    :text="'负责人：' + item.handler_name"
                    size="28rpx"
                    color="#333333"
                  ></u--text>
                </view>
              </view>
            </view>
          </uni-card>
        </swiper-item>
      </swiper>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      list: ["环境风险", "资产风险", "管理风险"],
      current: 0,
      heatList: [
        {
          name: "负责人",
          place: "负责畜舍",
          unHandleRiskNum: "未处理风险数",
          bySelfRiskNum: "自主上报风险数"
        },
        {
          name: "李小龙",
          place: "育肥",
          unHandleRiskNum: "123",
          bySelfRiskNum: "123"
        },
        {
          name: "李小龙",
          place: "育肥",
          unHandleRiskNum: "123",
          bySelfRiskNum: "123"
        },
        {
          name: "李小龙",
          place: "育肥",
          unHandleRiskNum: "123",
          bySelfRiskNum: "123"
        }
      ],
      animalsType: [
        [
          { id: 1, name: "育肥" },
          { id: 2, name: "繁育" }
        ]
      ],
      dateType: [
        [
          { id: 1, name: "周" },
          { id: 2, name: "月" },
          { id: 2, name: "年" }
        ]
      ],
      listAlarmData: [
        {
          alarm_id: 1,
          alarm_name: "死亡告警",
          alarm_status: "已处理",
          alarm_time: "2024-05-04 17:55:09",
          handler_name: "雨飞管家",
          location: "1号舍区--栏位01",
          poster_url:
            "https://img2.baidu.com/it/u=421118277,4243220711&fm=253&fmt=auto&app=138&f=PNG?w=460&h=307",
          report_type: 1
        },
        {
          alarm_id: 1,
          alarm_name: "死亡告警2",
          alarm_status: "已处理",
          alarm_time: "2024-05-04 17:55:09",
          handler_name: "雨飞管家",
          location: "1号舍区--栏位01",
          poster_url:
            "https://img2.baidu.com/it/u=421118277,4243220711&fm=253&fmt=auto&app=138&f=PNG?w=460&h=307",
          report_type: 1
        },
        {
          alarm_id: 1,
          alarm_name: "死亡告警3",
          alarm_status: "已处理",
          alarm_time: "2024-05-04 17:55:09",
          handler_name: "雨飞管家",
          location: "1号舍区--栏位01",
          poster_url:
            "https://img2.baidu.com/it/u=421118277,4243220711&fm=253&fmt=auto&app=138&f=PNG?w=460&h=307",
          report_type: 1
        }
      ]
    };
  },
  onReady() {
    this.initData();
    this.sectionChange(0);
  },
  methods: {
    sectionChange(index) {
      console.log(index);
      this.current = index;
      if (this.current == 0) {
        let xData1 = [
          "05-01",
          "05-02",
          "05-03",
          "05-04",
          "05-05",
          "05-06",
          "05-07",
          "05-08",
          "05-09",
          "05-10",
          "05-11"
        ];
        let series1 = [
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
              "21",
              "21",
              "14",
              "25"
            ],
            color: "#DE868F"
          }
        ];
        this.$refs.activeChart.initChart(xData1, series1, "℃");
      }
      if (this.current == 1) {
        let xData1 = [
          "05-01",
          "05-02",
          "05-03",
          "05-04",
          "05-05",
          "05-06",
          "05-07",
          "05-08",
          "05-09",
          "05-10",
          "05-11"
        ];
        let series1 = [
          {
            name: "湿度",
            data: [
              "23",
              "21",
              "21",
              "14",
              "25",
              "26",
              "27",
              "21",
              "21",
              "14",
              "25"
            ],
            color: "#93D2F3"
          }
        ];
        this.$refs.activeChart.initChart(xData1, series1, "%");
      }
      if (this.current == 2) {
        let xData1 = [
          "05-01",
          "05-02",
          "05-03",
          "05-04",
          "05-05",
          "05-06",
          "05-07",
          "05-08",
          "05-09",
          "05-10",
          "05-11"
        ];
        let series1 = [
          {
            name: "光照度",
            data: [
              "23",
              "21",
              "21",
              "14",
              "25",
              "26",
              "27",
              "21",
              "21",
              "14",
              "25"
            ],
            color: "#FCCA00"
          }
        ];
        this.$refs.activeChart.initChart(xData1, series1, "lx");
      }
    },
    pickerCallback1(e) {
      console.log(e);
    },
    pickerCallback2(e) {
      console.log(e);
    },
    initData() {
      let xData1 = [
        "05-01",
        "05-02",
        "05-03",
        "05-04",
        "05-05",
        "05-06",
        "05-07",
        "05-08",
        "05-09",
        "05-10",
        "05-11"
      ];
      let series1 = [
        {
          name: "THI",
          data: [
            "23",
            "21",
            "21",
            "14",
            "25",
            "26",
            "27",
            "21",
            "21",
            "14",
            "25"
          ],
          color: "#81B337"
        }
      ];
      this.$refs.enterChart.initChart(xData1, series1);

      let xData2 = [
        "05-01",
        "05-02",
        "05-03",
        "05-04",
        "05-05",
        "05-06",
        "05-07",
        "05-08",
        "05-09",
        "05-10",
        "05-11"
      ];
      let series2 = [
        {
          name: "THI",
          data: [
            "23",
            "21",
            "21",
            "14",
            "25",
            "26",
            "27",
            "21",
            "21",
            "14",
            "25"
          ],
          color: "#347CAF"
        }
      ];
      this.$refs.occupationChart.initChart(xData2, series2);

      let xData3 = [
        "05-01",
        "05-02",
        "05-03",
        "05-04",
        "05-05",
        "05-06",
        "05-07",
        "05-08",
        "05-09",
        "05-10",
        "05-11",
        "05-12"
      ];
      let series4 = [
        {
          name: "平均",
          type: "line",
          color: "#B886F8",
          data: [12, -14, 10, -17, 9, -16, 12, -14, 10, -17, 9, -16]
        },
        {
          name: "最高",
          type: "point",
          color: "#f04864",
          data: [13, -15, 16, -18, 10, -17, 13, -15, 16, -18, 7, -17]
        },
        {
          name: "最低",
          type: "point",
          color: "#81B337",
          data: [11, -13, 9, -16, 8, -15, 11, -13, 9, -16, 8, -15]
        }
      ];
      this.$refs.activityChart.initChart(xData3, series4);

      let xData = [
        "05-01",
        "05-02",
        "05-03",
        "05-04",
        "05-05",
        "05-06",
        "05-07",
        "05-08",
        "05-09",
        "05-10",
        "05-11"
      ];
      let yData = [
        {
          name: "平均睡眠时长",
          data: [23, 12, 11, 20, 11, 12, 16, 18, 22, 21, 10],
          color: "#B886F8"
        },
        {
          name: "平均饮水时长",
          data: [20, 23, 15, 16, 21, 9, 12, 11, 5, 11, 5],
          color: "#CCF783"
        },
        {
          name: "平均采食时长",
          data: [12, 21, 5, 19, 11, 21, 12, 11, 8, 11, 12],
          color: "#93D2F3"
        }
      ];
      this.$refs.rhythmChart.initChart(xData, yData, "h");

      this.$refs.carChart.initChart();
    }
  }
};
</script>

<style lang="scss" scoped>
.production-container {
  .content {
    background: linear-gradient(to bottom, #d6e7ff 0%, #ffffff 600rpx);
    padding: 0 24rpx 48rpx;
    .header-filter {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .filter-fileds {
        width: 50%;
        margin-right: 20rpx;
      }
      .filter-date {
        width: 50%;
      }
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
    .subtitle {
      padding-left: 6rpx;
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
    .heart-des {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      .heart-row {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin: 24rpx 0 0;
      }
      .dot {
        width: 16rpx;
        height: 16rpx;
        border-radius: 50%;
        background-color: #10cc8f;
        margin: 22rpx 0;
      }
    }
    .car-chart {
      height: 800rpx;
    }
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
    width: 20%;
    text-align: center;
  }

  .midWidth {
    width: 30%;
  }
}

.list-item {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  .item-info {
    height: 210rpx;
    margin-left: 24rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
    position: relative;
  }
}
</style>
