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
            :value="houseTypeId"
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
          <view class="num-item" style="color: #de868f; width: 33%"
            >{{ riskCountData?.env_risk_count }}次</view
          >
          <view class="num-item" style="color: #93d2f3; width: 33%"
            >{{ riskCountData?.animal_risk_count }}次</view
          >
          <view class="num-item" style="color: #fcca00; width: 33%"
            >{{ riskCountData?.production_risk_count }}次</view
          >
        </view>
        <view class="active-chart">
          <uni-line ref="activeChart"></uni-line>
        </view>
      </uni-card>
      <uni-subTitle icon="account-fill" title="员工风控" />
      <scroll-view class="table-body" :scroll-y="true">
        <view v-for="(row, index) in heatList" :key="index" class="body-row">
          <view class="row-item">{{ row.staff_name }}</view>
          <view class="row-item bold">{{ row.house_name }}</view>
          <view class="row-item bold midWidth">{{ row.untreated }}</view>
          <view class="row-item bold midWidth">{{ row.self_report }}</view>
        </view>
      </scroll-view>
      <uni-subTitle icon="pushpin-fill" title="环境风险" />

      <swiper indicator-dots autoplay>
        <swiper-item v-for="(item, index) in envListAlarmData" :key="index">
          <uni-card margin="0" padding="0" spacing="24rpx">
            <view class="list-item" @click="enterDetails(item.alarm_id)">
              <view class="image-wrapper">
                <u--image
                  :showLoading="true"
                  :src="item.poster_url || defaultImg"
                  width="280rpx"
                  height="158rpx"
                ></u--image>
              </view>
              <view class="item-info">
                <view>
                  <u--text
                    :text="'时间：' + item.date"
                    size="28rpx"
                    color="#333333"
                  ></u--text>
                </view>
                <view>
                  <u--text
                    :text="'地点：' + item.address"
                    size="28rpx"
                    color="#333333"
                  ></u--text>
                </view>
                <view>
                  <u--text
                    :text="'负责人：' + item.staff_name"
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
        <swiper-item v-for="(item, index) in animalListAlarmData" :key="index">
          <uni-card margin="0" padding="0" spacing="24rpx">
            <view class="list-item" @click="enterDetails(item.alarm_id)">
              <view class="image-wrapper">
                <u--image
                  :showLoading="true"
                  :src="item.poster_url || defaultImg"
                  width="280rpx"
                  height="158rpx"
                ></u--image>
              </view>
              <view class="item-info">
                <view>
                  <u--text
                    :text="'时间：' + item.date"
                    size="28rpx"
                    color="#333333"
                  ></u--text>
                </view>
                <view>
                  <u--text
                    :text="'地点：' + item.address"
                    size="28rpx"
                    color="#333333"
                  ></u--text>
                </view>
                <view>
                  <u--text
                    :text="'负责人：' + item.staff_name"
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
        <swiper-item
          v-for="(item, index) in productionListAlarmData"
          :key="index"
        >
          <uni-card margin="0" padding="0" spacing="24rpx">
            <view class="list-item" @click="enterDetails(item.alarm_id)">
              <view class="image-wrapper">
                <u--image
                  :showLoading="true"
                  :src="item.poster_url || defaultImg"
                  width="280rpx"
                  height="158rpx"
                ></u--image>
              </view>
              <view class="item-info">
                <view>
                  <u--text
                    :text="'时间：' + item.date"
                    size="28rpx"
                    color="#333333"
                  ></u--text>
                </view>
                <view>
                  <u--text
                    :text="'地点：' + item.address"
                    size="28rpx"
                    color="#333333"
                  ></u--text>
                </view>
                <view>
                  <u--text
                    :text="'负责人：' + item.staff_name"
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
import { getRiskReportApi } from "@/api/view.js";

const initHeatList = [
  {
    staff_name: "负责人",
    house_name: "负责畜舍",
    untreated: "未处理风险数",
    self_report: "自主上报风险数"
  }
];

export default {
  data () {
    return {
      list: ["环境风险", "资产风险", "管理风险"],
      current: 0,
      heatList: [],
      riskCountData: {},
      defaultImg:
        "https://img1.baidu.com/it/u=885718125,3029806073&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500",
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
      envListAlarmData: [], //环境风险告警
      animalListAlarmData: [], //动物资产告警
      productionListAlarmData: [], //管理风险告警
      houseTypeId: null,
      dateTypeId: null
    };
  },

  async mounted () {
    const res = await this.getRiskReportData();
    if (res === true) {
      this.sectionChange(0);
    }
  },
  methods: {
    async getRiskReportData () {
      const params = {};
      if (this.dateTypeId)
        Object.assign(params, { date_type: this.dateTypeId });
      if (this.houseTypeId)
        Object.assign(params, { house_type_id: this.houseTypeId });
      const res = await getRiskReportApi(params);
      const {
        staff_risk_rank = [],
        env_risk_rank = [],
        animal_risk_rank = [],
        production_risk_rank = [],
        risk_count = []
      } = res?.data || {};
      this.heatList = [...initHeatList, ...staff_risk_rank];
      this.envListAlarmData = env_risk_rank || [];
      this.animalListAlarmData = animal_risk_rank || [];
      this.productionListAlarmData = production_risk_rank || [];
      this.riskCountData = risk_count || [];
      return true;
    },
    renderCharts (dataSource, name, unit, color) {
      let xData = [];
      let yData = { name: name, data: [], color: color };
      dataSource.map(item => {
        xData.push(item.date.slice(5));
        yData.data.push(item.score);
      });
      this.$refs.activeChart.initChart(xData, [yData], unit, color);
    },
    sectionChange (index) {
      this.current = index;
      if (this.current === 0) {
        this.renderCharts(
          this.riskCountData?.env_risk_data,
          "环境风险",
          "",
          "#de868f"
        );
      } else if (this.current === 1) {
        this.renderCharts(
          this.riskCountData?.animal_risk_data,
          "资产风险",
          "",
          "#93d2f3"
        );
      } else if (this.current === 2) {
        this.renderCharts(
          this.riskCountData?.production_risk_data,
          "管理风险",
          "",
          "#fcca00"
        );
      }
    },
    enterDetails (id) {
      uni.navigateTo({ url: "/pages/view/components/details/index?id=" + id });
    },

    pickerCallback1 (e) {
      this.houseTypeId = e.id;
      this.getRiskReportData();
    },
    pickerCallback2 (e) {
      this.dateTypeId = e.id;
      this.getRiskReportData();
    }
  }
};
</script>

<style lang="scss" scoped>
.production-container {
  .content {
    // background: linear-gradient(to bottom, #d6e7ff 0%, #ffffff 600rpx);
    background: #f4f4f4;
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
    height: 160rpx;
    margin-left: 24rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
    position: relative;
  }
}
</style>
