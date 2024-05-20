<template>
	<view class="charts-box">
		<!-- :canvas2d="true" 开启后模拟器层级有问题 关闭真机层级有问题 -->
		<qiun-data-charts type="line" :chartData="chartData" :opts="opts" />
	</view>
</template>
<script>
  import qiunDataCharts from '@/components/uCharts/qiun-data-charts/qiun-data-charts.vue'
	export default {
    components: { qiunDataCharts },
		props: {
			lineType: {
				type: String,
				default: "straight"
			}
		},
	  data() {
	    return {
	      chartData: {},
				opts: {
					// 自定义图表样式在opts中配置相关属性
					padding: [0, 12, 0, 12],
					legend: {
						position: 'top',
						float: 'right',
						margin: 12,
					},
					xAxis: {
						disableGrid: true,
						fontColor: 'rgba(0, 0, 0, 0.45)',
					  boundaryGap: 'center',
						fontSize: 12,
					},
					yAxis: {
						gridType: 'dash',
						dashLength: 8,
						data:[
							{
								type: 'value',
								tofix: 1,
								fontColor: 'rgba(0, 0, 0, 0.45)'
							}
						]
					},
					extra: {
						line: {
							type: this.lineType,
							width: 2,
							activeType: "hollow"
						}
					}
				}
	    }
	  },
		mounted() {
			// this.initChart()
		},
	  methods: {
	    initChart(xData, yData) {
				this.chartData = JSON.parse(JSON.stringify({
					categories: xData,
					series: yData
				}))
	    },
	  }
	}
</script>

<style lang="scss">
	.charts-box {
		width: 100%;
		height: 100%;
	}
</style>