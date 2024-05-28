<template>
  <view class="production-container">
    <uni-navtopbar title="生产详情" :back="true"></uni-navtopbar>
    <view class="content">
      <view class="header-filter">
        <view class="filter-fileds">
          <uni-pickerselect prefixIcon="grid" :columns="columns1" @pickerCallback="pickerCallback1" />
        </view>
        <view class="filter-date">
          <uni-pickerselect :columns="columns2" @pickerCallback="pickerCallback2" />
        </view>
      </view>
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
          <uni-kchart ref="activeChart"></uni-kchart>
        </view>
      </uni-card>
      <uni-subTitle icon="rmb-circle" title="生物资产" />
      <uni-card margin="0" padding="0" spacing="24rpx">
        <view class="subtitle">
          <u-icon custom-prefix="custom-icon custom-icon-xinxi" size="38rpx" color="#10cc8f" labelPos="right" label="动态存栏" labelColor="#333333" labelSize="24rpx"></u-icon>
        </view>
        <view class="active-chart">
          <uni-tarea ref="enterChart" :max="30"></uni-tarea>
        </view>
      </uni-card>
      <u-gap height="12rpx"></u-gap>
      <uni-card margin="0" padding="0" spacing="24rpx">
        <view class="subtitle">
          <u-icon name="list" size="38rpx" color="#10cc8f" labelPos="right" label="栏位占用" labelColor="#333333" labelSize="24rpx"></u-icon>
        </view>
        <view class="active-chart">
          <uni-tarea ref="occupationChart" :max="30"></uni-tarea>
        </view>
        <view class="active-statistic" style="margin-top: 24rpx">
          <view class="active-item">
            <view class="item-label">栏位占用：</view>
            <view class="item-num">+4%</view>
          </view>
          <view class="active-item">
            <view class="item-label">动态活动范围：</view>
            <view class="item-num">-14%</view>
          </view>
        </view>
        <view class="active-statistic">
          <view class="active-item">
            <view class="item-label">单位面积/动物：</view>
            <view class="item-num">+4%</view>
          </view>
          <view class="active-item">
            <view class="item-label">昨日转群次数：</view>
            <view class="item-num">-14%</view>
          </view>
        </view>
      </uni-card>
      <uni-subTitle icon="warning" title="异常动物数量" />
      <uni-card margin="0" padding="0" spacing="24rpx">
        <view class="switch-tab">
          <u-subsection :list="list1" :current="current1" activeColor="#333333" @change="sectionChange1"></u-subsection>
        </view>
        <view class="tab-num">
          <view class="num-item" style="color:#DE868F;width: 50%;">20头</view>
          <view class="num-item" style="color:#93D2F3;width: 50%;">30头</view>
        </view>
        <view class="active-chart">
          <uni-line ref="warningChart"></uni-line>
        </view>
      </uni-card>
      <uni-subTitle customIcon="heart" title="畜群活跃度统计" />
      <uni-card margin="0" padding="0" spacing="24rpx">
        <view class="active-chart">
          <uni-kchart ref="activityChart"></uni-kchart>
        </view>
        <view class="active-statistic" style="margin-top: 24rpx">
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
      <uni-subTitle customIcon="shuimian" title="畜群节律统计" />
      <uni-card margin="0" padding="0" spacing="24rpx">
        <view class="active-chart">
          <uni-bar ref="rhythmChart"></uni-bar>
        </view>
      </uni-card>
      <uni-subTitle customIcon="jixiaoguanli" title="管理详情" />
      <uni-card margin="0" padding="0" spacing="24rpx">
        <view class="subtitle">
          <u-icon custom-prefix="custom-icon custom-icon-user1" size="38rpx" color="#10cc8f" labelPos="right" label="饲养员考勤" labelColor="#333333" labelSize="24rpx"></u-icon>
        </view>
        <u-gap height="12rpx"></u-gap>
        <view class="switch-tab">
          <u-subsection :list="list2" :current="current2" activeColor="#333333" @change="sectionChange2"></u-subsection>
        </view>
        <view class="tab-num">
          <view class="num-item" style="color:#81B337;width: 33%;">50%</view>
          <view class="num-item" style="color:#CBA43F;width: 33%;">40分</view>
          <view class="num-item" style="color:#347CAF;width: 33%;">35分</view>
        </view>
        <view class="active-chart">
          <uni-kchart ref="attendanceChart"></uni-kchart>
        </view>
      </uni-card>
      <u-gap height="12rpx"></u-gap>
      <uni-card margin="0" padding="0" spacing="24rpx">
        <view class="subtitle">
          <u-icon name="car" size="42rpx" color="#10cc8f" labelPos="right" label="车辆出入" labelColor="#333333" labelSize="24rpx"></u-icon>
        </view>
        <view class="car-chart">
          <uni-carchart ref="carChart"></uni-carchart>
        </view>
      </uni-card>
    </view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      list: ['温度', '湿度', '光照', 'HI', 'THI'],
      current: 0,
      list1: ['疑死数量', '体弱数量'],
      current1: 0,
      list2: ['消警比例', '寻舍时长', '远程时长'],
      current2: 0,
      columns1: [[
        { id: 1, name: '育肥' },
        { id: 2, name: '繁育' }
      ]],
      columns2: [[
        { id: 1, name: '周' },
        { id: 2, name: '月' },
        { id: 2, name: '年' },
      ]],
    }
  },
  onReady () {
    this.initData()
    this.sectionChange(0)
    this.sectionChange1(0)
    this.sectionChange2(0)
  },
  methods: {
    // 饲养员考勤
    sectionChange2 (index) {
      this.current1 = index
      let xData = ["5/25", "5/26", "5/27", "5/28", "5/29", "5/30", "5/31", "6/3", "6/4", "6/5"]
      let yData = {
        name: "消警比例", data: [
          [36.54, 36.51, 36.86, 36.65],
          [36.08, 36.4, 36.25, 36.54],
          [36.81, 36.31, 36.1, 36.14],
          [36.61, 36.18, 36.6, 36.44],
          [36.44, 36.29, 36.27, 36.02],
          [36.42, 36.61, 36.59, 36.67],
          [36.68, 36.59, 36.58, 36.96],
          [36.16, 36.6, 36.83, 36.29],
          [36.17, 36.97, 36.25, 36.33],
          [36.77, 36.28, 36.31, 36.22]
        ]
      }
      if (this.current1 == 0) {
        this.$refs.attendanceChart.initChart(xData, [yData], '%', '#81B337')
      }
      if (this.current1 == 1) {
        this.$refs.attendanceChart.initChart(xData, [yData], 'min', "#CBA43F")
      }
      if (this.current1 == 2) {
        this.$refs.attendanceChart.initChart(xData, [yData], 'min', "#347CAF")
      }
    },
    sectionChange1 (index) {
      this.current1 = index
      if (this.current1 == 0) {
        let xData1 = ['05-01', '05-02', '05-03', '05-04', '05-05', '05-06', '05-07', '05-08', '05-09', '05-10', '05-11']
        let series1 = [{
          name: "疑死数量",
          data: ['23', '21', '21', '14', '25', '26', '27', '21', '21', '14', '25',],
          color: '#BD3124'
        }]
        this.$refs.warningChart.initChart(xData1, series1, '头')
      }
      if (this.current1 == 1) {
        let xData1 = ['05-01', '05-02', '05-03', '05-04', '05-05', '05-06', '05-07', '05-08', '05-09', '05-10', '05-11']
        let series1 = [{
          name: "体弱数量",
          data: ['23', '21', '21', '14', '25', '26', '27', '21', '21', '14', '25',],
          color: '#347CAF'
        }]
        this.$refs.warningChart.initChart(xData1, series1, '头')
      }
    },
    // 舍内环境
    sectionChange (index) {
      this.current = index
      let xData = ["5/25", "5/26", "5/27", "5/28", "5/29", "5/30", "5/31", "6/3", "6/4", "6/5"]
      let yData = {
        name: "消警比例", data: [
          [36.54, 36.51, 36.86, 36.65],
          [36.08, 36.4, 36.25, 36.54],
          [36.81, 36.31, 36.1, 36.14],
          [36.61, 36.18, 36.6, 36.44],
          [36.44, 36.29, 36.27, 36.02],
          [36.42, 36.61, 36.59, 36.67],
          [36.68, 36.59, 36.58, 36.96],
          [36.16, 36.6, 36.83, 36.29],
          [36.17, 36.97, 36.25, 36.33],
          [36.77, 36.28, 36.31, 36.22]
        ]
      }
      if (this.current == 0) {
        this.$refs.activeChart.initChart(xData, [yData], '℃', '#DE868F')
      }
      if (this.current == 1) {
        this.$refs.activeChart.initChart(xData, [yData], '%', '#93D2F3')
      }
      if (this.current == 2) {
        this.$refs.activeChart.initChart(xData, [yData], 'lx', '#FCCA00')
      }
      if (this.current == 3) {
        this.$refs.activeChart.initChart(xData, [yData], '℃', '#7F83F7')
      }
      if (this.current == 4) {
        this.$refs.activeChart.initChart(xData, [yData], '', '#B886F8')
      }
    },
    pickerCallback1 (e) {
      console.log(e)
    },
    pickerCallback2 (e) {
      console.log(e)
    },
    initData () {
      let xData1 = ['05-01', '05-02', '05-03', '05-04', '05-05', '05-06', '05-07', '05-08', '05-09', '05-10', '05-11']
      let series1 = [{
        name: "THI",
        data: ['23', '21', '21', '14', '25', '26', '27', '21', '21', '14', '25',],
        color: '#81B337'
      }]
      this.$refs.enterChart.initChart(xData1, series1)

      let xData2 = ['05-01', '05-02', '05-03', '05-04', '05-05', '05-06', '05-07', '05-08', '05-09', '05-10', '05-11']
      let series2 = [{
        name: "THI",
        data: ['23', '21', '21', '14', '25', '26', '27', '21', '21', '14', '25',],
        color: '#347CAF'
      }]
      this.$refs.occupationChart.initChart(xData2, series2)

      // 畜群活跃度
      let xData3 = ["5/25", "5/26", "5/27", "5/28", "5/29", "5/30", "5/31", "6/3", "6/4", "6/5"]
      let yData = {
        name: "消警比例", data: [
          [36.54, 36.51, 36.86, 36.65],
          [36.08, 36.4, 36.25, 36.54],
          [36.81, 36.31, 36.1, 36.14],
          [36.61, 36.18, 36.6, 36.44],
          [36.44, 36.29, 36.27, 36.02],
          [36.42, 36.61, 36.59, 36.67],
          [36.68, 36.59, 36.58, 36.96],
          [36.16, 36.6, 36.83, 36.29],
          [36.17, 36.97, 36.25, 36.33],
          [36.77, 36.28, 36.31, 36.22]
        ]
      }
      this.$refs.activityChart.initChart(xData3, [yData], '%')

      // 畜群节律统计
      let xData = ['05-01', '05-02', '05-03', '05-04', '05-05', '05-06', '05-07', '05-08', '05-09', '05-10', '05-11']
      let yData1 = [
        {
          name: "平均睡眠时长",
          data: [23, 12, 11, 20, 11, 12, 16, 18, 22, 21, 10],
          color: '#B886F8'
        },
        {
          name: "平均饮水时长",
          data: [20, 23, 15, 16, 21, 9, 12, 11, 5, 11, 5],
          color: '#CCF783'
        },
        {
          name: "平均采食时长",
          data: [12, 21, 5, 19, 11, 21, 12, 11, 8, 11, 12],
          color: '#93D2F3'
        }
      ]
      this.$refs.rhythmChart.initChart(xData, yData1, 'h')

      // 车辆出入
      this.$refs.carChart.initChart()
    },
  }
}
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
</style>