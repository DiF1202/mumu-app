<template>
	<view class="home-container">
    <uni-navtopbar title="值守卫士" :back="true"></uni-navtopbar>
    <view class="content">
      <uni-treeSelect :columns="columns" @treeCallback="treeCallback"/>
      <!-- 栏位数据 -->
      <uni-subTitle customIcon="camera" title="一厂/二舍/三栏" url="pages/view/components/list/index"/>
      <view class="fields-view">
        <view class="fields-chart">
          <uni-progress ref="progressChart1"></uni-progress>
        </view>
        <view class="fields-info">
          <view class="info-item">
            <u-icon custom-prefix="custom-icon custom-icon-Pasturage" size="38rpx" color="#1890FF"></u-icon>
            <u--text text="管理动物数: 80" color="#0F4239" size="28rpx" margin="12rpx"></u--text>
          </view>
          <view class="info-item">
            <u-icon custom-prefix="custom-icon custom-icon-midu" size="38rpx" color="#91CB74"></u-icon>
            <u--text text="畜群平均密度: 60平方米" color="#0F4239" size="28rpx" margin="12rpx"></u--text>
          </view>
          <view class="info-item">
            <u-icon custom-prefix="custom-icon custom-icon-mianji" size="38rpx" color="#FAC858"></u-icon>
            <u--text text="单位面积/动物： 0.2" color="#0F4239" size="28rpx" margin="12rpx"></u--text>
          </view>
        </view>
      </view>
      <!-- 资产管理评分 -->
      <uni-subTitle customIcon="jixiaoguanli" title="资产管理评分"/>
      <view style="height:500rpx">
        <uni-line ref="lineChart1"></uni-line>
      </view>
      <!-- 环境预警 -->
      <uni-subTitle customIcon="shumu" title="环境预警" url="/pages/home/environment/index" />
      <view class="env-warning">
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
      <!-- 负责人信息 -->
      <uni-subTitle icon="account" title="负责人" />
      <view class="manager-view">
        <view class="avator">
          <u--image :showLoading="true" src="/static/icon/woman.png" width="160rpx" height="160rpx"></u--image>
          <view class="name">杨大坤</view>
        </view>
        <view :style="{ height: '250rpx', width:'542rpx'}">
          <uni-line ref="lineChart2"></uni-line>
        </view>
      </view>
      <!-- 昨日总结 -->
      <uni-subTitle customIcon="xinxi" title="昨日总结" />
      <view class="daily-briefing">
        <view v-for="(item,index) in summary" :key="index" class="daily-item">
          <view class="dot"></view>
          <u--text :text="item.content" color="#0F4239" size="28rpx" margin="12rpx"></u--text>
        </view>
      </view>
      <!-- 事件处理 -->
      <uni-subTitle customIcon="chart" title="事件处理" />
      <view class="warning-list">
        <view v-for="(item, index) in warningList" :key="index" class="warning-item" :style="{background: item.bgColor}">
          <view class="item-title">
            <u-icon :name="item.icon" :color="item.iconColor" size="28rpx"></u-icon>
            <u--text :text="item.title" color="#333333" size="28rpx"></u--text>
          </view>
          <u--text :text="item.content" color="#0F4239" size="28rpx" lines="1"></u--text>
        </view>
      </view>
    </view>
    <uni-tabbar :tabCurrent="0"></uni-tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
        summary: [
          {content: '目标检测算法统计，昨日在主舍区共'},
          {content: '畜群活跃度等级为7/10，显示'},
          {content: '未发现紧急预警事件，动物逃风险很低。'},
          {content: '车辆出入统计显示次货正常，无侵事件。'}
        ],
        warningList: [
          { type: 1, title: '死亡告警', content: '2024年4月5日, x厂内发现死体', icon: 'close-circle-fill', iconColor: '#F5232D', bgColor: '#FFF1F0'},
          { type: 2, title: '体弱报警', content: '2024年4月5日, x厂内发现死体', icon: 'error-circle-fill', iconColor: '#199DFF', bgColor: '#E6F7FF'},
          { type: 3, title: '环境报警', content: '2024年4月5日, x厂内发现死体', icon: 'info-circle-fill', iconColor: '#51C41B', bgColor: '#F6FFED'},
          { type: 4, title: '濒死报警', content: '2024年4月5日, x厂内发现死体', icon: 'clock-fill', iconColor: '#FAAD15', bgColor: '#FFFBE6'},
        ],
        columns: [
          {
            id: 2,
            label: '牧场2',
            children: [
              {id: 21, label: '厂1', children: [{id:1, label: '栏1'}]},
              {id: 22, label: '厂2'}
            ]
          }
        ]
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
       this.$nextTick(() => {
        let data = [{ data: '0.8', color: '#1890FF'},{ data: '0.2', color: '#FAC858'},{ data: '0.6', color: '#FF6216'}]
        this.$refs.progressChart1.initChart(data)

        let xData = ['1月','2月','3月','4月','5月','6月']
        let yData1 = [
          { name: '畜群健康', data: ['10', '21', '13', '16', '21', '19']},
          { name: '栏位占用', data: ['60', '70', '30', '25', '46', '33']},
          { name: '异常警告', data: ['3', '8', '2', '1', '5', '3']}
        ]
        this.$refs.lineChart1.initChart(xData, yData1)
        let yData2 = [{ name: '员工绩效', data: ['60', '70', '30', '25', '46', '33']}]
        this.$refs.lineChart2.initChart(xData, yData2)
       })
			},
      treeCallback(value) {
        console.log(value)
      }
		}
	}
</script>

<style lang="scss" scoped>
	.home-container {
    .content {
      background: linear-gradient(to bottom, #D6E7FF 0%, #FFFFFF 600rpx);
      padding: 0 24rpx 24rpx;
      .fields-view{
        width: 100%;
        margin-top: 24rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .fields-chart {
          width: 250rpx;
          height: 250rpx;
        }
        .fields-info, .manager-info {
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
      .manager-view {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .avator {
          width: 160rpx;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          align-items: center;
          margin-top: 12rpx;
          .name {
            margin-top: 12rpx;
          }
        }
      }
      .env-warning {
        width: 100%;
        .env-row {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          margin: 24rpx 0;
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
      .warning-list {
        .warning-item {
          height: 130rpx;
          padding: 24rpx;
          border-radius: 16rpx;
          margin-top: 24rpx;
          display: flex;
          justify-content: space-around;
          flex-direction: column;
          .item-title {
            display: flex;
            justify-content: flex-start;
            align-items: center;
          }
        }
      }
    }
	}
</style>