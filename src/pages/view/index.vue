<template>
	<view class="view-container">
    <uni-navtopbar title="远程查看"></uni-navtopbar>
    <view class="content">
      <!-- 栏位选择 -->
      <uni-fieldsselect :columns="columns" @treeCallback="treeCallback" iconColor='#A2EF4D'/>
      <!-- 栏位信息 -->
      <uni-subTitle icon="camera" title="一厂/二舍/三栏" value="实况视频" url="pages/view/components/list/index" leftIconColor="#A2EF4D"/>
      <view class="fields-view">
        <view class="fields-chart">
          <uni-progress ref="progressChart1"></uni-progress>
        </view>
        <view class="fields-info">
          <view class="info-item">
            <uni-font icon="icon-turangwendu30cm" color="#1890FF"/>
            <u--text text="动物总数: 80" color="#0F4239" size="28rpx" margin="12rpx"></u--text>
          </view>
          <view class="info-item">
            <uni-font icon="icon-turangwendu30cm" color="#FAC858"/>
            <u--text text="畜群平均密度: 60平方米" color="#0F4239" size="28rpx" margin="12rpx"></u--text>
          </view>
          <view class="info-item">
            <uni-font icon="icon-turangwendu30cm" color="#FF6216"/>
            <u--text text="单位面积/动物： 0.2" color="#0F4239" size="28rpx" margin="12rpx"></u--text>
          </view>
        </view>
      </view>
      <!-- 资产评分 -->
      <uni-subTitle icon="bookmark" title="资产评分" leftIconColor="#A2EF4D"/>
      <view style="height:500rpx">
        <uni-line ref="lineChart1"></uni-line>
      </view>
      <!-- 负责人 -->
      <uni-subTitle icon="account" title="负责人"  leftIconColor="#A2EF4D"/>
      <view class="manager-view">
        <!-- 负责人信息 -->
        <u--image :showLoading="true" src="/static/icon/woman.png" width="250rpx" height="250rpx"></u--image>
        <view class="manager-info">
          <view class="info-item">
            <uni-font icon="icon-turangwendu30cm" color="#1890FF"/>
            <u--text text="姓名: 李四" color="#0F4239" size="28rpx" margin="12rpx"></u--text>
          </view>
          <view class="info-item">
            <uni-font icon="icon-turangwendu30cm" color="#FAC858"/>
            <u--text text="平均响应时间: 45min" color="#0F4239" size="28rpx" margin="12rpx"></u--text>
          </view>
          <view class="info-item">
            <uni-font icon="icon-turangwendu30cm" color="#FF6216"/>
            <u--text text="事件处理： 10/20" color="#0F4239" size="28rpx" margin="12rpx"></u--text>
          </view>
          <view class="info-item">
            <uni-font icon="icon-turangwendu30cm" color="#FF6216"/>
            <u--text text="投喂时间： 20min" color="#0F4239" size="28rpx" margin="12rpx"></u--text>
          </view>
        </view>
      </view>
      <!-- 绩效评分 -->
      <uni-subTitle icon="bookmark" title="绩效评分" leftIconColor="#A2EF4D"/>
      <view style="height:500rpx">
        <uni-line ref="lineChart2"></uni-line>
      </view>
    </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
        queryParams: {
          fieldId: ''
        },
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
		onReady() {
			this.initData()
		},
		methods: {
			initData(e) {
       this.$nextTick(() => {
        let xData = ['1月','2月','3月','4月','5月','6月']
        let yData1 = [
          { name: '畜群健康', data: ['10', '21', '13', '16', '21', '19']},
          { name: '栏位占用', data: ['60', '70', '30', '25', '46', '33']},
          { name: '异常警告', data: ['3', '8', '2', '1', '5', '3']}
        ]
        let yData2 = [{ name: '员工绩效', data: ['60', '70', '30', '25', '46', '33']}]
        let data = [{ data: '0.8', color: '#1890FF'},{ data: '0.2', color: '#FAC858'},{ data: '0.6', color: '#FF6216'}]
        this.$refs.lineChart1.initChart(xData, yData1)
        this.$refs.lineChart2.initChart(xData, yData2)
        this.$refs.progressChart1.initChart(data)
       })
			},
      treeCallback(value) {
        console.log(value)
        this.fieldId = value.id[0]
      }
		}
	}
</script>

<style lang="scss" scoped>
	.view-container {
    .content {
		  background: linear-gradient(to bottom, #D6E7FF 0%, #FFFFFF 600rpx);
      padding: 0 24rpx 24rpx;
      .fields-view, .manager-view{
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
      .daily-briefing {
        width: 100%;
        height: 500rpx;
      }
    }
	}
</style>