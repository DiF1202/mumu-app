<template>
  <view class="view-container">
    <uni-navtopbar title="远程查看"></uni-navtopbar>
    <view class="content">
      <!-- 栏位选择 -->
      <uni-treeSelect :columns="columns" @treeCallback="treeCallback" />
      <!-- 栏位信息 -->
      <uni-subTitle
        customIcon="camera"
        :title="fieldName"
        value="实况视频"
        :url="`pages/view/components/list/index?fieldId=${fieldId}`"
      />
      <view class="fields-view">
        <view class="fields-chart">
          <uni-progress ref="progressChart"></uni-progress>
        </view>
        <view class="fields-info">
          <view class="info-item">
            <u-icon
              custom-prefix="custom-icon custom-icon-Pasturage"
              size="38rpx"
              color="#1890FF"
            ></u-icon>
            <u--text
              :text="'动物总数：' + houseAnimal.animal_score"
              color="#0F4239"
              size="28rpx"
              margin="12rpx"
            ></u--text>
          </view>
          <view class="info-item">
            <u-icon
              custom-prefix="custom-icon custom-icon-midu"
              size="38rpx"
              color="#91CB74"
            ></u-icon>
            <u--text
              :text="'畜群平均密度：' + houseAnimal.animal_avg_density"
              color="#0F4239"
              size="28rpx"
              margin="12rpx"
            ></u--text>
          </view>
          <view class="info-item">
            <u-icon
              custom-prefix="custom-icon custom-icon-mianji"
              size="38rpx"
              color="#FAC858"
            ></u-icon>
            <u--text
              :text="'单位面积/动物：' + houseAnimal.animal_unit_area"
              color="#0F4239"
              size="28rpx"
              margin="12rpx"
            ></u--text>
          </view>
        </view>
      </view>
      <!-- 资产评分 -->
      <uni-subTitle customIcon="jixiaoguanli" title="资产管理评分" />
      <!-- <view style="height:500rpx">
        <uni-line ref="lineChart1"></uni-line>
      </view> -->
      <view class="assets-item">
        <view class="chart-left">
          <uni-progress ref="progressChart1"></uni-progress>
        </view>
        <view class="chart-right">
          <uni-line ref="lineChart1"></uni-line>
        </view>
      </view>
      <view class="assets-item">
        <view class="chart-left">
          <uni-progress ref="progressChart2"></uni-progress>
        </view>
        <view class="chart-right">
          <uni-line ref="lineChart2"></uni-line>
        </view>
      </view>
      <view class="assets-item">
        <view class="chart-left">
          <uni-progress ref="progressChart3"></uni-progress>
        </view>
        <view class="chart-right">
          <uni-line ref="lineChart3"></uni-line>
        </view>
      </view>
      <!-- 负责人 -->
      <uni-subTitle icon="account" title="负责人" />
      <view class="manager-view">
        <!-- 负责人信息 -->
        <u--image
          :showLoading="true"
          :src="houseStaff.avatar"
          width="250rpx"
          height="250rpx"
          shape="circle"
        ></u--image>
        <view class="manager-info">
          <view class="info-item">
            <view class="dot"></view>
            <u--text
              :text="'姓名：' + houseStaff.name"
              color="#0F4239"
              size="28rpx"
              margin="12rpx"
            ></u--text>
          </view>
          <view class="info-item">
            <view class="dot"></view>
            <u--text
              :text="'平均响应时间：' + houseStaff.avg_response_time"
              color="#0F4239"
              size="28rpx"
              margin="12rpx"
            ></u--text>
          </view>
          <view class="info-item">
            <view class="dot"></view>
            <u--text
              :text="'事件处理：' + houseStaff.schedule"
              color="#0F4239"
              size="28rpx"
              margin="12rpx"
            ></u--text>
          </view>
          <view class="info-item">
            <view class="dot"></view>
            <u--text
              :text="'投喂时间：' + houseStaff.feeding_time"
              color="#0F4239"
              size="28rpx"
              margin="12rpx"
            ></u--text>
          </view>
        </view>
      </view>
      <!-- 绩效评分 -->
      <uni-subTitle icon="bookmark" title="绩效评分" />
      <view style="height: 500rpx">
        <uni-line ref="lineChart4"></uni-line>
      </view>
    </view>
    <uni-tabbar :tabCurrent="1"></uni-tabbar>
  </view>
