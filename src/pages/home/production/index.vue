<template>
	<view class="production-container">
    <uni-navtopbar title="生产管理评分" :back="true"></uni-navtopbar>
    <view class="content">
      <view class="header-filter">
        <view class="filter-fileds">
          <uni-treeSelect :columns="columns" @treeCallback="treeCallback" placeholder="请选择员工"/>
        </view>
        <view class="filter-date">
          <uni-timeSelect iconColor='#A2EF4D'></uni-timeSelect>
        </view>
      </view>
      <!-- 员工绩效 -->
      <uni-subTitle icon="heart" title="员工绩效" />
      <view :style="{height: '250rpx', marginTop: '24rpx'}">
        <uni-progress ref="progressChart1"></uni-progress>
      </view>
      <view style="height:500rpx">
        <uni-line ref="lineChart1"></uni-line>
      </view>
      <view class="event-handler">
        <view class="event-chart">
          <uni-ring ref="ring1" title="事件处理" subtitle="70"></uni-ring>
        </view>
      </view>
      <view class="heart-des">
        <view class="heart-row">
          <uni-font icon="icon-turangwendu30cm" color="#E99d42"/>
          <u--text text="平均响应事件: 30" color="#0F4239" size="28rpx" margin="12rpx"></u--text>
        </view>
        <view class="heart-row">
          <uni-font icon="icon-kongqishidu" color="#93D2F3"/>
          <u--text text="最长响应时间：10" color="#0F4239" size="28rpx" margin="12rpx"></u--text>
        </view>
        <view class="heart-row">
          <uni-font icon="icon-kongqishidu" color="#93D2F3"/>
          <u--text text="最短响应时间：10" color="#0F4239" size="28rpx" margin="12rpx"></u--text>
        </view>
      </view>
      <!-- 安防监控 -->
      <uni-subTitle icon="heart" title="安防监控" />
      <view :style="{height: '250rpx', marginTop: '24rpx'}">
        <uni-progress ref="progressChart2"></uni-progress>
      </view>
      <view style="height:500rpx">
        <uni-line ref="lineChart2"></uni-line>
      </view>
      <uni-subTitle icon="heart" title="IVS安防算法可视化" />
    </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
        fieldId: '',
        columns: [
          {
            id: 2,
            label: '一厂',
            children: [
              {id: 21, label: '张三'},
              {id: 22, label: '李四'}
            ]
          }
        ]
      }
		},
    onReady() {
      this.initData()
    },
    methods: {
      initData() {
        let xData = ['1月','2月','3月','4月','5月','6月']
        let yData = [
          { name: '员工绩效', data: ['10', '21', '13', '16', '21', '19']},
        ]
        let yData1 = [
          { name: '安防评分', data: ['10', '21', '13', '16', '21', '19']},
        ]
        let yData2 = [
          { name: '死亡', data: ['10', '21', '13', '16', '21', '19']},
          { name: '健康', data: ['60', '70', '30', '25', '46', '33']},
          { name: '体弱', data: ['3', '8', '2', '1', '5', '3']}
        ]
        let yData3 = [
          { name: '平均采食时长', data: ['10', '21', '13', '16', '21', '19']},
          { name: '平均饮水时长', data: ['60', '70', '30', '25', '46', '33']},
          { name: '平均睡眠时长', data: ['3', '8', '2', '1', '5', '3']}
        ]
        let yData4 = [
          { name: '告警数', data: ['10', '21', '13', '16', '21', '19']},
          { name: '告警级别', data: ['60', '70', '30', '25', '46', '33']},
        ]
        let pieDate = [{"name":"健康","value":50},{"name":"死亡","value":30},{"name":"体弱","value":20}]
        let pieDate2 = [{"name":"已处理","value":70},{"name":"未处理","value":30},{"name":"主动上报","value":30}]
        let data = [{ data: '0.6', color: '#1890FF'}]
        this.$refs.lineChart1.initChart(xData, yData)
        this.$refs.lineChart2.initChart(xData, yData1)
        // this.$refs.lineChart3.initChart(xData, yData2)
        // this.$refs.lineChart4.initChart(xData, yData3)
        // this.$refs.lineChart5.initChart(xData, yData4)
        this.$refs.progressChart1.initChart(data)
        this.$refs.progressChart2.initChart(data)
        this.$refs.ring1.initChart(pieDate2)
        // this.$refs.pieChart1.initChart(pieDate)
        // this.$refs.pieChart2.initChart(pieDate)
      },
      treeCallback(value) {
        this.fieldId = value.id[0]
      }
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
      } 
    }
	}
</style>