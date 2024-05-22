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
      <view style="height: 1000px;"></view>
      <!-- 员工绩效 -->
      <!-- <uni-subTitle icon="man-add" title="员工绩效" />
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
          <view class="dot"></view>
          <u--text text="平均响应事件: 30" color="#0F4239" size="28rpx" margin="12rpx"></u--text>
        </view>
        <view class="heart-row">
          <view class="dot"></view>
          <u--text text="最长响应时间：10" color="#0F4239" size="28rpx" margin="12rpx"></u--text>
        </view>
        <view class="heart-row">
          <view class="dot"></view>
          <u--text text="最短响应时间：10" color="#0F4239" size="28rpx" margin="12rpx"></u--text>
        </view>
      </view> -->
      <!-- 安防监控 -->
      <!-- <uni-subTitle customIcon="shexiang" title="安防监控" />
      <view :style="{height: '250rpx', marginTop: '24rpx'}">
        <uni-progress ref="progressChart2"></uni-progress>
      </view>
      <view style="height:500rpx">
        <uni-line ref="lineChart2"></uni-line>
      </view>
      <uni-subTitle icon="edit-pen" title="IVS安防算法可视化" /> -->
    </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
        fieldId: '',
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
      // this.initData()
    },
    methods: {
      pickerCallback1(e) {
        console.log(e)
      },
      pickerCallback2(e) {
        console.log(e)
      },
      initData() {
        let xData = ['1月','2月','3月','4月','5月','6月']
        let yData = [
          { name: '员工绩效', data: ['10', '21', '13', '16', '21', '19']},
        ]
        let yData1 = [
          { name: '安防评分', data: ['10', '21', '13', '16', '21', '19']},
        ]
        let pieDate2 = [{"name":"已处理","value":70},{"name":"未处理","value":30},{"name":"主动上报","value":30}]
        let data = [{ data: '0.6', color: '#1890FF'}]
        this.$refs.lineChart1.initChart(xData, yData)
        this.$refs.lineChart2.initChart(xData, yData1)
        this.$refs.progressChart1.initChart(data)
        this.$refs.progressChart2.initChart(data)
        this.$refs.ring1.initChart(pieDate2)
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
    }
	}
</style>