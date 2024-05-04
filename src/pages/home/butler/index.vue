<template>
	<view class="home-container">
    <uni-navtopbar title="信息概览" :back="true"></uni-navtopbar>
    <view class="content">
      <u-icon name="map" color="#10cc8f" size="46rpx" label="安徽涡阳" labelSize="28rpx" labelColor="#0F4239"></u-icon>
      <!-- 环境预警 -->
      <uni-subTitle customIcon="shumu" title="环境预警" url="/pages/home/environment/index" />
      <view class="env-warning">
        <!-- 天气信息展示 -->
        <view class="env-row">
          <u-icon custom-prefix="custom-icon custom-icon-taiyang" size="38rpx" color="#E99D42"></u-icon>
          <u--text text="温度过高,建议降温" color="#0F4239" size="28rpx" margin="12rpx"></u--text>
        </view>
        <view class="env-row">
          <u-icon custom-prefix="custom-icon custom-icon-shuidi" size="38rpx" color="#93D2F3"></u-icon>
          <u--text text="湿度偏高建议通风" color="#0F4239" size="28rpx" margin="12rpx"></u--text>
        </view>
        <view class="env-row">
          <u-icon custom-prefix="custom-icon custom-icon-dianfang" size="38rpx" color="#A16222"></u-icon>
          <u--text text="x栏x舍x位,温度异常告警" color="#0F4239" size="28rpx" margin="12rpx"></u--text>
        </view>
      </view>
      <!-- 生物资产概况 -->
      <uni-subTitle icon="red-packet" title="生物资产概况" url="pages/home/biological/index" />
      <view class="assets-charts">
        <view class="chart-item">
          <uni-progress ref="progressChart1"></uni-progress>
        </view>
        <view class="chart-item">
          <uni-progress ref="progressChart2"></uni-progress>
        </view>
        <view class="chart-item">
          <uni-progress ref="progressChart3"></uni-progress>
        </view>
      </view>
      <view style="height:500rpx">
        <uni-line ref="lineChart1"></uni-line>
      </view>
      <!-- 生产管理评分 -->
      <uni-subTitle customIcon="shengchan" title="生产管理评分" url="pages/home/production/index" />
      <view style="height: 250rpx;marginTop:24rpx">
        <uni-progress ref="progressChart4"></uni-progress>
      </view>
      <view style="height:500rpx">
        <uni-line ref="lineChart2"></uni-line>
      </view>
      <!-- 每日简报 -->
      <uni-subTitle customIcon="jiqiren" title="每日简报" url="pages/home/dailyReport/index"/>
      <view class="daily-briefing">
        <u--text text="过去24h总结：" color="#0F4239" size="32rpx"></u--text>
        <view v-for="(item,index) in daily.previously" :key="index" class="daily-item">
          <view class="dot"></view>
          <u--text :text="item.title + ':' + item.content" color="#0F4239" size="28rpx" margin="12rpx"></u--text>
        </view>
        <u--text text="未来建议：" color="#0F4239" size="32rpx"></u--text>
        <view v-for="(item,index) in daily.futureSuggestions" :key="index" class="daily-item">
          <view class="dot"></view>
          <u--text :text="item.content" color="#0F4239" size="28rpx" margin="12rpx"></u--text>
        </view>
      </view>
    </view>
    <uni-tabbar :tabCurrent="0"></uni-tabbar>
	</view>
</template>

<script>
import { overViewApi } from '@/api/home.js'
	export default {
		data() {
			return {
        daily: {
          previously: [
            {title: '动物数量和分布', content: '目标检测算法统计，昨日在主舍区共有牛群150头，羊群300头。动物数量保持稳定，无异常变'},
            {title: '活跃度与健康监测', content: '畜群活跃度等级为7/10，显示出良好的活动水平。未检测到异常行为，群体健康状况良好。'},
            {title: '预警事件', content: '未发现紧急预警事件，动物逃逸或严重健康问题的风险很低。'},
            {title: '人车物管理', content: '车辆出入统计显示，共有10次货车进出，运输饲料和牲畜。所有人员通道活动正常，无未授权入侵事件。'}
          ],
          futureSuggestions: [
            {content: '目标检测算法统计，昨日在主舍区共有牛群150头，羊群300头。动物数量保持稳定，无异常变'},
            {content: '畜群活跃度等级为7/10，显示出良好的活动水平。未检测到异常行为，群体健康状况良好。'},
            {content: '未发现紧急预警事件，动物逃逸或严重健康问题的风险很低。'},
            {content: '车辆出入统计显示，共有10次货车进出，运输饲料和牲畜。所有人员通道活动正常，无未授权入侵事件。'}
          ]
        }
      }
		},
		computed: {
      safetyTop() {
        return uni.getSystemInfoSync().safeAreaInsets.top
      }
		},
		onLoad() {
      uni.hideTabBar()
			this.initData()
		},
		methods: {
			initData(e) {
        overViewApi().then(res => {
          console.log(res)
        })
       this.$nextTick(() => {
        let xData = ['1月','2月','3月','4月','5月','6月']
        let yData1 = [
          { name: '畜群健康', data: ['10', '21', '13', '16', '21', '19']},
          { name: '栏位占用', data: ['60', '70', '30', '25', '46', '33']},
          { name: '异常警告', data: ['3', '8', '2', '1', '5', '3']}
        ]
        let yData2 = [
          { name: '员工评分', data: ['10', '21', '13', '16', '21', '19']},
          { name: '生产管控', data: ['60', '70', '30', '25', '46', '33']},
        ]
        let data1 = [{ data: '0.6', color: '#1890FF'}]
        let data2 = [{ data: '0.6', color: '#91CB74'}]
        let data3 = [{ data: '0.6', color: '#FAC858'}]
        let data4 = [{ data: '0.6', color: '#1890FF'},{ data: '0.6', color: '#91CB74'}]
        this.$refs.lineChart1.initChart(xData, yData1)
        this.$refs.lineChart2.initChart(xData, yData2)
        this.$refs.progressChart1.initChart(data1)
        this.$refs.progressChart2.initChart(data2)
        this.$refs.progressChart3.initChart(data3)
        this.$refs.progressChart4.initChart(data4)
       })
			}
		}
	}
</script>

<style lang="scss" scoped>
	.home-container {
    .content {
      background: linear-gradient(to bottom, #D6E7FF 0%, #FFFFFF 600rpx);
      padding: 0 24rpx 48rpx;
      .env-warning {
        width: 100%;
        .env-row {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          margin: 24rpx 0;
        }
      }
      .assets-charts {
        width: 100%;
        height: 200rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 24rpx;
        .chart-item {
          width: 200rpx;
          height: 200rpx;
        }
      }
      .daily-briefing {
        width: 100%;
        margin-top: 24rpx;
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
	}
</style>