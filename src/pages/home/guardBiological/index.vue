<template>
  <view class="biological-container">
    <uni-navtopbar title="生物资产概况" :back="true"></uni-navtopbar>
    <view class="content">
      <view class="header-filter">
        <view class="filter-fileds">
          <uni-treeSelect :columns="columns" @treeCallback="treeCallback" />
        </view>
        <view class="filter-date">
          <uni-timeSelect></uni-timeSelect>
        </view>
      </view>
      <!-- 畜群健康详情 -->
      <uni-subTitle icon="heart" title="畜群健康详情" />
      <view :style="{ height: '250rpx', marginTop: '24rpx' }">
        <uni-progress ref="progressChart1"></uni-progress>
      </view>
      <view style="height: 500rpx">
        <uni-line ref="lineChart1"></uni-line>
      </view>
      <!-- 畜群活跃度变化 -->
      <uni-subTitle customIcon="heart" title="畜群活跃度变化" />
      <view class="heart-des">
        <view class="heart-row">
          <view class="dot"></view>
          <u--text
            text="与昨日相比: +20%"
            color="#0F4239"
            size="28rpx"
            margin="12rpx"
          ></u--text>
        </view>
        <view class="heart-row">
          <view class="dot"></view>
          <u--text
            text="与过去一周相比：-10%"
            color="#0F4239"
            size="28rpx"
            margin="12rpx"
          ></u--text>
        </view>
      </view>
      <view style="height: 500rpx">
        <uni-line ref="lineChart2" lineType="step"></uni-line>
      </view>
      <!-- 畜群健康统计 -->
      <uni-subTitle customIcon="yaowan" title="畜群健康统计" />
      <view style="height: 500rpx">
        <uni-pie ref="pieChart1"></uni-pie>
      </view>
      <view class="heart-des">
        <view class="heart-row">
          <view class="dot"></view>
          <u--text
            text="体弱: 30"
            color="#0F4239"
            size="28rpx"
            margin="12rpx"
          ></u--text>
        </view>
        <view class="heart-row">
          <view class="dot"></view>
          <u--text
            text="死亡: 20"
            color="#0F4239"
            size="28rpx"
            margin="12rpx"
          ></u--text>
        </view>
        <view class="heart-row">
          <view class="dot"></view>
          <u--text
            text="回收: 20"
            color="#0F4239"
            size="28rpx"
            margin="12rpx"
          ></u--text>
        </view>
        <view class="heart-row">
          <view class="dot"></view>
          <u--text
            text="濒死：2"
            color="#0F4239"
            size="28rpx"
            margin="12rpx"
          ></u--text>
        </view>
        <view class="heart-row">
          <view class="dot"></view>
          <u--text
            text="医治：2"
            color="#0F4239"
            size="28rpx"
            margin="12rpx"
          ></u--text>
        </view>
        <view class="heart-row">
          <view class="dot"></view>
          <u--text
            text="无害处理：10"
            color="#0F4239"
            size="28rpx"
            margin="12rpx"
          ></u--text>
        </view>
      </view>
      <view style="height: 500rpx">
        <uni-line ref="lineChart3"></uni-line>
      </view>
      <!-- 畜群节律统计 -->
      <uni-subTitle customIcon="shuimian" title="畜群节律统计" />
      <view style="height: 500rpx">
        <uni-scatter ref="scatter"></uni-scatter>
      </view>
      <uni-subTitle icon="hourglass" title="采食饮水统计" />
      <view style="height: 500rpx">
        <uni-line ref="lineChart4"></uni-line>
      </view>
      <!-- 栏位占用情况 -->
      <uni-subTitle icon="list" title="栏位占用情况" />
      <view :style="{ height: '250rpx', marginTop: '24rpx' }">
        <uni-progress ref="progressChart2"></uni-progress>
      </view>
      <view class="heart-des">
        <view class="heart-row">
          <view class="dot"></view>
          <u--text
            text="动物计数: 30"
            color="#0F4239"
            size="28rpx"
            margin="12rpx"
          ></u--text>
        </view>
        <view class="heart-row">
          <view class="dot"></view>
          <u--text
            text="畜群平均密度: 30"
            color="#0F4239"
            size="28rpx"
            margin="12rpx"
          ></u--text>
        </view>
        <view class="heart-row">
          <view class="dot"></view>
          <u--text
            text="单位面积/动物：10"
            color="#0F4239"
            size="28rpx"
            margin="12rpx"
          ></u--text>
        </view>
        <view class="heart-row">
          <view class="dot"></view>
          <u--text
            text="动物离栏数：10"
            color="#0F4239"
            size="28rpx"
            margin="12rpx"
          ></u--text>
        </view>
      </view>
      <!-- 异常告警详情 -->
      <uni-subTitle icon="bell" title="异常告警详情" iconColor="#DE868F" />
      <view :style="{ height: '250rpx', marginTop: '24rpx' }">
        <uni-progress ref="progressChart3"></uni-progress>
      </view>
      <view style="height: 500rpx">
        <uni-pie ref="pieChart2"></uni-pie>
      </view>
      <view style="height: 500rpx">
        <uni-line ref="lineChart5"></uni-line>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      fieldId: '',
      columns: [
        {
          id: 2,
          label: '牧场2',
          children: [
            { id: 21, label: '厂1', children: [{ id: 1, label: '栏1' }] },
            { id: 22, label: '厂2' }
          ]
        }
      ]
    }
  },
  onReady () {
    this.initData()
  },
  methods: {
    initData () {
      let xData = ['1月', '2月', '3月', '4月', '5月', '6月']
      let yData = [
        { name: '畜群健康', data: ['10', '21', '13', '16', '21', '19'] },
      ]
      let yData1 = [
        { name: '畜群活跃度', data: ['10', '21', '13', '16', '21', '19'] },
      ]
      let yData2 = [
        { name: '体弱', data: ['10', '21', '13', '16', '21', '19'] },
        { name: '濒死', data: ['60', '70', '30', '25', '46', '33'] },
        { name: '死亡', data: ['3', '8', '2', '1', '5', '3'] },
        { name: '回收', data: ['11', '22', '18', '19', '22', '19'] },
        { name: '医治', data: ['30', '50', '28', '21', '42', '23'] },
        { name: '处理', data: ['31', '18', '12', '11', '15', '13'] }
      ]
      let yData3 = [
        { name: '采食时长', data: ['10', '21', '13', '16', '21', '19'] },
        { name: '饮水时长', data: ['60', '70', '30', '25', '46', '33'] },
      ]
      let yData4 = [
        { name: '告警数', data: ['10', '21', '13', '16', '21', '19'] },
        { name: '告警级别', data: ['60', '70', '30', '25', '46', '33'] },
      ]
      let pieDate = [{ "name": "健康", "value": 50 }, { "name": "死亡", "value": 30 }, { "name": "体弱", "value": 20 }]
      let pieDate2 = [{ "name": "已处理", "value": 70 }, { "name": "未处理", "value": 30 }]
      let data = [{ data: '0.6', color: '#1890FF' }]
      this.$refs.lineChart1.initChart(xData, yData)
      this.$refs.lineChart2.initChart(xData, yData1)
      this.$refs.lineChart3.initChart(xData, yData2)
      this.$refs.lineChart4.initChart(xData, yData3)
      this.$refs.lineChart5.initChart(xData, yData4)
      this.$refs.progressChart1.initChart(data)
      this.$refs.progressChart2.initChart(data)
      this.$refs.progressChart3.initChart(data)
      // this.$refs.ring1.initChart(pieDate2)
      this.$refs.pieChart1.initChart(pieDate)
      this.$refs.pieChart2.initChart(pieDate)
      this.$refs.scatter.initChart()
    },
    treeCallback (value) {
      this.fieldId = value.id[0]
    }
  }
}
</script>

<style lang="scss" scoped>
.biological-container {
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
        background-color: #00443a;
        margin: 22rpx 0;
      }
    }
  }
}
</style>