<template>
	<view class="production-container">
    <uni-navtopbar title="生产详情" :back="true"></uni-navtopbar>
    <view class="content">
      <view class="header-filter">
        <view class="filter-fileds">
          <uni-pickerselect prefixIcon="grid" :columns="columns1" @pickerCallback="pickerCallback1" />
        </view>
        <view class="filter-date">
          <uni-pickerselect :columns="columns2" @pickerCallback="pickerCallback2"/>
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
          <uni-line ref="activeChart"></uni-line>
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
          <uni-mixchart ref="activityChart"></uni-mixchart>
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
          <uni-mixchart ref="attendanceChart"></uni-mixchart>
        </view>
      </uni-card>
      <u-gap height="12rpx"></u-gap>
      <uni-card margin="0" padding="0" spacing="24rpx">
        <view class="subtitle">
          <u-icon name="car" size="38rpx" color="#10cc8f" labelPos="right" label="饲养员考勤" labelColor="#333333" labelSize="24rpx"></u-icon>
        </view>
        <view class="car-chart">
          <uni-scatter ref="carChart"></uni-scatter>
        </view>
      </uni-card>
    </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
        list: ['温度', '湿度', '光照', 'HI', 'THI'],
        current: 0,
        list1: ['疑死数量', '体弱数量'],
        current1: 0,
        list2: ['消警比例', '寻舍时长', '远程时长'],
        current2: 0,
        columns1: [[
          {id: 1, name: '育肥'},
          {id: 2, name: '繁育'}
        ]],
        columns2: [[
          {id: 1, name: '周'},
          {id: 2, name: '月'},
          {id: 2, name: '年'},
        ]],
      }
		},
    onReady() {
      this.initData()
      this.sectionChange(0)
      this.sectionChange1(0)
      this.sectionChange2(0)
    },
    methods: {
      sectionChange2(index) {
        this.current1 = index
        if (this.current1 == 0) {
          let xData1 = ['05-01','05-02','05-03','05-04','05-05','05-06','05-07','05-08','05-09','05-10','05-11']
          let series1 =  [
            {
              name: "当天",
              type: "line",
              color: "#81B337",
              data: [120, 140, 105, 170, 95, 160, 120, 140, 105, 170, 95, 160]
            },
            {
              name: "最高",
              type: "point",
              color: "#f04864",
              data: [131, 151, 165, 180, 105, 170, 131, 151, 165, 180, 105, 170]
            },
            {
              name: "最低",
              type: "point",
              color: "#81B337",
              data: [111, 131, 95, 160, 85, 150, 111, 131, 95, 160, 85, 150]
            },
          ]
          this.$refs.attendanceChart.initChart(xData1, series1, 'h')
        }
        if (this.current1 == 1) {
          let xData1 = ['05-01','05-02','05-03','05-04','05-05','05-06','05-07','05-08','05-09','05-10','05-11']
          let series1 =  [
            {
              name: "当天",
              type: "line",
              color: "#CBA43F",
              data: [120, 140, 105, 170, 95, 160, 120, 140, 105, 170, 95, 160]
            },
            {
              name: "最高",
              type: "point",
              color: "#f04864",
              data: [131, 151, 165, 180, 105, 170, 131, 151, 165, 180, 105, 170]
            },
            {
              name: "最低",
              type: "point",
              color: "#81B337",
              data: [111, 131, 95, 160, 85, 150, 111, 131, 95, 160, 85, 150]
            },
          ]
          this.$refs.attendanceChart.initChart(xData1, series1, 'h')
        }
        if (this.current1 == 2) {
          let xData1 = ['05-01','05-02','05-03','05-04','05-05','05-06','05-07','05-08','05-09','05-10','05-11']
          let series1 =  [
            {
              name: "当天",
              type: "line",
              color: "#347CAF",
              data: [120, 140, 105, 170, 95, 160, 120, 140, 105, 170, 95, 160]
            },
            {
              name: "最高",
              type: "point",
              color: "#f04864",
              data: [131, 151, 165, 180, 105, 170, 131, 151, 165, 180, 105, 170]
            },
            {
              name: "最低",
              type: "point",
              color: "#81B337",
              data: [111, 131, 95, 160, 85, 150, 111, 131, 95, 160, 85, 150]
            },
          ]
          this.$refs.attendanceChart.initChart(xData1, series1, 'h')
        }
      },
      sectionChange1(index) {
        this.current1 = index
        if (this.current1 == 0) {
          let xData1 = ['05-01','05-02','05-03','05-04','05-05','05-06','05-07','05-08','05-09','05-10','05-11']
          let series1 =  [{
            name: "疑死数量",
            data: ['23', '21', '21', '14', '25', '26', '27','21', '21', '14', '25',],
            color: '#BD3124'
          }]
          this.$refs.warningChart.initChart(xData1, series1, '头')
        }
        if (this.current1 == 1) {
          let xData1 = ['05-01','05-02','05-03','05-04','05-05','05-06','05-07','05-08','05-09','05-10','05-11']
          let series1 =  [{
            name: "体弱数量",
            data: ['23', '21', '21', '14', '25', '26', '27','21', '21', '14', '25',],
            color: '#347CAF'
          }]
          this.$refs.warningChart.initChart(xData1, series1, '头')
        }
      },
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
      pickerCallback1(e) {
        console.log(e)
      },
      pickerCallback2(e) {
        console.log(e)
      },
      initData() {
        let xData1 = ['05-01','05-02','05-03','05-04','05-05','05-06','05-07','05-08','05-09','05-10','05-11']
        let series1 =  [{
          name: "THI",
          data: ['23', '21', '21', '14', '25', '26', '27','21', '21', '14', '25',],
          color: '#81B337'
        }]
        this.$refs.enterChart.initChart(xData1, series1)

        let xData2 = ['05-01','05-02','05-03','05-04','05-05','05-06','05-07','05-08','05-09','05-10','05-11']
        let series2 =  [{
          name: "THI",
          data: ['23', '21', '21', '14', '25', '26', '27','21', '21', '14', '25',],
          color: '#347CAF'
        }]
        this.$refs.occupationChart.initChart(xData2, series2)


        let xData3 = ['05-01','05-02','05-03','05-04','05-05','05-06', '05-07','05-08','05-09','05-10','05-11','05-12']
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
          },
        ]
        this.$refs.activityChart.initChart(xData3, series4)
        

        let xData = ['05-01','05-02','05-03','05-04','05-05','05-06','05-07','05-08','05-09','05-10','05-11']
        let yData = [
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
        this.$refs.rhythmChart.initChart(xData, yData, 'h')


        this.$refs.carChart.initChart()
      },
    }
	}
</script>

<style lang="scss" scoped>
	.production-container {
    .content {
      background: linear-gradient(to bottom, #D6E7FF 0%, #FFFFFF 600rpx);
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
          color: #0F4239;
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