</template>

<script>
import { fieldTree } from '@/api/utils.js'
import { houseAnimalApi, houseStaffApi } from '@/api/view.js'
import { addTreePro } from '@/utils/common.js'
export default {
  data () {
    return {
      fieldId: '',
      fieldName: '',
      columns: [],
      houseAnimal: {
        asset_score: '',
        animal_avg_density: '',
        animal_unit_area: ''
      },
      houseStaff: {
        name: '',
        avg_response_time: '',
        schedule: '',
        feeding_time: ''
      }
    }
  },
  computed: {
    safetyTop () {
      return uni.getSystemInfoSync().safeAreaInsets.top
    }
  },
  onLoad () {
    uni.hideTabBar()
    this.getFieldTree()
  },
  methods: {
    getFieldTree () {
      // 获取栏位数据 并设置第一个子元素为默认选中
      fieldTree().then(res => {
        if (res.code === 200) {
          let newTree = addTreePro(res.data[0], 'checked', true)
          this.columns = [newTree]
        }
      })
    },
    // 获取数据
    initData () {
      houseAnimalApi({ house_id: this.fieldId }).then(res => {
        if (res.code == 200) {
          this.houseAnimal = res.data
          let xData = []
          let yData1 = [{ name: '畜群健康', data: [] }]
          let yData2 = [{ name: '栏位占用', data: [], color: '#91CB74' }]
          let yData3 = [{ name: '异常警告', data: [], color: '#FAC858' }]
          this.houseAnimal.data.map(item => {
            xData.push(item.date)
            yData1[0].data.push(item.animal_health)
            yData2[0].data.push(item.field_occupy)
            yData3[0].data.push(item.abnormal_alarm_num)
          })
          this.$refs.lineChart1.initChart(xData, yData1)
          this.$refs.lineChart2.initChart(xData, yData2)
          this.$refs.lineChart3.initChart(xData, yData3)
          let data1 = [{ data: 0.8 }]
          let data2 = [{ data: 0.9, color: '#91CB74' }]
          let data3 = [{ data: 1, color: '#FAC858' }]
          this.$refs.progressChart1.initChart(data1, 80)
          this.$refs.progressChart2.initChart(data2, 90)
          this.$refs.progressChart3.initChart(data3, 100)

          let data = [{ data: this.houseAnimal.animal_score }, { data: this.houseAnimal.animal_avg_density }, { data: this.houseAnimal.animal_unit_area }]
          this.$refs.progressChart.initChart(data, this.houseAnimal.asset_score)
        }
      })
      houseStaffApi({ house_id: this.fieldId }).then(res => {
        if (res.code == 200) {
          this.houseStaff = res.data
          let xData = []
          let yData = [{ name: '员工绩效', data: [] }]
          this.houseStaff.data.map(item => {
            xData.push(item.date)
            yData[0].data.push(item.staff_score)
          })
          this.$refs.lineChart4.initChart(xData, yData)
        }
      })
    },
    treeCallback (value) {
      this.fieldId = value.id[0]
      this.fieldName = value.name[0]
      if (this.fieldId) {
        this.initData()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.view-container {
  .content {
    background: linear-gradient(to bottom, #d6e7ff 0%, #ffffff 600rpx);
    padding: 0 24rpx 24rpx;
    .fields-view,
    .manager-view {
      width: 100%;
      margin-top: 24rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .fields-chart {
        width: 250rpx;
        height: 250rpx;
      }
      .fields-info,
      .manager-info {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        .info-item {
          display: flex;
          justify-content: flex-start;
          align-items: center;
        }
      }
    }
    .daily-briefing {
      width: 100%;
      height: 500rpx;
    }
    .dot {
      width: 16rpx;
      height: 16rpx;
      border-radius: 50%;
      background-color: #00443a;
      margin: 22rpx 0;
    }
    .assets-item {
      width: 100%;
      height: 300rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .chart-left {
        width: 200rpx;
        height: 200rpx;
        margin-top: 48rpx;
      }
      .chart-right {
        width: 500rpx;
        height: 300rpx;
      }
    }
  }
}
</style>