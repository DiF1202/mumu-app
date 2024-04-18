<template>
	<view class="statistics-container" :style="{height: `${windowHeight}px`}">
    <view class="custom-header" :style="{paddingTop:`${safetyTop}px`}">
      <view class="time-select" @click="selectTime">
        <view class="time-num">
          <u--text :text="selectValue" align="left" color="#333333" size="44rpx" :bold="true"></u--text>
        </view>
        <view class="time-unit">
          <u--text text="年" align="left" color="#333333" size="28rpx" suffixIcon="arrow-down-fill" iconStyle="font-size: 20rpx;"></u--text>
        </view>
        <u-picker :defaultIndex="[10]" :show="show" :columns="columns" itemHeight="88" @cancel="show=false" @confirm="submitYear"></u-picker>
      </view>
    </view>
    <view class="content" :style="{height: `${windowHeight - safetyTop - 64}px`}">
      <!-- 饼图 -->
      <u--text text="圆环图" align="left" color="#333333" size="34rpx" :bold="true"></u--text>
      <view style="height:360rpx">
        <uni-ring ref="ringChart"></uni-ring>
      </view>
      <!-- 柱状图 -->
      <u--text text="柱状图" align="left" color="#333333" size="34rpx" :bold="true"></u--text>
      <view style="height:700rpx">
        <uni-bar ref="barChart"></uni-bar>
      </view>
      <!-- 曲线图 -->
      <u--text text="曲线图" align="left" color="#333333" size="34rpx" :bold="true"></u--text>
      <view style="height:500rpx">
        <uni-line ref="lineChart"></uni-line>
      </view>
      <u--text text="区域图" align="left" color="#333333" size="34rpx" :bold="true"></u--text>
      <view style="height:500rpx">
        <uni-tarea ref="tareaChart"></uni-tarea>
      </view>
    </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				selectValue: '',
				show: false,
				ringColor: ['#2681FF', '#FFAA32', '#F05537', '#7846E6'],
				ringData: [
					{ name: "待分派", value: 10, rate: 10},
					{ name: "待接单", value: 20, percent: 20},
					{ name: "处理中", value: 40, percent: 40},
					{ name: "已处理", value: 30, percent: 30},
				],
				statusNum: {},
				statusType: []
			}
		},
		computed: {
			windowHeight() {
				return uni.getSystemInfoSync().windowHeight
			},
      safetyTop() {
        return uni.getSystemInfoSync().safeAreaInsets.top
      },
			columns() {
				const arr = []
				for(let i = this.selectValue - 10; i < this.selectValue + 11; i++) {
					arr.push(i)
				}
				return [arr]
			}
		},
		onLoad() {
			this.submitYear({value:[new Date().getFullYear()]})
		},
		methods: {
			selectTime() {
				this.show = true
			},
			submitYear(e) {
				this.selectValue = e.value[0]
				this.show = false
        this.$refs.ringChart.initChart()
        this.$refs.barChart.initChart()
        this.$refs.lineChart.initChart()
        this.$refs.tareaChart.initChart()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.statistics-container {
		background: linear-gradient(to bottom, #D6E7FF 0%, #FFFFFF 100%);
    .custom-header {
      padding: 0 24rpx;
      .time-select {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        height: 80rpx;
        margin-bottom: 40rpx;
        .time-num {
          line-height: 44rpx;
        }
        .time-unit {
          line-height: 36rpx;
          margin-left: 8rpx;
        }
      }
    }
    .content {
      overflow-y: auto;
      padding: 0 24rpx 24rpx;
    }
	}
</style>