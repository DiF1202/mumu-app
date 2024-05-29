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
          <view class="num-item" style="color:#DE868F;width: 20%;">{{housing_environment?.temperature}}℃</view>
          <view class="num-item" style="color:#93D2F3;width: 20%;">{{housing_environment?.humidity}}%</view>
          <view class="num-item" style="color:#FCCA00;width: 20%;">{{housing_environment?.illuminance}}lx</view>
          <view class="num-item" style="color:#7F83F7;width: 20%;">{{housing_environment?.HI}}℃</view>
          <view class="num-item" style="color:#B886F8;width: 20%;">{{housing_environment?.THI}}</view>
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
          <uni-tarea ref="animalCount" :max="30"></uni-tarea>
        </view>
      </uni-card>
      <u-gap height="12rpx"></u-gap>
      <uni-card margin="0" padding="0" spacing="24rpx">
        <view class="subtitle">
          <u-icon name="list" size="38rpx" color="#10cc8f" labelPos="right" label="栏位占用" labelColor="#333333" labelSize="24rpx"></u-icon>
        </view>
        <view class="active-chart">
          <uni-tarea ref="penOccupancy" :max="30"></uni-tarea>
        </view>
        <view class="active-statistic" style="margin-top: 24rpx">
          <view class="active-item">
            <view class="item-label">栏位占用：</view>
            <view class="item-num">{{pen_occupancy_rate?.pen_occupancy_rate}}</view>
          </view>
          <view class="active-item">
            <view class="item-label">动态活动范围：</view>
            <view class="item-num">{{pen_occupancy_rate?.dynamic_area}}</view>
          </view>
        </view>
        <view class="active-statistic">
          <view class="active-item">
            <view class="item-label">单位面积/动物：</view>
            <view class="item-num">{{pen_occupancy_rate?.animal_per_area}}</view>
          </view>
          <view class="active-item">
            <view class="item-label">昨日转群次数：</view>
            <view class="item-num">{{pen_occupancy_rate?.transfer_count}}</view>
          </view>
        </view>
      </uni-card>
      <uni-card margin="0" padding="0" spacing="24rpx">
        <view class="subtitle">
          <u-icon name="warning" size="38rpx" color="#10cc8f" labelPos="right" label="异常动物数量" labelColor="#333333" labelSize="24rpx"></u-icon>
        </view>
        <u-gap height="12rpx"></u-gap>
        <view class="switch-tab">
          <u-subsection :list="list1" :current="current1" activeColor="#333333" @change="sectionChange1"></u-subsection>
        </view>
        <view class="tab-num">
          <view class="num-item" style="color:#DE868F;width: 50%;">{{animal_risk_count?.death}}头</view>
          <view class="num-item" style="color:#93D2F3;width: 50%;">{{animal_risk_count?.moribund}}头</view>
        </view>
        <view class="active-chart">
          <uni-line ref="animalRisk"></uni-line>
        </view>
      </uni-card>
      <uni-card margin="0" padding="0" spacing="24rpx">
        <view class="subtitle">
          <u-icon custom-prefix="custom-icon custom-icon-heart" size="38rpx" color="#10cc8f" labelPos="right" label="畜群活跃度统计" labelColor="#333333" labelSize="24rpx"></u-icon>
        </view>
        <view class="active-chart">
          <uni-kchart ref="animalActivity"></uni-kchart>
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
      <uni-card margin="0" padding="0" spacing="24rpx">
        <view class="subtitle">
          <u-icon custom-prefix="custom-icon custom-icon-shuimian" size="38rpx" color="#10cc8f" labelPos="right" label="畜群节律统计" labelColor="#333333" labelSize="24rpx"></u-icon>
        </view>
        <view class="active-chart">
          <uni-bar ref="alarmHandle"></uni-bar>
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
import { houseType } from '@/api/utils.js'
import { productionApi } from '@/api/home.js'
import { transformData } from '@/utils/common.js'
export default {
  data () {
    return {
      list: ['温度', '湿度', '光照', 'HI', 'THI'],
      current: 0,
      list1: ['疑死数量', '体弱数量'],
      current1: 0,
      list2: ['消警比例', '寻舍时长', '远程时长'],
      current2: 0,
      housing_environment: {}, // 舍内环境
      animal_count_data: {}, // 动态存栏
      pen_occupancy_rate: {}, // 栏位占用
      animal_risk_count: {}, // 异常动物数量
      animal_activity: {}, // 畜群活跃度统计
      alarm_handle_rate: {}, // 畜群节律
      attendance: {}, // 饲养员考勤
      vehicle_activity: {}, // 车辆出入
      columns1: [],
      columns2: [],
      house_type_id: '1',
      date_type: 'week'
    }
  },
  onReady () {
    this.getHouseType()
  },
  methods: {
    // 舍内环境
    sectionChange (index) {
      this.current = index
      switch (index) {
        case 0:
          this.initHouseEnv(this.housing_environment.temperature_data, "温度", '℃', '#DE868F')
          break
        case 1:
          this.initHouseEnv(this.housing_environment.humidity_data, "湿度", '%', '#93D2F3')
          break
        case 2:
          this.initHouseEnv(this.housing_environment.illuminance_data, "光照", 'lx', '#FCCA00')
          break
        case 3:
          this.initHouseEnv(this.housing_environment.HI_data, "HI", '℃', '#7F83F7')
          break
        case 4:
          this.initHouseEnv(this.housing_environment.THI_data, "THI", '', '#B886F8')
          break
      }
    },
    initHouseEnv (arr, name, unit, color) {
      let xData = []
      let yData = { name: name, data: [] }
      arr.map(item => {
        xData.push(item.date.slice(5))
        yData.data.push([item.score[1], item.score[3], item.score[0], item.score[4]])
      })
      this.$refs.activeChart.initChart(xData, [yData], unit, color)
    },
    // 动态存栏
    animalCount () {
      let xData = []
      let yData = { name: '动态存栏', data: [], color: '#81B337' }
      this.animal_count_data.map(item => {
        xData.push(item.date.slice(5))
        yData.data.push(item.score)
      })
      let max = Math.max(...yData.data)
      this.$refs.animalCount.initChart(xData, [yData], max, '头')
    },
    // 栏位占用
    penOccupancy () {
      let xData = []
      let yData = { name: '动态存栏', data: [], color: '#81B337' }
      this.pen_occupancy_rate.pen_occupancy_rate_data.map(item => {
        xData.push(item.date.slice(5))
        yData.data.push(item.score)
      })
      let max = Math.max(...yData.data)
      this.$refs.penOccupancy.initChart(xData, [yData], max, '头')
    },
    // 异常动物数量
    sectionChange1 (index) {
      this.current1 = index
      switch (index) {
        case 0:
          this.animalRisk(this.animal_risk_count.death_data, "疑死数量", '头', '#BD3124')
          break
        case 1:
          this.animalRisk(this.animal_risk_count.moribund_data, "体弱数量", '头', '#347CAF')
          break
      }
    },
    animalRisk (arr, name, unit, color) {
      let xData = []
      let yData = { name: name, data: [], color: color }
      arr.map(item => {
        xData.push(item.date.slice(5))
        yData.data.push(item.score)
      })
      this.$refs.animalRisk.initChart(xData, [yData], unit)
    },
    // 畜群活跃度统计
    animalActivity () {
      let xData = []
      let yData = { name: "畜群活跃度", data: [] }
      this.animal_activity.animal_activity_fluctuation.map(item => {
        xData.push(item.date.slice(5))
        yData.data.push([item.score[1], item.score[3], item.score[0], item.score[4]])
      })
      this.$refs.animalActivity.initChart(xData, [yData], "%")
    },
    // 畜群节律
    alarmHandle () {
      // 畜群节律统计
      let xData = []
      let yData = [
        { name: "平均睡眠时长", data: [], color: '#B886F8' },
        { name: "平均饮水时长", data: [], color: '#CCF783' },
        { name: "平均采食时长", data: [], color: '#93D2F3' }
      ]
      this.alarm_handle_rate.map(item => {
        xData.push(item.date.slice(5))
        yData[0].data.push(item.sleep)
        yData[1].data.push(item.drink)
        yData[2].data.push(item.feed)
      })
      this.$refs.alarmHandle.initChart(xData, yData, 'h')
    },
    // 请求pick数据
    async getHouseType () {
      await houseType().then(res => {
        this.columns1 = [res.data]
        this.columns2 = [
          [
            { id: 'week', name: '周' },
            { id: 'month', name: '月' },
            { id: 'season', name: '季' },
            { id: 'year', name: '年' },
          ]
        ]
      })
      this.initData()
    },
    // 栋舍类型选择
    pickerCallback1 (e) {
      this.house_type_id = e.id
      this.initData()
    },
    // 时间范围选择
    pickerCallback2 (e) {
      this.date_type = e.id
      this.initData()
    },
    // 初始化数据
    initData () {
      productionApi({ house_type_id: this.house_type_id, date_type: this.date_type }).then(res => {
        console.log(res)
        this.housing_environment = res.data.housing_environment
        this.animal_count_data = res.data.animal_assets.animal_count_data
        this.pen_occupancy_rate = res.data.animal_assets.pen_occupancy_rate
        this.animal_risk_count = res.data.animal_assets.animal_risk_count
        this.animal_activity = res.data.animal_assets.animal_activity
        this.alarm_handle_rate = res.data.animal_assets.alarm_handle_rate
        this.attendance = res.data.manage.attendance
        this.vehicle_activity = res.data.manage.vehicle_activity
        this.sectionChange(0) // 舍内环境
        this.animalCount() // 动态存栏
        this.penOccupancy() // 栏位占用
        this.sectionChange1(0) // 异常动物数量
        this.animalActivity() // 畜群活跃度统计
        this.alarmHandle() // 畜群节律
        this.sectionChange2(0)
        this.vehicleActivity() // 车辆出入
      })
    },
    vehicleActivity () {
      let xData = []
      this.vehicle_activity.map(item => {
        xData.push(item.date.slice(5))
      })
      let yData = transformData(this.vehicle_activity)
      console.log(xData, yData)
      this.$refs.carChart.initChart(xData, yData)
    },
    attendanceHandler (arr, name, unit, color) {
      let xData = []
      let yData = { name: name, data: [] }
      arr.map(item => {
        xData.push(item.date.slice(5))
        yData.data.push([item.score[1], item.score[3], item.score[0], item.score[4]])
      })
      this.$refs.attendanceChart.initChart(xData, [yData], unit, color)
    },
    // 饲养员考勤
    sectionChange2 (index) {
      this.current2 = index
      switch (index) {
        case 0:
          this.attendanceHandler(this.attendance.alarm_handle_rate_data, '消警比例', '%', '#81B337')
          break
        case 1:
          this.attendanceHandler(this.attendance.patrol_time_data, '寻舍时长', 'h', '#CBA43F')
          break
        case 2:
          this.attendanceHandler(this.attendance.remote_time_data, '远程时长', 'h', '#347CAF')
          break
      }
    }
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