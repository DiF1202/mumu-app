<template>
	<view class="dailyReport-container">
    <uni-navtopbar title="每日一报" :back="true"></uni-navtopbar>
    <view class="content">
      <!-- 过去24h总结 -->
      <uni-subTitle customIcon="houres" title="过去24h总结"/>
      <view class="previously-view">
        <view class="previously-info">
          <view class="info-item">
            <view class="dot"></view>
            <u--text text="健康评分: 75分" color="#0F4239" size="28rpx" margin="12rpx"></u--text>
          </view>
          <view class="info-item">
            <view class="dot"></view>
            <u--text text="健康评分: 80分" color="#0F4239" size="28rpx" margin="12rpx"></u--text>
          </view>
          <view class="info-item">
           <view class="dot"></view>
            <u--text text="栏位占用: 90分" color="#0F4239" size="28rpx" margin="12rpx"></u--text>
          </view>
          <view class="info-item">
            <view class="dot"></view>
            <u--text text="告警处理: 75分" color="#0F4239" size="28rpx" margin="12rpx"></u--text>
          </view>
        </view>
         <view class="previously-chart">
          <uni-progress ref="progressChart1"></uni-progress>
        </view>
      </view>
      <view style="height:500rpx">
        <uni-line ref="lineChart1"></uni-line>
      </view>
      <view v-for="(item,index) in previously" :key="index" class="daily-item">
        <view class="dot"></view>
        <u--text :text="item.title + ':' + item.content" color="#0F4239" size="28rpx" margin="12rpx"></u--text>
      </view>
      <!-- 动物监控与健康 -->
      <uni-subTitle icon="camera" title="动物监控与健康"/>
      <view v-for="(item,index) in animals" :key="index" class="daily-item">
        <view class="dot"></view>
        <u--text :text="item.title + ':' + item.content" color="#0F4239" size="28rpx" margin="12rpx"></u--text>
      </view>
      <!-- 设置与安全管理 -->
      <uni-subTitle icon="setting" title="设置与安全管理"/>
      <view v-for="(item,index) in facility" :key="index" class="daily-item">
        <view class="dot"></view>
        <u--text :text="item.title + ':' + item.content" color="#0F4239" size="28rpx" margin="12rpx"></u--text>
      </view>
      <!-- 未来建议 -->
      <uni-subTitle icon="attach" title="未来建议"/>
      <view v-for="(item,index) in futureSuggestions" :key="index" class="daily-item">
        <view class="dot"></view>
        <u--text :text="item.content" color="#0F4239" size="28rpx" margin="12rpx"></u--text>
      </view>
    </view>
	</view>
</template>

<script>
export default {
  data() {
    return {
      previously: [
        {title: '温湿度监测', content: '目标检测算法统计，昨日在主舍区共有牛群150头，羊群300头。动物数量保持稳定，无异常变'},
        {title: '光照开关情况', content: '畜群活跃度等级为7/10，显示出良好的活动水平。未检测到异常行为，群体健康状况良好。'},
      ],
      animals: [
        {title: '动物数量与分布', content: '目标检测算法统计，昨日在主舍区共有牛群150头，羊群300头。动物数量保持稳定，无异常变'},
        {title: '活跃度与健康监测', content: '畜群活跃度等级为7/10，显示出良好的活动水平。未检测到异常行为，群体健康状况良好。'},
        {title: '预警事件', content: '畜群活跃度等级为7/10，显示出良好的活动水平。未检测到异常行为，群体健康状况良好。'},
      ],
      facility: [
        {title: '设施监控', content: '目标检测算法统计，昨日在主舍区共有牛群150头，羊群300头。动物数量保持稳定，无异常变'},
        {title: '人车物管理', content: '畜群活跃度等级为7/10，显示出良好的活动水平。未检测到异常行为，群体健康状况良好。'},
      ],
      futureSuggestions: [
        {content: '目标检测算法统计，昨日在主舍区共有牛群150头，羊群300头。动物数量保持稳定，无异常变'},
        {content: '畜群活跃度等级为7/10，显示出良好的活动水平。未检测到异常行为，群体健康状况良好。'},
        {content: '未发现紧急预警事件，动物逃逸或严重健康问题的风险很低。'},
        {content: '车辆出入统计显示，共有10次货车进出，运输饲料和牲畜。所有人员通道活动正常，无未授权入侵事件。'}
      ]
    }
  },
  onReady() {
    this.initData()
  },
  methods: {
    initData() {
      let data = [{ data: '0.8', color: '#1890FF'},{ data: '0.2', color: '#FAC858'},{ data: '0.6', color: '#FF6216'}]
      let xData = ['1月','2月','3月','4月','5月','6月']
      let yData1 = [
        { name: '健康评分', data: ['10', '21', '13', '16', '21', '19']},
        { name: '栏位占用', data: ['60', '70', '30', '25', '46', '33']},
        { name: '告警处理', data: ['3', '8', '2', '1', '5', '3']}
      ]
      this.$refs.progressChart1.initChart(data)
      this.$refs.lineChart1.initChart(xData, yData1)
    }
	}
}
</script>

<style lang="scss" scoped>
	.dailyReport-container {
    .content {
      background: linear-gradient(to bottom, #D6E7FF 0%, #FFFFFF 600rpx);
      padding: 0 24rpx 48rpx;
      .previously-view {
        width: 100%;
        margin-top: 24rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .previously-chart {
          width: 250rpx;
          height: 250rpx;
          margin-right: 48rpx;
        }
        .previously-info {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          .dot {
            width: 16rpx;
            height: 16rpx;
            border-radius: 50%;
            background-color: #10cc8f;
          }
          .info-item {
            display: flex;
            justify-content: flex-start;
            align-items: center;
          }
        }
      }
      .daily-item {
        display: flex;
        justify-content: flex-start;
        align-self: flex-start;
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